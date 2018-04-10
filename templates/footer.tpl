{[{define "footer"}]}
    
    <!-- <footer ms-footer></footer> -->

    <script src="/cdn1101/bundles/libs/angularJs.js?v=3.030904.0"></script>
    <script src="/signalrnet/hubs.js" type="text/javascript"></script>
    <script src="/cdn1101/bundles/scripts/starAppJs.js?v=3.030904.0"></script>
    
<script type="text/javascript">
     function getBlackbox() {
          var bbox = typeof ioGetBlackbox !== "undefined" ? ioGetBlackbox() : '';
          var firstbbox = typeof fpGetBlackbox !== "undefined" ? fpGetBlackbox() : '';
          return firstbbox.blackbox + ";" + bbox.blackbox;
      }
</script>

{[{end}]}