import test from 'tape';
// import clickCounter from '../../src/server/static/js/clickCounter';

test('Count my clicks', function (t) {
    const click = clickCounter();

    click.click();
    expect.equal(click.click(), 1, 'I counted to 1');
    expect.end();
});


