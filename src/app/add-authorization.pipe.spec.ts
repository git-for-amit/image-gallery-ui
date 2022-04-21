import { AddAuthorizationPipe } from './add-authorization.pipe';

describe('AddAuthorizationPipe', () => {
  it('create an instance', () => {
    const pipe = new AddAuthorizationPipe();
    expect(pipe).toBeTruthy();
  });
});
