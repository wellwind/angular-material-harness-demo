import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSelectHarness } from '@angular/material/select/testing';

export class ButtonsAreaHarness extends ComponentHarness {
  static hostSelector = 'app-buttons-area';

  getSelect = this.locatorFor(MatSelectHarness);
  getButton = this.locatorFor(MatButtonHarness.with({ text: 'GO' }));

  async selectActionAndClickButton(action: string) {
    const select = await this.getSelect();
    const button = await this.getButton();

    await select.clickOptions({ text: action });
    await button.click();
  }
}
