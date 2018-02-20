import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('boton-actualizar', 'Integration | Component | boton actualizar', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{boton-actualizar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#boton-actualizar}}
      template block text
    {{/boton-actualizar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
