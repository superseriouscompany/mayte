import { Client, Configuration } from "bugsnag-react-native";

const configuration = new Configuration();
configuration.notifyReleaseStages = ['production'];
const bugsnag = new Client(configuration);

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
