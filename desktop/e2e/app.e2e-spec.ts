import { MigPage } from './app.po';

describe('mig App', () => {
  let page: MigPage;

  beforeEach(() => {
    page = new MigPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
