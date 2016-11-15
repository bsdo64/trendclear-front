import Alt from 'alt';

const alt = new Alt({});


if (process.env.NODE_ENV !== 'production') {
  // Debug
  Alt.debug('alt', alt);

  alt.dispatcher.register((state) => {
    console.log('%cAction : ' + state.action, "color: #3769AC; font-weight: bold;");
  });
}

export default alt;
