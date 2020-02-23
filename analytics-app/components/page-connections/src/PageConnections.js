import { html, css, LitElement } from 'lit-element';

import '@material/mwc-slider';
//const ForceGraph3D = require('3d-force-graph');

export class PageConnections extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        text-align: center;
      }

      .graph {
      }

      svg {
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `;
  }

  static get properties() {
    return {
      collectionType: { type: String },
      collectionId: { type: String },
      dataUrl: { type: String },
      graphData: { type: Object },
      weightsFilter: { type: Number },
      originalGraphData: { type: Object },
      allObjects: { type: Object },
      allNodes: { type: Object }
    };
  }

  constructor() {
    super();
    this.logo = html``;
    this.kdtree=null;
    this.nodesIndex = {};
    this.allNodes = [];
    this.nodesIdsViewed = {};
    this.positionsCount = 0;
    this.cameraTimeStart = 800;
    this.cameraTime = this.cameraTimeStart;
  }

  connectedCallback() {
    super.connectedCallback();
    this.dataUrl ="/api/analytics/"+this.collectionType+"/"+this.collectionId+"/similarities_weights";
    this.weightsFilter = 0.74;
    this.graphData ={
      nodes: [],
      links: []
    };
    this.allObjects = [];
  }

  //TODO: Slider for weight minimums - filter client side and update the data
  //TODO: Traverse the ktree and build up position values for a position slider
  //TODO: 2D version also with different weight minimums

  setGraphData() {
    const links = [];
    const nodesLinkCounts = {};
    for (let i=0; i<this.originalGraphData.links.length;i++) {
      const sourceId = parseInt(this.originalGraphData.links[i].source);
      const targetId = parseInt(this.originalGraphData.links[i].target);

      console.error(this.originalGraphData.links[i].source);
      console.error(this.originalGraphData.links[i].target);

      if (!nodesLinkCounts[sourceId]) {
        nodesLinkCounts[sourceId] = 0;
      }

      if (!nodesLinkCounts[targetId]) {
        nodesLinkCounts[targetId] = 0;
      }

      if (this.originalGraphData.links[i].value>this.weightsFilter) {
        links.push({...this.originalGraphData.links[i]});
        nodesLinkCounts[sourceId] += 1;
        nodesLinkCounts[targetId] += 1;
      }
    }

     for (let i=0; i<this.allObjects.length;i++) {
      PageConnections.setUpObjectOpacity(nodesLinkCounts[parseInt(this.allNodes[i].id)], this.allObjects[i].children[0]);
      PageConnections.setUpObjectOpacity(nodesLinkCounts[parseInt(this.allNodes[i].id)], this.allObjects[i].children[1]);
     }

    this.graph.graphData({
      nodes: this.originalGraphData.nodes,
      links
    })
  }

  firstUpdated () {
    super.firstUpdated();
    this.setupForce3D();
    fetch(this.dataUrl, { credentials: 'same-origin' })
    .then(res => res.json())
    .then(response => {
      this.originalGraphData = {...response};
      this.setGraphData();
    })
    .catch(error => {
        console.error('Error:', error);
        this.fire('app-error', error);
      }
    );
  }

  static setUpObjectOpacity (linkCount, imageSprite) {
    console.error(`LinkCount: ${linkCount}`)

    if (linkCount && linkCount>1) {
      imageSprite.visible=true;
     } else {
      imageSprite.visible=false;
     }
  }

  setupForce3D() {
    this.graph = ForceGraph3D()
    (this.shadowRoot.getElementById('3d-graph'))
     .graphData(this.graphData)
     .nodeAutoColorBy('group')
     .linkDirectionalParticles("value")
     .linkDirectionalParticleSpeed(d => d.value * 0.001)
     .nodeLabel("lemmatizedContentNOTTT")
     .d3AlphaDecay(0.0120)
     .d3VelocityDecay(0.7)
     .onNodeClick(node => {
       debugger;
       // Aim at node from outside it
       const distance = 300;
       const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

       this.graph.cameraPosition(
         { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
         node, // lookAt ({ x, y, z })
         1000  // ms transition duration
       );
     })
     .nodeThreeObject(node => {
       // use a sphere as a drag handle
       let score = node.counter_endorsements_up-node.counter_endorsements_down;
       score = score/30;
       score = 0;
       if (true || node.linkCount>0) {
         const obj = new THREE.Mesh(
         new THREE.SphereGeometry(10*score),
         new THREE.MeshBasicMaterial({  color: 0xffffff, depthWrite: false, transparent: false, opacity: 1 }));

         const loader = new THREE.TextureLoader();
         loader.setCrossOrigin('anonymous');
         const spriteMap = loader.load( node.imageUrl );
         const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
         const imageSprite = new THREE.Sprite( spriteMaterial );
         //TODO: Make image rounded corners or round
         //TODO: Create glow for text
         imageSprite.scale.set(24, 14);
         imageSprite.position.y=17.0;

         PageConnections.setUpObjectOpacity(node.linkCount, imageSprite);
         obj.add( imageSprite );

         // add text sprite as child
         const sprite = new SpriteText(node.name);
         sprite.color = node.color;
         sprite.textHeight = 7;
         PageConnections.setUpObjectOpacity(node.linkCount, sprite);

         obj.add(sprite);

         this.allObjects.push(obj);
         this.allNodes.push(node);

         return obj;
       }
    });

        // Spread nodes a little wider
        this.graph.d3Force('charge').strength(-350);
/*
        this.maxDistance = Math.pow( 120, 2 );
        const currentPosition = this.graph.cameraPosition();

        const getDistanceFrom = function(object,position) {
          var objectDistance = new THREE.Vector3();
          var target = new THREE.Vector3().copy(position);
          objectDistance.subVectors(object.position, target);
          return objectDistance.length();
        };

        const fastFwdButton = document.getElementById("fastFwdButton");

        fastFwdButton.onmousedown = function() {
          this.cameraTime = 100;
        }

        fastFwdButton.onmouseup = function () {
          this.cameraTime = this.cameraTimeStart;
        }

        document.getElementById("startButton").onclick = function () {
          makeAllTransparent();
          startNearestNodeLoop();
        }

        setTimeout(()=>{
          this.makeAllTransparent();
          this.startNearestNodeLoop();
        }, 30000); */

  }

  distanceFunction( a, b ) {
    return Math.pow( a[ 0 ] - b[ 0 ], 2 ) + Math.pow( a[ 1 ] - b[ 1 ], 2 ) + Math.pow( a[ 2 ] - b[ 2 ], 2 );
  };

  getNearestNodeKtree (position) {
    const positionsInRange = this.kdtree.nearest( [ position.x, position.y, position.z ], 1, this.maxDistance*10000 );
    const firstObject = positionsInRange[0];
    const firstObjectPoint = new THREE.Vector3().fromArray( firstObject[ 0 ].obj );
    const objectIndex = firstObject[ 0 ].pos;
    console.log(firstObjectPoint);
    return { node: this.allObjects[objectIndex], pos: objectIndex };
  }

  getNearestNode () {
    let nearestObject = null;
    let nearestObjectInView = null;
    let nearestObjectDistance = null;
    let nearestIndex = null;
    let nearestInviewIndex = null;
    let nearestObjectInviewDistance = null;
    let camera = this.graph.camera();
    const _frustum = new THREE.Frustum();
    const _projScreenMatrix = new THREE.Matrix4();

    _projScreenMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
    _frustum.setFromMatrix( _projScreenMatrix );

    for ( var x = 0; x < this.allObjects.length; x ++ ) {
      const distance = getDistanceFrom(camera, this.allObjects[x].position);
      if (!nearestObjectDistance || distance<nearestObjectDistance) {
        nearestObjectDistance = distance;
        nearestObject = this.allObjects[x];
        nearestIndex = x;
      }

      if ( _frustum.containsPoint(this.allObjects[x].position) && (!nearestObjectInviewDistance || distance<nearestObjectInviewDistance)) {
        nearestObjectInView = this.allObjects[x];
        nearestObjectInviewDistance = distance;
        nearestInviewIndex = x;
      }
    }

    if (nearestObjectInView!=null) {
      return { node: nearestObjectInView, pos: nearestInviewIndex, nearestObjectDistance:nearestObjectInviewDistance  }
    } else {
      return { node: nearestObject, pos: nearestIndex, nearestObjectDistance: nearestObjectDistance }
    }
  }


 hideLetters () {
    for ( var x = 0; x < this.allObjects.length; x ++ ) {
      this.allObjects[x].children[1].material.transparent = true;
      this.allObjects[x].children[1].material.opacity = 0.0;
    }
  }

   makeAllTransparent() {
    for ( var x = 0; x < allObjects.length; x ++ ) {
      this.allObjects[x].children[0].material.transparent = true;
      this.allObjects[x].children[0].material.opacity = 0.6;
      this.allObjects[x].children[1].material.transparent = true;
      this.allObjects[x].children[1].material.opacity = 0.0;
    }
  }

  makeAllShown() {
    for ( var x = 0; x < this.allObjects.length; x ++ ) {
      this.allObjects[x].children[0].material.transparent = true;
      this.allObjects[x].children[0].material.opacity = 0.6;
      this.allObjects[x].children[1].material.transparent = true;
      this.allObjects[x].children[1].material.opacity = 0.0;
    }
  }

  startNearestNodeLoop() {
    if (this.allObjects.length>0) {
      const nodeResults = getNearestNode(this.graph.cameraPosition());
      const spriteNode = nodeResults.node;
      console.log("Sprite: "+spriteNode.position.x+" "+spriteNode.position.y+" "+spriteNode.position.z);

      const nodeIndex = nodeResults.pos;

      const d3Node = this.allNodes[nodeIndex];

      const distance = 300;

      if (nodeResults.nearestObjectDistance<1000) {
        console.error("Distance: "+nodeResults.nearestObjectDistance);
        //cameraTime = cameraTimeB;
      } else if (nodeResults.nearestObjectDistance>1400) {
        console.warn("Distance: "+nodeResults.nearestObjectDistance);
        //cameraTime = cameraTimeB;
      } else {
        console.log("Distance: "+nodeResults.nearestObjectDistance);
      }

      spriteNode.scale.set(2,2,2);
      spriteNode.children[0].material.opacity = 1.0;
      spriteNode.children[1].material.opacity = 1.0;
      spriteNode.children[1].position.y=35.0;

      const distRatio = 1 + distance/Math.hypot(d3Node.x, d3Node.y, d3Node.z);

      this.graph.cameraPosition(
          { x: d3Node.x * distRatio, y: d3Node.y * distRatio, z: d3Node.z * distRatio }, // new position
          d3Node, // lookAt ({ x, y, z })
          this.cameraTime  // ms transition duration
      );

      this.allObjects.splice(nodeIndex, 1);
      this.allNodes.splice(nodeIndex, 1);
      setTimeout(()=>{
        this.startNearestNodeLoop();
        spriteNode.scale.set(1,1,1);
        spriteNode.children[0].material.opacity = 0.6;
        spriteNode.children[1].material.opacity = 0.0;
        spriteNode.children[1].position.y=17.0;
      }, this.cameraTime+2);
    } else {
      console.log("All items viewed");
    }
  }

  calculateNodePositionsKtree() {
    const nodePositions = new Float32Array( this.allObjects.length*3 );

    for (var x = 0; x < this.allObjects.length; x ++ ) {
      nodePositions[ x * 3 + 0 ] = this.allObjects[x].position.x;
      nodePositions[ x * 3 + 1 ] = this.allObjects[x].position.y;
      nodePositions[ x * 3 + 2 ] = this.allObjects[x].position.z;

      console.log(x);
      console.log(this.allObjects[x].position);
    }
    var measureStart = new Date().getTime();

    // creating the kdtree takes a lot of time to execute, in turn the nearest neighbour search will be much faster
    this.kdtree = new THREE.TypedArrayUtils.Kdtree( nodePositions, distanceFunction, 3 );

    console.log( 'TIME building kdtree', new Date().getTime() - measureStart );
  }

  weigthsSliderChange(event) {
    const weightsFilter = event.detail.value;
    if (this.weightsFilter!==weightsFilter) {
      this.weightsFilter = parseFloat(weightsFilter)/100.0;
      this.setGraphData();
    }
  }

  objectViewSliderChange(event) {
    const sliderIndex = event.detail.value;
    const index = sliderIndex-1;
    const d3Node = this.allNodes[index<0 ? 0 : index];
    const d3Object = this.allObjects[index<0 ? 0 : index];

    const distance = 300;
    const distRatio = 1 + distance/Math.hypot(d3Node.x, d3Node.y, d3Node.z);

    if (sliderIndex===0) {
      this.graph.cameraPosition(
        { x: 665, y: 0, z: -5000 }, // new position
        d3Node, // lookAt ({ x, y, z })
        this.cameraTime  // ms transition duration
      );
    } else {
      d3Object.scale.set(2,2,2);
      d3Object.children[0].material.opacity = 1.0;
      d3Object.children[1].material.opacity = 1.0;
     // d3Node.children[1].position.y=35.0;

      const distRatio = 1+ distance/Math.hypot(d3Node.x, d3Node.y, d3Node.z);

      this.graph.cameraPosition(
          { x: d3Node.x * distRatio, y: d3Node.y * distRatio, z: d3Node.z * distRatio }, // new position
          d3Node, // lookAt ({ x, y, z })
          this.cameraTime  // ms transition duration
      );

      console.log(d3Node.x * distRatio);
      console.log(d3Node.y * distRatio);
      console.log(d3Node.x * distRatio);
    }
  }

  render() {
    return html`
      <div class="layout horizontal">
        <mwc-slider
                step="2"
                pin
                ?disabled="${!this.originalGraphData}"
                markers
                @change=${this.weigthsSliderChange}
                max="95"
                min="55"
                value="74">
            </mwc-slider>
        ${ (true || this.allNodes && this.allNodes.length>0) ? html`
          <mwc-slider
                step="1"
                pin
                ?disabled="${!this.originalGraphData}"
                markers
                @change=${this.objectViewSliderChange}
                max="${100}"
                min="0"
                value="0">
          </mwc-slider>
      ` : html``}
        </div>
      <div id="3d-graph" class="graph"></div>
`;
  }
}