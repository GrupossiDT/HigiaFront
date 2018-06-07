import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('frm-preguntasseguridad', 'Integration | Component | frm preguntasseguridad', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{frm-preguntasseguridad}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#frm-preguntasseguridad}}
      template block text
    {{/frm-preguntasseguridad}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
