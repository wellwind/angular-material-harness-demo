import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';

import { ButtonsAreaComponent } from './buttons-area.component';
import { By } from '@angular/platform-browser';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { AppModule } from '../app.module';

describe('ButtonsAreaComponent', () => {
  let component: ButtonsAreaComponent;
  let fixture: ComponentFixture<ButtonsAreaComponent>;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ButtonsAreaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsAreaComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a [GO] button', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));

    expect(buttons.length).toBe(2);
    expect((buttons[0].nativeElement as HTMLButtonElement).textContent).toContain('GO');
  });

  it('should have a [GO] button (harness)', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);

    expect(buttons.length).toBe(2);
    expect(await buttons[0].getText()).toContain('GO');
  });

  it('should disable button when click', async () => {
    const button = fixture.debugElement.query(By.css('button[color=primary]'));
    const buttonElement = button.nativeElement as HTMLButtonElement;

    expect(buttonElement.disabled).toBeFalse();

    button.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(buttonElement.disabled).toBeTrue();
  });

  it('should disable button when click (harness)', async () => {
    const button = await loader.getHarness(MatButtonHarness.with({ text: 'GO' }));

    expect(await button.isDisabled()).toBeFalse();

    await button.click();

    expect(await button.isDisabled()).toBeTrue();
  });

  it('should display Save & Exit options when click select', async () => {
    const selectTrigger = fixture.debugElement.query(By.css('.mat-select-trigger'));

    selectTrigger.triggerEventHandler('click', {});
    fixture.detectChanges();
    await fixture.whenStable();

    const options = document.querySelectorAll('.mat-select-panel mat-option');
    expect(options.length).toBe(2);
  });

  it('should display Save & Exit options when click select (harness)', async () => {
    const select = await loader.getHarness(MatSelectHarness);

    await select.open();

    const options = await select.getOptions();
    expect(options.length).toBe(2);
  });

  it('should set selectedValue when select changed', async () => {
    const selectTrigger = fixture.debugElement.query(By.css('.mat-select-trigger'));

    selectTrigger.triggerEventHandler('click', {});
    fixture.detectChanges();
    await fixture.whenStable();

    const options = document.querySelectorAll('.mat-select-panel mat-option');
    options[1].dispatchEvent(new Event('click'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.querySelector('.mat-select-value-text').textContent).toContain(options[1].textContent.trim());
    expect(component.selectedAction).toContain(options[1].textContent.trim());
  });

  it('should set selectedValue when select changed (harness)', async () => {
    const select = await loader.getHarness(MatSelectHarness);

    await select.open();

    const options = await select.getOptions();

    await options[1].click();

    expect(await options[1].isSelected()).toBeTrue();
    expect(component.selectedAction).toContain((await options[1].getText()).trim());
  });
});
