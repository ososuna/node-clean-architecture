import { get } from 'env-var';
/**
* @envs Adapter pattern 
* @description This file allows us to easily modify only one file
* in case we decide to use different third-party packages,
* helping us avoid coupling with those packages.
* @author Oswaldo Osuna
*/
export const envs = {
  PORT: get('PORT').required().asPortNumber()
}