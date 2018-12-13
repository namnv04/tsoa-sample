import { Controller, Get, Route } from 'tsoa';

@Route('greet')
export class GreetingController extends Controller {

    /**
     * Greets user by name.
     * @param {string} name Name of the user to greet.
     */
    @Get('{name}')
    public async greetUser(name: string): Promise<string> {
        if (name === 'bar') {
            throw new Error('name not found');
        }
        return 'Ok'
    }
    /**
     * Greets user by name.
     * @param {string} name Name of the user to greet.
     */
    @Get('{randomname}')
    public async greetRandomUser(randomname: string): Promise<string> {
        if (randomname === 'bar') {
            throw new Error('name not found');
        }
        return 'Ok'
    }
}
