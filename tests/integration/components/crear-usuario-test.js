import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('crear-usuario', 'Integration | Component | crear usuario', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{crear-usuario}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#crear-usuario}}
      template block text
    {{/crear-usuario}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
