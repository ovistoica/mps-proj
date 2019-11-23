import { Reactotron } from '../services/reactotron';
import { Api, ApiConfig } from '../services/api';

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */

const localApiConfig: ApiConfig = {
  url: 'http://10.0.2.2:8000/api',
  timeout: 2000,
};

export class Environment {
  constructor(apiConfig: ApiConfig) {
    // create each service
    this.reactotron = new Reactotron();
    this.api = new Api(apiConfig || localApiConfig);
  }

  async setup() {
    // allow each service to setup
    await this.reactotron.setup();
    await this.api.setup();
  }

  /**
   * Reactotron is only available in dev.
   */
  reactotron: Reactotron;

  /**
   * Our api.
   */
  api: Api;
}
