import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { ButtonsAreaHarness } from './buttons-area/testing/buttons-area-harness';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppModule],
      declarations: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should have a buttons-area component', async () => {
    const buttonsArea = await loader.getAllHarnesses(ButtonsAreaHarness);
    expect(buttonsArea.length).toBe(1);
  });

  it('should call #getAction of component', async () => {
    spyOn(component, 'getAction');
    const buttonsArea = await loader.getHarness(ButtonsAreaHarness);
    await buttonsArea.selectActionAndClickButton('Save');
    expect(component.getAction).toHaveBeenCalledWith('Save');
  });
});
