function callall( fns ){
  return function(){
    var output = new Array( fns.length )

    for( var i = 0; i < fns.length; i++ )
      output[ i ] =  fns[ i ].apply( this, arguments )

    return output
  }
}

if( typeof module != 'undefined' ) module[ 'exports' ] = callall
else if( typeof window != 'undefined' ) window.callall = callall
