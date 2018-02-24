import { helper } from '@ember/component/helper';

export function ifcond(params) {
  var estado=false;
  if( params[0] == params[1] ){
    estado = true;
  } else {
    estado = false;
  }
  return estado;
}

export default helper(ifcond);
