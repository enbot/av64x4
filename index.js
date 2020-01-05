export * from './lib/index.js'
// export * from './cdn/av64x4.js'

// (function (name, definition, context, dependencies) {
//     if (typeof context['module'] !== 'undefined' && context['module']['exports']) {
//         if (dependencies && context['require']) {
//             for (var i = 0; i < dependencies.length; i++)
//                 context[dependencies[i]] = context['require'](dependencies[i]);
//         }
//         context['module']['exports'] = definition.apply(context);
//     } else if (typeof context['define'] !== 'undefined' && context['define'] === 'function' && context['define']['amd']) {
//         define(name, (dependencies || []), definition);
//     } else {
//         context[name] = definition();
//     }

// })('name', function (test) {


//     return {


//     }

// }, this, ["test"]);