import Component from '@ember/component';

export default Component.extend({
  classNames        : [ 'draggableItem' ],
  attributeBindings : [ 'draggable' ],
  draggable         : 'true',
  dragStart(event) {

    event.dataTransfer.effecAllowed = 'move'; // Define el efecto como mover (Es el por defecto)
    event.dataTransfer.setData("Data", event.target.id); // Coje el elemento que se va a mover
    event.dataTransfer.setDragImage(event.target, 0, 0); // Define la imagen que se vera al ser arrastrado el elemento y por donde se coje el elemento que se va a mover (el raton aparece en la esquina sup_izq con 0,0)
    event.target.style.opacity = '0.8';
    return event.dataTransfer.setData("text", event.target.id);
  },
  dragEnd(event){
      event.target.style.opacity = ''; // Pone la opacidad del elemento a 1
      event.dataTransfer.clearData("Data");
  }

});
