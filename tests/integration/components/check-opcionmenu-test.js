import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('check-opcionmenu', 'Integration | Component | check opcionmenu', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{check-opcionmenu}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#check-opcionmenu}}
      template block text
    {{/check-opcionmenu}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
