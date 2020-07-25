import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll, limpiarTodos } from './todo.action';
import { Todo } from './models/todo.model';

export const estadoInicial: Todo[] = [
  new Todo('Lavar el patio'),
  new Todo('Ir al supermercado'),
  new Todo('Lavar el coche'),
  new Todo('Bañar al perro'),
  new Todo('Lavar los trastes'),
  new Todo('Hacer la tarea'),
  new Todo('Tirar la basura'),
  new Todo('Ver mi correo electronico')
];

const _todoReducer = createReducer(estadoInicial,

  on(crear, (state, { texto }) => [...state, new Todo( texto )]),

  on(limpiarTodos, state => state.filter( todo => !todo.completado )),
  
  on(borrar, (state, { id }) => state.filter( todo => todo.id !== id )),

  on(toggleAll, (state, { completado }) => state.map( todo => {

    return {
      ...todo,
      completado
    }

  })),

  on(toggle, (state, { id }) => {

    return state.map( todo => {

      if ( todo.id === id ) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }

    });

  }),

  on(editar, (state, { id, texto }) => {

    return state.map( todo => {

      if ( todo.id === id ) {
        return {
          ...todo,
          texto
        }
      } else {
        return todo;
      }

    });

  }),

);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
