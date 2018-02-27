import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('actualizar-usuario', 'Integration | Component | actualizar usuario', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{actualizar-usuario}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#actualizar-usuario}}
      template block text
    {{/actualizar-usuario}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
