import jsPDF from 'jspdf';

// EFFECTS: converts date to XX:XX AM or XX:XX PM
const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
};

const showLocation = (item) => {
    if (item.location.display_address[1]) {
        return `<b>${item.location.display_address[0] + " " + item.location.display_address[1]}</b>`;
    } else {
        return `<b>${item.location.display_address[0]}</b>`;
    }
};

const showDate = (item) => {
    if (item.start_time && item.end_time) {
        return `<b><em>${formatAMPM(new Date(item.start_time.toString())) + ' - ' + formatAMPM(new Date(item.end_time.toString()))}</em></b>`;
    } else if (item.start_time) {
        return `<b><em>Begins at ${formatAMPM(new Date(item.start_time.toString()))}</em></b>`;
    } else if (item.end_time) {
        return `<b><em>Until ${formatAMPM(new Date(item.end_time.toString()))}</em></b>`;
    }
};

export const showLocationRaw = (item) => {
    if (item.location.display_address[1]) {
        return `${item.location.display_address[0] + " " + item.location.display_address[1]}`;
    } else {
        return `${item.location.display_address[0]}`;
    }
};

export const showDateRaw = (item) => {
    if (item.start_time && item.end_time) {
        return `${formatAMPM(new Date(item.start_time.toString())) + ' - ' + formatAMPM(new Date(item.end_time.toString()))}`;
    } else if (item.start_time) {
        return `Begins at ${formatAMPM(new Date(item.start_time.toString()))}`;
    } else if (item.end_time) {
        return `Until ${formatAMPM(new Date(item.end_time.toString()))}`;
    }
};

const makeItem = (json) => {
    let dateString = showDate(json);
    let address = showLocation(json);
    let description = json.description;
    let price = json.price;
    let link = json.link;

    return `
        <!-- content -->
        <div class="content">
            <table bgcolor="">
                <tr>
                    <td>
                        <h4>${json.name}</h4>
                        <p class="hours">Hours: ${(dateString) ? dateString : 'n/a'} </p>
                        <p class="address">Address: ${(address ? address : 'n/a')} </p>
                        <p class="description">Description: ${description ? description : 'n/a'} </p>
                        <p class="price">Price: ${price ? price : 'n/a'} </p>
                        <a class="btn" href="${link ? link : 'n/a'}">More Details &raquo;</a>
                    </td>
                </tr>
            </table>
        </div>
        <!-- /content -->
    `;
}

const makeItinerary = (items) => {
    let out = ``;
    for (let item of items){
        out = out + makeItem(item);
    }
    return out;
};

/*
REQUIRED:  itinJson should contain:
            - date: the date of this particular itinerary
            - items: an array of events/attractions
*/
export const makeItinHtml = (itinJson) => { 
    let itineraryDateString = itinJson.date;
    let itemsInItinerary = makeItinerary(itinJson.items);
    return`
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
            "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html>
        <!--https://zurb.com/playground/responsive-email-templates-->
        <head>
            <!-- If you delete this meta tag, the ground will open and swallow you. -->
            <meta name="viewport" content="width=device-width"/>
        
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
            <title>VanGo</title>
            
            <style>
            
            
            
            /* ------------------------------------- 
                    GLOBAL 
            ------------------------------------- */
            * { 
                margin:0;
                padding:0;
            }
            * { font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; }
            
            img { 
                max-width: 100%; 
            }
            .collapse {
                margin:0;
                padding:0;
            }
            body {
                -webkit-font-smoothing:antialiased; 
                -webkit-text-size-adjust:none; 
                width: 100%!important; 
                height: 100%;
            }
            
            
            /* ------------------------------------- 
                    ELEMENTS 
            ------------------------------------- */
            a { color: #2BA6CB;}
            
            .btn {
                text-decoration:none;
                color: #FFF;
                background-color: #666;
                padding:10px 16px;
                font-weight:bold;
                margin-right:10px;
                text-align:center;
                cursor:pointer;
                display: inline-block;
            }
            
            p.callout {
                padding:15px;
                background-color:#ECF8FF;
                margin-bottom: 15px;
            }
            .callout a {
                font-weight:bold;
                color: #2BA6CB;
            }
            
            table.social {
            /* 	padding:15px; */
                background-color: #ebebeb;
                
            }
            .social .soc-btn {
                padding: 3px 7px;
                font-size:12px;
                margin-bottom:10px;
                text-decoration:none;
                color: #FFF;font-weight:bold;
                display:block;
                text-align:center;
            }
            a.fb { background-color: #3B5998!important; }
            a.tw { background-color: #1daced!important; }
            a.gp { background-color: #DB4A39!important; }
            a.ms { background-color: #000!important; }
            
            .sidebar .soc-btn { 
                display:block;
                width:100%;
            }
            
            /* ------------------------------------- 
                    HEADER 
            ------------------------------------- */
            table.head-wrap { width: 100%;}
            
            .header.container table td.logo { padding: 15px; }
            .header.container table td.label { padding: 15px; padding-left:0px;}
            
            
            /* ------------------------------------- 
                    BODY 
            ------------------------------------- */
            table.body-wrap { width: 100%;}
            
            
            /* ------------------------------------- 
                    FOOTER 
            ------------------------------------- */
            table.footer-wrap { width: 100%;	clear:both!important;
            }
            .footer-wrap .container td.content  p { border-top: 1px solid rgb(215,215,215); padding-top:15px;}
            .footer-wrap .container td.content p {
                font-size:10px;
                font-weight: bold;
                
            }
            
            
            /* ------------------------------------- 
                    TYPOGRAPHY 
            ------------------------------------- */
            h1,h2,h3,h4,h5,h6 {
            font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; line-height: 1.1; margin-bottom:15px; color:#000;
            }
            h1 small, h2 small, h3 small, h4 small, h5 small, h6 small { font-size: 60%; color: #6f6f6f; line-height: 0; text-transform: none; }
            
            h1 { font-weight:200; font-size: 44px;}
            h2 { font-weight:200; font-size: 37px;}
            h3 { font-weight:500; font-size: 27px;}
            h4 { font-weight:500; font-size: 23px;}
            h5 { font-weight:900; font-size: 17px;}
            h6 { font-weight:900; font-size: 14px; text-transform: uppercase; color:#444;}
            
            .collapse { margin:0!important;}
            
            p, ul { 
                margin-bottom: 10px; 
                font-weight: normal; 
                font-size:14px; 
                line-height:1.6;
            }
            p.lead { font-size:17px; }
            p.last { margin-bottom:0px;}
            
            ul li {
                margin-left:5px;
                list-style-position: inside;
            }
            
            /* ------------------------------------- 
                    SIDEBAR 
            ------------------------------------- */
            ul.sidebar {
                background:#ebebeb;
                display:block;
                list-style-type: none;
            }
            ul.sidebar li { display: block; margin:0;}
            ul.sidebar li a {
                text-decoration:none;
                color: #666;
                padding:10px 16px;
            /* 	font-weight:bold; */
                margin-right:10px;
            /* 	text-align:center; */
                cursor:pointer;
                border-bottom: 1px solid #777777;
                border-top: 1px solid #FFFFFF;
                display:block;
                margin:0;
            }
            ul.sidebar li a.last { border-bottom-width:0px;}
            ul.sidebar li a h1,ul.sidebar li a h2,ul.sidebar li a h3,ul.sidebar li a h4,ul.sidebar li a h5,ul.sidebar li a h6,ul.sidebar li a p { margin-bottom:0!important;}
            
            
            
            /* --------------------------------------------------- 
                    RESPONSIVENESS
                    Nuke it from orbit. It's the only way to be sure. 
            ------------------------------------------------------ */
            
            /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
            .container {
                display:block!important;
                max-width:600px!important;
                margin:0 auto!important; /* makes it centered */
                clear:both!important;
            }
            
            /* This should also be a block element, so that it will fill 100% of the .container */
            .content {
                padding:15px;
                max-width:600px;
                margin:0 auto;
                display:block; 
            }
            
            /* Let's make sure tables in the content area are 100% wide */
            .content table { width: 100%; }
            
            
            /* Odds and ends */
            .column {
                width: 300px;
                float:left;
            }
            .column tr td { padding: 15px; }
            .column-wrap { 
                padding:0!important; 
                margin:0 auto; 
                max-width:600px!important;
            }
            .column table { width:100%;}
            .social .column {
                width: 280px;
                min-width: 279px;
                float:left;
            }
            
            /* Be sure to place a .clear element after each set of columns, just to be safe */
            .clear { display: block; clear: both; }
            
            
            /* ------------------------------------------- 
                    PHONE
                    For clients that support media queries.
                    Nothing fancy. 
            -------------------------------------------- */
            @media only screen and (max-width: 600px) {
                
                a[class="btn"] { display:block!important; margin-bottom:10px!important; background-image:none!important; margin-right:0!important;}
            
                div[class="column"] { width: auto!important; float:none!important;}
                
                table.social div[class="column"] {
                    width:auto!important;
                }
            
            }
        </style>
        
        </head>
        
        <body bgcolor="#FFFFFF" topmargin="0" leftmargin="0" marginheight="0" marginwidth="0">
        
        <!-- HEADER -->
        <table class="head-wrap" bgcolor="#999999">
            <tr>
                <td></td>
                <td class="header container" align="">
        
                    <!-- /content -->
                    <div class="content">
                        <table bgcolor="#999999">
                            <tr>
                                <td align="left"><h6 class="collapse">Itinerary</h6></td>
                                <td align="right"><h6 class="collapse">sent by VanGo</h6></td>
                            </tr>
                        </table>
                    </div><!-- /content -->
        
                </td>
                <td></td>
            </tr>
        </table>
        <!-- /HEADER -->
        
        <!-- BODY -->
        <body>
        <table class="body-wrap" bgcolor="">
            <tr>
                <td></td>
                <td class="container" align="" bgcolor="#FFFFFF">
                    
                    <!-- content -->
                    <div class="content">
                        <h3><small>The following itinerary is for "${itineraryDateString}"</small></h3>
                    </div>
                    <!-- /content -->
        
                    ${itemsInItinerary}
                    
                    <!-- content -->
                    <div class="content">
                        <table bgcolor="">
                            <tr>
                                <td>
        
                                    <!-- social & contact -->
                                    <table bgcolor="" class="social" width="100%">
                                        <tr>
                                            <td>
                                                <!--- column 2 -->
                                                <div class="column">
                                                    <table bgcolor="" cellpadding="" align="left">
                                                        <tr>
                                                            <td>
        
                                                                <h5 class="">VanGo:</h5>
                                                                <p>
                                                                    Phone: <strong>123.456.000</strong><br/>
                                                                    Email: <strong><a href="emailto:hseldon@trantor.com">VanGo436@gmail.com</a></strong>
                                                                </p>
        
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <!-- /column 2 -->
        
                                                <div class="clear"></div>
        
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- /social & contact -->
        
                                </td>
                            </tr>
                        </table>
                    </div><!-- /content -->
        
        
                </td>
                <td></td>
            </tr>
        </table></body><!-- /BODY -->
        
        <!-- FOOTER -->
        <table class="footer-wrap">
            <tr>
                <td></td>
                <td class="container">
        
                    <!-- content -->
                    <div class="content">
                        <table>
                            <tr>
                                <td align="center">
                                    <p>
                                        <a href="#">Terms</a> |
                                        <a href="#">Privacy</a> |
                                        <a href="#">
                                            <unsubscribe>Unsubscribe</unsubscribe>
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div><!-- /content -->
        
                </td>
                <td></td>
            </tr>
        </table><!-- /FOOTER -->
        
        </body>
        </html>
    `;
};

export const downloadPdf = (date, items) => {
    // let itinSummary = {
    //     date: this.getDate(),
    //     items: this.selectItems()
    // }
    // let htmlStr = makeItinHtml(itinSummary);
    // htmlStr = $(htmlStr);
    // let htmlBody = $('body', htmlStr);
    // doc.html(htmlBody);

    let doc = new jsPDF();

    // Banner
    let banner = 'data:image/jpeg;base64,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sPwJI/Crvh74b+HvCN0Z9K0HRdMmYYMlpYxQsR9VUGtqgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/TL/AIJ9f8mh+Ef+3z/0tnr8za/TL/gn1/yaH4R/7fP/AEtnoA9mooooAK/M3/goL/yd54u/7c//AEigr9Mq/M3/AIKC/wDJ3ni7/tz/APSKCgDxmiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/TL/AIJ9f8mh+Ef+3z/0tnr8za/TL/gn1/yaH4R/7fP/AEtnoA9mooooAK/M3/goL/yd54u/7c//AEigr9Mq5nxD8FfBvi3WJdQ1Xwl4Z1O/uNvm3N3pcE00m1Qo3OyknCgAZPQAUAfkbRX6y/8ADOXw9/6EPwZ/4JLb/wCIo/4Zy+Hv/Qh+DP8AwSW3/wARQB+TVFfrL/wzl8Pf+hD8Gf8Agktv/iKP+Gcvh7/0Ifgz/wAElt/8RQB+TVFfrL/wzl8Pf+hD8Gf+CS2/+Io/4Zy+Hv8A0Ifgz/wSW3/xFAH5NUV+sv8Awzl8Pf8AoQ/Bn/gktv8A4ij/AIZy+Hv/AEIfgz/wSW3/AMRQB+TVFfrL/wAM5fD3/oQ/Bn/gktv/AIij/hnL4e/9CH4M/wDBJbf/ABFAH5NUV+sv/DOXw9/6EPwZ/wCCS2/+Io/4Zy+Hv/Qh+DP/AASW3/xFAH5NUV+sv/DOXw9/6EPwZ/4JLb/4ij/hnL4e/wDQh+DP/BJbf/EUAfk1RX6y/wDDOXw9/wChD8Gf+CS2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+hD8Gf8Agktv/iKP+Gcvh7/0Ifgz/wAElt/8RQB+TVFfrL/wzl8Pf+hD8Gf+CS2/+Io/4Zy+Hv8A0Ifgz/wSW3/xFAH5NUV+sv8Awzl8Pf8AoQ/Bn/gktv8A4ij/AIZy+Hv/AEIfgz/wSW3/AMRQB+TVFfrL/wAM5fD3/oQ/Bn/gktv/AIij/hnL4e/9CH4M/wDBJbf/ABFAH5NUV+sv/DOXw9/6EPwZ/wCCS2/+Io/4Zy+Hv/Qh+DP/AASW3/xFAH5NUV+sv/DOXw9/6EPwZ/4JLb/4ij/hnL4e/wDQh+DP/BJbf/EUAfk1RX6y/wDDOXw9/wChD8Gf+CS2/wDiKP8AhnL4e/8AQh+DP/BJbf8AxFAH5NV+mX/BPr/k0Pwj/wBvn/pbPXZ/8M5fD3/oQ/Bn/gktv/iK6bw94c0/wlo8Wn6VYWemWFvu8q2tIFhhj3MWO1FAAyxJOB1JNAF2iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/9k=';
    
    doc.addImage(banner, 'JPEG', 17, 10, 180, 15);
    doc.setFont('helvetica');

    //Title
    doc.setTextColor('#616161');
    doc.text(date, 85, 35);
 
    doc.setTextColor('#000000');
    let x = 45;
    let y = 48;
    for (let item of items) {
        if (y > 250) {
            doc.addPage();
            y = 20;
        }
        let dateString = showDateRaw(item);
        let address = showLocationRaw(item);
        let description = item.description;
        let price = item.price;
        let link = item.link;

        // Name
        doc.setFontSize(12);
        doc.setFontType('bold');
        doc.text(`${item.name}`, x, y);
        y += 8;

        // Time
        doc.setFontSize(10);
        doc.setFontType('normal');
        if (dateString) {
            doc.text('Hours: ', x, y);
            doc.setFontType('bolditalic');
            doc.text(dateString, x + 11, y);
            y += 8;
        } else {
            doc.text('Hours: ', x, y);
            doc.setFontType('bolditalic');
            doc.text('n/a', x + 11, y);
            y += 8;
        }

        // Address
        doc.setFontType('normal');
        if (address) {
            doc.text('Address: ', x, y);
            doc.setFontType('bold');
            doc.text(address, x + 15, y);
            y += 8;
        } else {
            doc.text('Address: ', x, y);
            doc.setFontType('bold');
            doc.text('n/a', x + 15, y);
            y += 8;
        }

        // Description
        doc.setFontType('normal');
        if (description) {
            let splitDesc = doc.splitTextToSize(description, 100);
            for (var i = 0; i < splitDesc.length; i++) {
                if (i == 0) {
                    doc.text(`Description: ${splitDesc[i]}`, x, y);
                    y += 5;
                } else {
                    doc.text(`${splitDesc[i]}`, x + 20, y);
                    y += 5;
                }
            }
        } else {
            doc.text('Description: n/a', x, y);
            y += 5;
        }
        y += 3;

        // Price
        doc.text(`Price: ${price ? '$' + price : 'n/a'}`, x, y);
        y += 8;

        // Link
        doc.text('Details: ', x, y);
        if (link) {
            doc.setTextColor('#0000EE');
            doc.textWithLink('link', x + 13, y, {url: link});
            // doc.text(link, x + 13, y)
            y += 15;
        } else {
            doc.text('n/a', x + 13, y);
            y += 15;
        }
        doc.setTextColor('#000000');
    }
    let footer = 'data:image/jpeg;base64,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A/WCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPUKKKKACquuf8gW8/64P/AOgmrVVdc/5At5/1wf8A9BNAHnNFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB6hRRRQAVV1z/kC3n/XB/wD0E1aqrrn/ACBbz/rg/wD6CaAPOaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD1CiiigAqrrn/ACBbz/rg/wD6CatVV1z/AJAt5/1wf/0E0Aec0UUUAFfLH/BTb4nfEbwjqPwU8M/DfxzJ8PdS+IvjmPw/e6smj2mqNFbtaXEvEVyjIfmjU8bTx1xkV9T18V/8Fgfh6vxX8Xfs0+HH1nxD4dXWPidDbnUtCvmsdSs82F388E6gmN+PvCgDG/aHvP2jv+Cffw6/4Whrfx+sfi34d0XULODVvDmreB7DSWu7ee4jhY29xaFXWdfMyoYMpI59D2er/wDBRLRfgh+2p8UvDvxG8ZQ6X4V0vR9B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'
    doc.addImage(footer, 'JPEG', 25, y, 160, 30);
    doc.save("VanGo_itinerary.pdf");
}
