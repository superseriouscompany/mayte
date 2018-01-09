import { Client } from 'bugsnag-react-native';

const bugsnag = new Client();

export default function(err) {
  if( !(err instanceof Error) )  {
    err = new Error(err)
  }

  if( __DEV__ ) {
    console.error(err)
  } else {
    bugsnag.notify(err)
  }
}
