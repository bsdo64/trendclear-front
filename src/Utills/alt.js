import Alt from 'alt';

const alt = new Alt({});

// Debug
Alt.debug('alt', alt);

alt.dispatcher.register((state) => {
  if (!process.env.NODE) {
    let snapshot = alt.takeSnapshot();

    /* Debug - Action Logs */
    console.info('%cAction : ' + state.action, "color: #3769AC; font-weight: bold;");
  }
});

export default alt;
