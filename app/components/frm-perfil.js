import Component from '@ember/component';

export default Component.extend({
  validate:{
    form:{
      cdgo:{
        required: true,
        message: 'Debes escribir el codigo de la Pregunta'
      },
      dscrpcn:{
        required: true,
        message: 'Debes escribir la descripción de la pregunta'
      }
    }
  },
  actions:{
    update(){
      console.log("Hola");
    }
  }
});
