import DS from 'ember-data';

export default DS.Model.extend({
  cdgo: DS.attr('string'),
  dscrpcn: DS.attr('string'),
  idPregunta: DS.attr('string')
});
