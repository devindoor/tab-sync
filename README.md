# tab-sync

Tab synchronizer is a js library that allow you to communicate between multiple browser tabs that have same origin

## compatibility

IE 9, Google Chrome, Mozilla Firefox, Safari, Opera and the most updated browser

## usage

    npm i @devhobby/tab-sync --save

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
