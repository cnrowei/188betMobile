{[{define "header"}]}


<meta name="robots" content="" />
    <meta name="keywords" />Ï
    <meta name="description" />
    <!-- FB OG Tag -->
    <meta property="og:url" />
    <meta property="fb:app_id" content="219151658144170" />
    <meta property="og:title" />
    <meta property="og:description" />
    <meta property="og:image"/>

    <link href="/cdn1101/bundles/css/bootstrap.css?v=3.030904.0" rel="stylesheet"></link>
    <link href="/cdn1101/bundles/css/mainCss.css?v=3.030904.1" rel="stylesheet"></link>
    <script language="javascript" type="text/javascript">
    //{[{.title}]}
    var gv = {
        root: '/',
        lan: 'zh-cn', lans: JSON && JSON.parse('[{"index":1,"display":"English","value":"en-gb"},{"index":2,"display":"简体","value":"zh-cn"}]'),
        rv: '3.030904.1',
        cv: '04061029',
        brand: '188BET',
        prods: JSON && JSON.parse('{[{.prods}]}'),
        generals: JSON && JSON.parse('{[{.generals}]}'),
        regs: JSON && JSON.parse('{[{.regs}]}'),
        cooperativeSet: JSON && JSON.parse('{[{.cooperativeSet}]}'),
        emails: JSON && JSON.parse('{[{.emails}]}'),
        modules: JSON && JSON.parse('{[{.modules}]}'),
        domains: JSON && JSON.parse('{[{.domains}]}'),
        lowBalance: JSON && JSON.parse('{[{.lowBalance}]}'),
        firstLaunch: true,
        memberHost: '188bet',
        serverCode: 'ADIAAI',
        channelId : '1',
        apsChannelId: '1',
        pageStatus:  0,
        prodName: ""
    };

    function setCurrentlan() {
        var language = location.pathname.split("/")[1];
        var matchlan = gv.lans.filter(function (lan) { return lan.value === language; });
        var deflan = matchlan.length > 0 ? matchlan[0] : getbrowserlan();
        gv.language = deflan;
        gv.lan = deflan.value;
    }

    function getbrowserlan() {
        var browserlan = navigator.languages || navigator.language;
        var deflan = gv.lans.filter(function (lan) {
            browserlan = Array.isArray(browserlan) ? browserlan[0] : browserlan;
            browserlan = browserlan.substr(0, 2).toLowerCase();
            return lan.value.indexOf(browserlan) != -1;
        });
        return deflan.length != 0 ? deflan[0] : gv.lans[0];
    }

    setCurrentlan();
</script>
    <script language="javascript" type="text/javascript">
    var uv = {
        geod: JSON.parse('{"country":"CN","reg":"China","cc":"RMB","symbol":"¥","timezone":"+08:00","utcoffset":480.0}'),
        pd: JSON.parse('{"sb":true,"c":"CN","cid":44,"r":"China","l":"zh-cn,en-gb","favs":"","sv":"1","did":"712326937985100329","spcreg":"","spcdomain":"","ratelist":{}}'),
        sessionD: JSON.parse('{"login":true,"changeFlag":false,"oddsType":2,"mberType":1,"aff":"affiliates","lans":[{"index":1,"display":"English","value":"en-gb"},{"index":2,"display":"简体","value":"zh-cn"}],"allowAccess":true,"suspended":false,"isAdminExclusion":false,"landinged":false,"excluded":false,"aliases":{"pn":"Bingo","an":""},"aId":14964068,"userId":14986075,"gender":2,"balance":9999,"loginId":"conku188","memberCode":"conku188","ssid":"0VragXl1N19M86oxSlnfWQ..","disableProds":[],"nsdl":false,"deviceOS":null,"remindDuration":0,"recdomain":[],"mappGate":null,"email":"conku@msn.com","ismobile":false,"isEzdomain":false}')
    };
</script>
    <script src="/cdn1101/bundles/libs/bootstrapJs.js?v=3.030904.0"></script>


{[{end}]}