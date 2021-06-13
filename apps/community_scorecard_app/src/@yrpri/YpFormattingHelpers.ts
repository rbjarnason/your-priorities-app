export class YpFormattingHelpers {
  static number(value: number | undefined): string {
    if (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return '0';
    }
  }

  static formatDate(date: Date) {
    const d = new Date(date),
      year = d.getFullYear();

    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('.');
  }

  static formatTime(date: Date): string {
    return date.toLocaleString();
  }

  static formatDateOnly(date: Date): string {
    return date.toLocaleString();
  }

  static removeClass(
    element: HTMLElement | undefined | null,
    classToRemove: string
  ) {
    let newClassName = '';
    if (element) {
      const classes = element.className.split(' ');
      for (let i = 0; i < classes.length; i++) {
        if (classes[i] !== classToRemove) {
          newClassName += classes[i] + ' ';
        }
      }
      element.className = newClassName;
    } else {
      console.error('Trying to remove class from a non exisisting element');
    }
  }
}
