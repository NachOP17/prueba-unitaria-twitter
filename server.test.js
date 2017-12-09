const assert = require('chai').assert;
const expect = require('expect');
const Twit = require('twit');

var Config = require('./config');
var T = new Twit(Config.config);

var user;

describe('Prueba para recibir un usuario de Twitter', () => {
  it('Devuelve el usuario que pedí', (done) => {

    //  Inicialización
    user = {
      screen_name: 'Twitter'
    };

    //  Ejecución
    T.get('users/show', user, function(err, data, response) {
      if (err) {
        done(err);
      }

      //  Verificación
      assert.equal(err, undefined);
      assert.equal(response.headers.status, '200 OK');
      assert.equal(data.screen_name, user.screen_name);
      done();

      //  Finalización
      user = null;
    });
  });

  it('Devuelve un error si el usuario no existe', (done) => {

    //  Inicialización
    user = {
      screen_name: 'Cualquier cosa'
    }

    //  Ejecución
    T.get('users/show', user, function(err, data, response) {

      //  Verificación
      assert.equal(err.statusCode, 404);
      assert.equal(err.code, 50);
      done();

      //  Finalización
      user = null;
    });
  });
});
