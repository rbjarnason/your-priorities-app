/* eslint-disable @typescript-eslint/camelcase */
import { html, fixture, expect, aTimeout } from '@open-wc/testing';

import { YpGroup } from '../yp-group.js';
import '../yp-group.js';
import { YpTestHelpers } from '../../common/test/setup-app.js';
import sinon from 'sinon'; 

describe('YpGroup', () => {
  let element: YpGroup;
  let server: any;
  let fetchMock: any;

  before(async () => {
    fetchMock = YpTestHelpers.getFetchMock();
    await YpTestHelpers.setupApp();
    
    server = sinon.fakeServer.create();
    server.respondWith('GET', '/api/group/1', [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(YpTestHelpers.getGroup())
    ]);
  });

  beforeEach(async () => {
    element = await fixture(html`
      ${YpTestHelpers.renderCommonHeader()}
      <yp-group
        collectionId="1">
      </yp-group>
    `);
    await aTimeout(100);
    server.respond();
  });

  it('passes the a11y audit', async () => {
    debugger; 
    await expect(element).shadowDom.to.be.accessible();
  });
  after(async () => {
    server.restore();
  });
});
