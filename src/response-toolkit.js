// Detailed notation
const handler1 = (request, h) => {
    const response = h.response('success');
    response.type('text/plain');
    response.header('X-Custom', 'some-value');
    return response;
};
 
// Chained notation
const handler2 = (request, h) => {
    return h.response('success')
        .type('text/plain')
        .header('X-Custom', 'some-value');
};

// etika Anda butuh mengubah nilai status response, 
//di situlah Anda membutuhkan parameter h
//
// server.route({
//     method: 'POST',
//     path: '/user',
//     handler: (request, h) => {
//         return h.response('created').code(201);
//     },
// });