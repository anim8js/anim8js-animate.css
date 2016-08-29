
/**
 * Generate animations for all permutations of the following concepts:
 *
 * (slide|fade|zoom)(Out|In)(Down|Up)(Right|Left)(|x2|Big)
 */
(function()
{
  var actions = {
    'slide': {},
    'fade': {opacity:{from:0,to:1}},
    'zoom': {scale:{from:0,to:1}}
  };

  var directions = {
    'Out':  {from:0, to:1},
    'In':   {from:1, to:0}
  };

  var vertical = {
    'Down': 1,
    'Up': -1
  };

  var horizontal = {
    'Right': 1,
    'Left': -1
  };

  var sizes = {
    '':     {value: 100, unit: '%'},
    'x2':   {value: 200, unit: '%'},
    'Big':  {value: 2000, unit: 'px'}
  };

  for ( var a in actions )
  {
    var attrs = actions[ a ];

    for ( var d in directions )
    {
      var dir = directions[ d ];

      for ( var v in vertical )
      {
        var ver = vertical[ v ];

        for ( var h in horizontal )
        {
          var hor = horizontal[ h ];

          for ( var s in sizes )
          {
            var siz = sizes[ s ];

            var animName = a + d + v + h + s;

            if ( animName in anim8.animation )
            {
              continue;
            }

            var anim =
            {
              keyframe: {
                from: {
                  translateX: hor * dir.from * siz.value,
                  translateY: ver * dir.from * siz.value
                },
                to: {
                  translateX: hor * dir.to * siz.value,
                  translateY: ver * dir.to * siz.value
                }
              },
              units: {
                translateX: siz.unit,
                translateY: siz.unit
              }
            };

            for (var attr in attrs)
            {
              var attribute = attrs[attr];

              anim.keyframe.from[ attr ] = dir.to * attribute.to + dir.to * attribute.from;
              anim.keyframe.to[ attr ]   = dir.from * attribute.from + dir.from * attribute.to;
            }

            save( animName, anim );
          }
        }
      }
    }
  }

})();
