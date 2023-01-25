import { Component, ChangeDetectorRef, DoCheck } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
  <h3>Child Component</h3>
  <p>TICKS: {{ lifecycleTicks }}</p>
  <p>DATA: {{ data }}</p>
  `
})
export class ChildComponent implements DoCheck{
  lifecycleTicks: number = 0;
  holdTheData: string='';
  data: string[] = ['initial'];

  constructor(private changeDetector: ChangeDetectorRef) {
    this.changeDetector.detach(); // lets the class perform its own change detection

    setTimeout(() => {
      this.holdTheData = 'final'; // intentional error
      this.data.push('intermediate');
    }, 3000);

    setTimeout(() => {
      this.data.push('final');
      this.changeDetector.markForCheck();
    }, 6000);
  }

  ngDoCheck() {
    console.log(++this.lifecycleTicks);
    alert(this.lifecycleTicks + ' ' + this.data);
    if (this.data[this.data.length - 1] !== this.holdTheData) {
      this.changeDetector.detectChanges();
    }
  }
}
