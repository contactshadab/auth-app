
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions){
    
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNoYWRhYiBBbnNhcmkiLCJhZG1pbiI6dHJ1ZX0.tXj84ycHM50YHFDbvrhuw4y5jJwpPipdj3yg8Z-v_3A';

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(()=>{
            //Fake implementation of api/authenticate
            if(connection.request.url.endsWith('api/authenticate') && 
                connection.request.method === RequestMethod.Post){
                    let body = JSON.parse(connection.request.getBody());

                    if(body.email === 'shadab@domain.com' && body.password === '1234'){
                        connection.mockRespond(new Response(
                            new ResponseOptions({
                                status: 200,
                                body: {token: token}
                            })
                        ))
                    }else{
                        connection.mockRespond(new Response(
                            new ResponseOptions({
                                status: 200
                            })
                        ))
                    }
                }
            
            //Fake implementation of api/orders
            if(connection.request.url.endsWith('api/orders') && connection.request.method === RequestMethod.Get){
                if(connection.request.headers.get('Authorization') === 'Bearer ' + token){
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                            status: 200,
                            body: [1,2,3,4]
                        })
                    ));
                }else{
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 401 })
                    ));
                }
            }

        }, 1000);
    });

    return new Http(backend, options);
}

export let fakeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};