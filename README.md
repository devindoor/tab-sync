# tab-sync

Tab synchronizer is a library that allow you tu communicate between multiple tabs

## compatibility

IE 9, Google Chrome, Mozilla Firefox, Safari, Opera and the most updated browser

## install

    npm i @devhobby/tab-sync --save

## usage

first tab

    import {TabSync} from 'tab-sync'
    const tabEmitter = TabSync()

    setTimeout(() => {
    	tabEmitter.sync('myEvent', { params: {<any>}, applyOriginEmitter: boolean })
    }, 5000)

    tabEmitter.on('myEvent', (data) => {
    	console.log(data.params)
    })


second tab

    import {TabSync} from 'tab-sync'
    const tabEmitter = TabSync()
    
    tabEmitter.on('hello', function (data) {
    	console.log(data.params)
    })
    
Note : tabEmitter.Sync() accept two parameters . The first param is the eventName to identify the event that will be emitted. The second param is a Object that contains two properties:

 1. params => arbitrary data that you would emit at all listeners

 1. applyOriginEmitter => this is a boolean that allow to emit also at emitterTab. default value is false. 