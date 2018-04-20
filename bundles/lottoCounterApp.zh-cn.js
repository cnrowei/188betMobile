
/*
* jQuery timepicker addon
* By: Trent Richardson [http://trentrichardson.com]
* Version 0.9.9
* Last Modified: 02/05/2012
*
* Copyright 2012 Trent Richardson
* Dual licensed under the MIT and GPL licenses.
* http://trentrichardson.com/Impromptu/GPL-LICENSE.txt
* http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
*
* HERES THE CSS:
* .ui-timepicker-div .ui-widget-header { margin-bottom: 8px; }
* .ui-timepicker-div dl { text-align: left; }
* .ui-timepicker-div dl dt { height: 25px; margin-bottom: -25px; }
* .ui-timepicker-div dl dd { margin: 0 10px 10px 65px; }
* .ui-timepicker-div td { font-size: 90%; }
* .ui-tpicker-grid-label { background: none; border: none; margin: 0; padding: 0; }
*/

(function ($) {
    $.extend($.ui, { timepicker: { version: "0.9.9" } });

    /* Time picker manager.
       Use the singleton instance of this class, $.timepicker, to interact with the time picker.
       Settings for (groups of) time pickers are maintained in an instance object,
       allowing multiple different settings on the same page. */

    function Timepicker() {
        this.regional = []; // Available regional settings, indexed by language code
        this.regional[''] = { // Default regional settings
            currentText: 'Now',
            closeText: 'Done',
            ampm: false,
            amNames: ['AM', 'A'],
            pmNames: ['PM', 'P'],
            timeFormat: 'hh:mm tt',
            timeSuffix: '',
            timeOnlyTitle: 'Choose Time',
            timeText: 'Time',
            hourText: 'Hour',
            minuteText: 'Minute',
            secondText: 'Second',
            millisecText: 'Millisecond',
            timezoneText: 'Time Zone'
        };
        this._defaults = { // Global defaults for all the datetime picker instances
            showButtonPanel: true,
            timeOnly: false,
            showHour: true,
            showMinute: true,
            showSecond: false,
            showMillisec: false,
            showTimezone: false,
            showTime: true,
            stepHour: 1,
            stepMinute: 1,
            stepSecond: 1,
            stepMillisec: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisec: 0,
            timezone: '+0000',
            hourMin: 0,
            minuteMin: 0,
            secondMin: 0,
            millisecMin: 0,
            hourMax: 23,
            minuteMax: 59,
            secondMax: 59,
            millisecMax: 999,
            minDateTime: null,
            maxDateTime: null,
            onSelect: null,
            hourGrid: 0,
            minuteGrid: 0,
            secondGrid: 0,
            millisecGrid: 0,
            alwaysSetTime: true,
            separator: ' ',
            altFieldTimeOnly: true,
            showTimepicker: true,
            timezoneIso8609: false,
            timezoneList: null,
            addSliderAccess: false,
            sliderAccessArgs: null
        };
        $.extend(this._defaults, this.regional['']);
    };

    $.extend(Timepicker.prototype, {
        $input: null,
        $altInput: null,
        $timeObj: null,
        inst: null,
        hour_slider: null,
        minute_slider: null,
        second_slider: null,
        millisec_slider: null,
        timezone_select: null,
        hour: 0,
        minute: 0,
        second: 0,
        millisec: 0,
        timezone: '+0000',
        hourMinOriginal: null,
        minuteMinOriginal: null,
        secondMinOriginal: null,
        millisecMinOriginal: null,
        hourMaxOriginal: null,
        minuteMaxOriginal: null,
        secondMaxOriginal: null,
        millisecMaxOriginal: null,
        ampm: '',
        formattedDate: '',
        formattedTime: '',
        formattedDateTime: '',
        timezoneList: null,

        /* Override the default settings for all instances of the time picker.
           @param  settings  object - the new settings to use as defaults (anonymous object)
           @return the manager object */
        setDefaults: function (settings) {
            extendRemove(this._defaults, settings || {});
            return this;
        },

        //########################################################################
        // Create a new Timepicker instance
        //########################################################################
        _newInst: function ($input, o) {
            var tp_inst = new Timepicker(),
                inlineSettings = {};

            for (var attrName in this._defaults) {
                var attrValue = $input.attr('time:' + attrName);
                if (attrValue) {
                    try {
                        inlineSettings[attrName] = eval(attrValue);
                    } catch (err) {
                        inlineSettings[attrName] = attrValue;
                    }
                }
            }
            tp_inst._defaults = $.extend({}, this._defaults, inlineSettings, o, {
                beforeShow: function (input, dp_inst) {
                    if ($.isFunction(o.beforeShow))
                        return o.beforeShow(input, dp_inst, tp_inst);
                },
                onChangeMonthYear: function (year, month, dp_inst) {
                    // Update the time as well : this prevents the time from disappearing from the $input field.
                    tp_inst._updateDateTime(dp_inst);
                    if ($.isFunction(o.onChangeMonthYear))
                        o.onChangeMonthYear.call($input[0], year, month, dp_inst, tp_inst);
                },
                onClose: function (dateText, dp_inst) {
                    if (tp_inst.timeDefined === true && $input.val() != '')
                        tp_inst._updateDateTime(dp_inst);
                    if ($.isFunction(o.onClose))
                        o.onClose.call($input[0], dateText, dp_inst, tp_inst);
                },
                timepicker: tp_inst // add timepicker as a property of datepicker: $.datepicker._get(dp_inst, 'timepicker');
            });
            tp_inst.amNames = $.map(tp_inst._defaults.amNames, function (val) { return val.toUpperCase() });
            tp_inst.pmNames = $.map(tp_inst._defaults.pmNames, function (val) { return val.toUpperCase() });

            if (tp_inst._defaults.timezoneList === null) {
                var timezoneList = [];
                for (var i = -11; i <= 12; i++)
                    timezoneList.push((i >= 0 ? '+' : '-') + ('0' + Math.abs(i).toString()).slice(-2) + '00');
                if (tp_inst._defaults.timezoneIso8609)
                    timezoneList = $.map(timezoneList, function (val) {
                        return val == '+0000' ? 'Z' : (val.substring(0, 3) + ':' + val.substring(3));
                    });
                tp_inst._defaults.timezoneList = timezoneList;
            }

            tp_inst.hour = tp_inst._defaults.hour;
            tp_inst.minute = tp_inst._defaults.minute;
            tp_inst.second = tp_inst._defaults.second;
            tp_inst.millisec = tp_inst._defaults.millisec;
            tp_inst.ampm = '';
            tp_inst.$input = $input;

            if (o.altField)
                tp_inst.$altInput = $(o.altField)
                    .css({ cursor: 'pointer' })
                    .focus(function () { $input.trigger("focus"); });

            if (tp_inst._defaults.minDate == 0 || tp_inst._defaults.minDateTime == 0) {
                tp_inst._defaults.minDate = new Date();
            }
            if (tp_inst._defaults.maxDate == 0 || tp_inst._defaults.maxDateTime == 0) {
                tp_inst._defaults.maxDate = new Date();
            }

            // datepicker needs minDate/maxDate, timepicker needs minDateTime/maxDateTime..
            if (tp_inst._defaults.minDate !== undefined && tp_inst._defaults.minDate instanceof Date)
                tp_inst._defaults.minDateTime = new Date(tp_inst._defaults.minDate.getTime());
            if (tp_inst._defaults.minDateTime !== undefined && tp_inst._defaults.minDateTime instanceof Date)
                tp_inst._defaults.minDate = new Date(tp_inst._defaults.minDateTime.getTime());
            if (tp_inst._defaults.maxDate !== undefined && tp_inst._defaults.maxDate instanceof Date)
                tp_inst._defaults.maxDateTime = new Date(tp_inst._defaults.maxDate.getTime());
            if (tp_inst._defaults.maxDateTime !== undefined && tp_inst._defaults.maxDateTime instanceof Date)
                tp_inst._defaults.maxDate = new Date(tp_inst._defaults.maxDateTime.getTime());
            return tp_inst;
        },

        //########################################################################
        // add our sliders to the calendar
        //########################################################################
        _addTimePicker: function (dp_inst) {
            var currDT = (this.$altInput && this._defaults.altFieldTimeOnly) ?
                this.$input.val() + ' ' + this.$altInput.val() :
                this.$input.val();

            this.timeDefined = this._parseTime(currDT);
            this._limitMinMaxDateTime(dp_inst, false);
            this._injectTimePicker();
        },

        //########################################################################
        // parse the time string from input value or _setTime
        //########################################################################
        _parseTime: function (timeString, withDate) {
            var regstr = this._defaults.timeFormat.toString()
                .replace(/h{1,2}/ig, '(\\d?\\d)')
                .replace(/m{1,2}/ig, '(\\d?\\d)')
                .replace(/s{1,2}/ig, '(\\d?\\d)')
                .replace(/l{1}/ig, '(\\d?\\d?\\d)')
                .replace(/t{1,2}/ig, this._getPatternAmpm())
                .replace(/z{1}/ig, '(z|[-+]\\d\\d:?\\d\\d)?')
                .replace(/\s/g, '\\s?') + this._defaults.timeSuffix + '$',
                order = this._getFormatPositions(),
                ampm = '',
                treg;

            if (!this.inst) this.inst = $.datepicker._getInst(this.$input[0]);

            if (withDate || !this._defaults.timeOnly) {
                // the time should come after x number of characters and a space.
                // x = at least the length of text specified by the date format
                var dp_dateFormat = $.datepicker._get(this.inst, 'dateFormat');
                // escape special regex characters in the seperator
                var specials = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g");
                regstr = '^.{' + dp_dateFormat.length + ',}?' + this._defaults.separator.replace(specials, "\\$&") + regstr;
            }

            treg = timeString.match(new RegExp(regstr, 'i'));

            if (treg) {
                if (order.t !== -1) {
                    if (treg[order.t] === undefined || treg[order.t].length === 0) {
                        ampm = '';
                        this.ampm = '';
                    } else {
                        ampm = $.inArray(treg[order.t].toUpperCase(), this.amNames) !== -1 ? 'AM' : 'PM';
                        this.ampm = this._defaults[ampm == 'AM' ? 'amNames' : 'pmNames'][0];
                    }
                }

                if (order.h !== -1) {
                    if (ampm == 'AM' && treg[order.h] == '12')
                        this.hour = 0; // 12am = 0 hour
                    else if (ampm == 'PM' && treg[order.h] != '12')
                        this.hour = (parseFloat(treg[order.h]) + 12).toFixed(0); // 12pm = 12 hour, any other pm = hour + 12
                    else this.hour = Number(treg[order.h]);
                }

                if (order.m !== -1) this.minute = Number(treg[order.m]);
                if (order.s !== -1) this.second = Number(treg[order.s]);
                if (order.l !== -1) this.millisec = Number(treg[order.l]);
                if (order.z !== -1 && treg[order.z] !== undefined) {
                    var tz = treg[order.z].toUpperCase();
                    switch (tz.length) {
                        case 1:	// Z
                            tz = this._defaults.timezoneIso8609 ? 'Z' : '+0000';
                            break;
                        case 5:	// +hhmm
                            if (this._defaults.timezoneIso8609)
                                tz = tz.substring(1) == '0000'
                                    ? 'Z'
                                    : tz.substring(0, 3) + ':' + tz.substring(3);
                            break;
                        case 6:	// +hh:mm
                            if (!this._defaults.timezoneIso8609)
                                tz = tz == 'Z' || tz.substring(1) == '00:00'
                                    ? '+0000'
                                    : tz.replace(/:/, '');
                            else if (tz.substring(1) == '00:00')
                                tz = 'Z';
                            break;
                    }
                    this.timezone = tz;
                }

                return true;
            }
            return false;
        },

        //########################################################################
        // pattern for standard and localized AM/PM markers
        //########################################################################
        _getPatternAmpm: function () {
            var markers = [];
            o = this._defaults;
            if (o.amNames)
                $.merge(markers, o.amNames);
            if (o.pmNames)
                $.merge(markers, o.pmNames);
            markers = $.map(markers, function (val) { return val.replace(/[.*+?|()\[\]{}\\]/g, '\\$&') });
            return '(' + markers.join('|') + ')?';
        },

        //########################################################################
        // figure out position of time elements.. cause js cant do named captures
        //########################################################################
        _getFormatPositions: function () {
            var finds = this._defaults.timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|t{1,2}|z)/g),
                orders = { h: -1, m: -1, s: -1, l: -1, t: -1, z: -1 };

            if (finds)
                for (var i = 0; i < finds.length; i++)
                    if (orders[finds[i].toString().charAt(0)] == -1)
                        orders[finds[i].toString().charAt(0)] = i + 1;

            return orders;
        },

        //########################################################################
        // generate and inject html for timepicker into ui datepicker
        //########################################################################
        _injectTimePicker: function () {
            var $dp = this.inst.dpDiv,
                o = this._defaults,
                tp_inst = this,
                // Added by Peter Medeiros:
                // - Figure out what the hour/minute/second max should be based on the step values.
                // - Example: if stepMinute is 15, then minMax is 45.
                hourMax = parseInt((o.hourMax - ((o.hourMax - o.hourMin) % o.stepHour)), 10),
                minMax = parseInt((o.minuteMax - ((o.minuteMax - o.minuteMin) % o.stepMinute)), 10),
                secMax = parseInt((o.secondMax - ((o.secondMax - o.secondMin) % o.stepSecond)), 10),
                millisecMax = parseInt((o.millisecMax - ((o.millisecMax - o.millisecMin) % o.stepMillisec)), 10),
                dp_id = this.inst.id.toString().replace(/([^A-Za-z0-9_])/g, '');

            // Prevent displaying twice
            //if ($dp.find("div#ui-timepicker-div-"+ dp_id).length === 0) {
            if ($dp.find("div#ui-timepicker-div-" + dp_id).length === 0 && o.showTimepicker) {
                var noDisplay = ' style="display:none;"',
                    html = '<div class="ui-timepicker-div" id="ui-timepicker-div-' + dp_id + '"><dl>' +
                        '<dt class="ui_tpicker_time_label" id="ui_tpicker_time_label_' + dp_id + '"' +
                        ((o.showTime) ? '' : noDisplay) + '>' + o.timeText + '</dt>' +
                        '<dd class="ui_tpicker_time" id="ui_tpicker_time_' + dp_id + '"' +
                        ((o.showTime) ? '' : noDisplay) + '></dd>' +
                        '<dt class="ui_tpicker_hour_label" id="ui_tpicker_hour_label_' + dp_id + '"' +
                        ((o.showHour) ? '' : noDisplay) + '>' + o.hourText + '</dt>',
                    hourGridSize = 0,
                    minuteGridSize = 0,
                    secondGridSize = 0,
                    millisecGridSize = 0,
                    size;

                // Hours
                html += '<dd class="ui_tpicker_hour"><div id="ui_tpicker_hour_' + dp_id + '"' +
                    ((o.showHour) ? '' : noDisplay) + '></div>';
                if (o.showHour && o.hourGrid > 0) {
                    html += '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>';

                    for (var h = o.hourMin; h <= hourMax; h += parseInt(o.hourGrid, 10)) {
                        hourGridSize++;
                        var tmph = (o.ampm && h > 12) ? h - 12 : h;
                        if (tmph < 10) tmph = '0' + tmph;
                        if (o.ampm) {
                            if (h == 0) tmph = 12 + 'a';
                            else if (h < 12) tmph += 'a';
                            else tmph += 'p';
                        }
                        html += '<td>' + tmph + '</td>';
                    }

                    html += '</tr></table></div>';
                }
                html += '</dd>';

                // Minutes
                html += '<dt class="ui_tpicker_minute_label" id="ui_tpicker_minute_label_' + dp_id + '"' +
                    ((o.showMinute) ? '' : noDisplay) + '>' + o.minuteText + '</dt>' +
                    '<dd class="ui_tpicker_minute"><div id="ui_tpicker_minute_' + dp_id + '"' +
                    ((o.showMinute) ? '' : noDisplay) + '></div>';

                if (o.showMinute && o.minuteGrid > 0) {
                    html += '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>';

                    for (var m = o.minuteMin; m <= minMax; m += parseInt(o.minuteGrid, 10)) {
                        minuteGridSize++;
                        html += '<td>' + ((m < 10) ? '0' : '') + m + '</td>';
                    }

                    html += '</tr></table></div>';
                }
                html += '</dd>';

                // Seconds
                html += '<dt class="ui_tpicker_second_label" id="ui_tpicker_second_label_' + dp_id + '"' +
                    ((o.showSecond) ? '' : noDisplay) + '>' + o.secondText + '</dt>' +
                    '<dd class="ui_tpicker_second"><div id="ui_tpicker_second_' + dp_id + '"' +
                    ((o.showSecond) ? '' : noDisplay) + '></div>';

                if (o.showSecond && o.secondGrid > 0) {
                    html += '<div style="padding-left: 1px"><table><tr>';

                    for (var s = o.secondMin; s <= secMax; s += parseInt(o.secondGrid, 10)) {
                        secondGridSize++;
                        html += '<td>' + ((s < 10) ? '0' : '') + s + '</td>';
                    }

                    html += '</tr></table></div>';
                }
                html += '</dd>';

                // Milliseconds
                html += '<dt class="ui_tpicker_millisec_label" id="ui_tpicker_millisec_label_' + dp_id + '"' +
                    ((o.showMillisec) ? '' : noDisplay) + '>' + o.millisecText + '</dt>' +
                    '<dd class="ui_tpicker_millisec"><div id="ui_tpicker_millisec_' + dp_id + '"' +
                    ((o.showMillisec) ? '' : noDisplay) + '></div>';

                if (o.showMillisec && o.millisecGrid > 0) {
                    html += '<div style="padding-left: 1px"><table><tr>';

                    for (var l = o.millisecMin; l <= millisecMax; l += parseInt(o.millisecGrid, 10)) {
                        millisecGridSize++;
                        html += '<td>' + ((l < 10) ? '0' : '') + l + '</td>';
                    }

                    html += '</tr></table></div>';
                }
                html += '</dd>';

                // Timezone
                html += '<dt class="ui_tpicker_timezone_label" id="ui_tpicker_timezone_label_' + dp_id + '"' +
                    ((o.showTimezone) ? '' : noDisplay) + '>' + o.timezoneText + '</dt>';
                html += '<dd class="ui_tpicker_timezone" id="ui_tpicker_timezone_' + dp_id + '"' +
                    ((o.showTimezone) ? '' : noDisplay) + '></dd>';

                html += '</dl></div>';
                $tp = $(html);

                // if we only want time picker...
                if (o.timeOnly === true) {
                    $tp.prepend(
                        '<div class="ui-widget-header ui-helper-clearfix ui-corner-all">' +
                        '<div class="ui-datepicker-title">' + o.timeOnlyTitle + '</div>' +
                        '</div>');
                    $dp.find('.ui-datepicker-header, .ui-datepicker-calendar').hide();
                }

                this.hour_slider = $tp.find('#ui_tpicker_hour_' + dp_id).slider({
                    orientation: "horizontal",
                    value: this.hour,
                    min: o.hourMin,
                    max: hourMax,
                    step: o.stepHour,
                    slide: function (event, ui) {
                        tp_inst.hour_slider.slider("option", "value", ui.value);
                        tp_inst._onTimeChange();
                    }
                });

                // Updated by Peter Medeiros:
                // - Pass in Event and UI instance into slide function
                this.minute_slider = $tp.find('#ui_tpicker_minute_' + dp_id).slider({
                    orientation: "horizontal",
                    value: this.minute,
                    min: o.minuteMin,
                    max: minMax,
                    step: o.stepMinute,
                    slide: function (event, ui) {
                        tp_inst.minute_slider.slider("option", "value", ui.value);
                        tp_inst._onTimeChange();
                    }
                });

                this.second_slider = $tp.find('#ui_tpicker_second_' + dp_id).slider({
                    orientation: "horizontal",
                    value: this.second,
                    min: o.secondMin,
                    max: secMax,
                    step: o.stepSecond,
                    slide: function (event, ui) {
                        tp_inst.second_slider.slider("option", "value", ui.value);
                        tp_inst._onTimeChange();
                    }
                });

                this.millisec_slider = $tp.find('#ui_tpicker_millisec_' + dp_id).slider({
                    orientation: "horizontal",
                    value: this.millisec,
                    min: o.millisecMin,
                    max: millisecMax,
                    step: o.stepMillisec,
                    slide: function (event, ui) {
                        tp_inst.millisec_slider.slider("option", "value", ui.value);
                        tp_inst._onTimeChange();
                    }
                });

                this.timezone_select = $tp.find('#ui_tpicker_timezone_' + dp_id).append('<select></select>').find("select");
                $.fn.append.apply(this.timezone_select,
                    $.map(o.timezoneList, function (val, idx) {
                        return $("<option />")
                            .val(typeof val == "object" ? val.value : val)
                            .text(typeof val == "object" ? val.label : val);
                    })
                );
                this.timezone_select.val((typeof this.timezone != "undefined" && this.timezone != null && this.timezone != "") ? this.timezone : o.timezone);
                this.timezone_select.change(function () {
                    tp_inst._onTimeChange();
                });

                // Add grid functionality
                if (o.showHour && o.hourGrid > 0) {
                    size = 100 * hourGridSize * o.hourGrid / (hourMax - o.hourMin);

                    $tp.find(".ui_tpicker_hour table").css({
                        width: size + "%",
                        marginLeft: (size / (-2 * hourGridSize)) + "%",
                        borderCollapse: 'collapse'
                    }).find("td").each(function (index) {
                        $(this).click(function () {
                            var h = $(this).html();
                            if (o.ampm) {
                                var ap = h.substring(2).toLowerCase(),
                                    aph = parseInt(h.substring(0, 2), 10);
                                if (ap == 'a') {
                                    if (aph == 12) h = 0;
                                    else h = aph;
                                } else if (aph == 12) h = 12;
                                else h = aph + 12;
                            }
                            tp_inst.hour_slider.slider("option", "value", h);
                            tp_inst._onTimeChange();
                            tp_inst._onSelectHandler();
                        }).css({
                            cursor: 'pointer',
                            width: (100 / hourGridSize) + '%',
                            textAlign: 'center',
                            overflow: 'hidden'
                        });
                    });
                }

                if (o.showMinute && o.minuteGrid > 0) {
                    size = 100 * minuteGridSize * o.minuteGrid / (minMax - o.minuteMin);
                    $tp.find(".ui_tpicker_minute table").css({
                        width: size + "%",
                        marginLeft: (size / (-2 * minuteGridSize)) + "%",
                        borderCollapse: 'collapse'
                    }).find("td").each(function (index) {
                        $(this).click(function () {
                            tp_inst.minute_slider.slider("option", "value", $(this).html());
                            tp_inst._onTimeChange();
                            tp_inst._onSelectHandler();
                        }).css({
                            cursor: 'pointer',
                            width: (100 / minuteGridSize) + '%',
                            textAlign: 'center',
                            overflow: 'hidden'
                        });
                    });
                }

                if (o.showSecond && o.secondGrid > 0) {
                    $tp.find(".ui_tpicker_second table").css({
                        width: size + "%",
                        marginLeft: (size / (-2 * secondGridSize)) + "%",
                        borderCollapse: 'collapse'
                    }).find("td").each(function (index) {
                        $(this).click(function () {
                            tp_inst.second_slider.slider("option", "value", $(this).html());
                            tp_inst._onTimeChange();
                            tp_inst._onSelectHandler();
                        }).css({
                            cursor: 'pointer',
                            width: (100 / secondGridSize) + '%',
                            textAlign: 'center',
                            overflow: 'hidden'
                        });
                    });
                }

                if (o.showMillisec && o.millisecGrid > 0) {
                    $tp.find(".ui_tpicker_millisec table").css({
                        width: size + "%",
                        marginLeft: (size / (-2 * millisecGridSize)) + "%",
                        borderCollapse: 'collapse'
                    }).find("td").each(function (index) {
                        $(this).click(function () {
                            tp_inst.millisec_slider.slider("option", "value", $(this).html());
                            tp_inst._onTimeChange();
                            tp_inst._onSelectHandler();
                        }).css({
                            cursor: 'pointer',
                            width: (100 / millisecGridSize) + '%',
                            textAlign: 'center',
                            overflow: 'hidden'
                        });
                    });
                }

                var $buttonPanel = $dp.find('.ui-datepicker-buttonpane');
                if ($buttonPanel.length) $buttonPanel.before($tp);
                else $dp.append($tp);

                this.$timeObj = $tp.find('#ui_tpicker_time_' + dp_id);

                if (this.inst !== null) {
                    var timeDefined = this.timeDefined;
                    this._onTimeChange();
                    this.timeDefined = timeDefined;
                }

                //Emulate datepicker onSelect behavior. Call on slidestop.
                var onSelectDelegate = function () {
                    tp_inst._onSelectHandler();
                };
                this.hour_slider.bind('slidestop', onSelectDelegate);
                this.minute_slider.bind('slidestop', onSelectDelegate);
                this.second_slider.bind('slidestop', onSelectDelegate);
                this.millisec_slider.bind('slidestop', onSelectDelegate);

                // slideAccess integration: http://trentrichardson.com/2011/11/11/jquery-ui-sliders-and-touch-accessibility/
                if (this._defaults.addSliderAccess) {
                    var sliderAccessArgs = this._defaults.sliderAccessArgs;
                    setTimeout(function () { // fix for inline mode
                        if ($tp.find('.ui-slider-access').length == 0) {
                            $tp.find('.ui-slider:visible').sliderAccess(sliderAccessArgs);

                            // fix any grids since sliders are shorter
                            var sliderAccessWidth = $tp.find('.ui-slider-access:eq(0)').outerWidth(true);
                            if (sliderAccessWidth) {
                                $tp.find('table:visible').each(function () {
                                    var $g = $(this),
                                        oldWidth = $g.outerWidth(),
                                        oldMarginLeft = $g.css('marginLeft').toString().replace('%', ''),
                                        newWidth = oldWidth - sliderAccessWidth,
                                        newMarginLeft = ((oldMarginLeft * newWidth) / oldWidth) + '%';

                                    $g.css({ width: newWidth, marginLeft: newMarginLeft });
                                });
                            }
                        }
                    }, 0);
                }
                // end slideAccess integration
            }
        },

        //########################################################################
        // This function tries to limit the ability to go outside the
        // min/max date range
        //########################################################################
        _limitMinMaxDateTime: function (dp_inst, adjustSliders) {
            var o = this._defaults,
                dp_date = new Date(dp_inst.selectedYear, dp_inst.selectedMonth, dp_inst.selectedDay);

            if (!this._defaults.showTimepicker) return; // No time so nothing to check here

            if ($.datepicker._get(dp_inst, 'minDateTime') !== null && $.datepicker._get(dp_inst, 'minDateTime') !== undefined && dp_date) {
                var minDateTime = $.datepicker._get(dp_inst, 'minDateTime'),
                    minDateTimeDate = new Date(minDateTime.getFullYear(), minDateTime.getMonth(), minDateTime.getDate(), 0, 0, 0, 0);

                if (this.hourMinOriginal === null || this.minuteMinOriginal === null || this.secondMinOriginal === null || this.millisecMinOriginal === null) {
                    this.hourMinOriginal = o.hourMin;
                    this.minuteMinOriginal = o.minuteMin;
                    this.secondMinOriginal = o.secondMin;
                    this.millisecMinOriginal = o.millisecMin;
                }

                if (dp_inst.settings.timeOnly || minDateTimeDate.getTime() == dp_date.getTime()) {
                    this._defaults.hourMin = minDateTime.getHours();
                    if (this.hour <= this._defaults.hourMin) {
                        this.hour = this._defaults.hourMin;
                        this._defaults.minuteMin = minDateTime.getMinutes();
                        if (this.minute <= this._defaults.minuteMin) {
                            this.minute = this._defaults.minuteMin;
                            this._defaults.secondMin = minDateTime.getSeconds();
                        } else if (this.second <= this._defaults.secondMin) {
                            this.second = this._defaults.secondMin;
                            this._defaults.millisecMin = minDateTime.getMilliseconds();
                        } else {
                            if (this.millisec < this._defaults.millisecMin)
                                this.millisec = this._defaults.millisecMin;
                            this._defaults.millisecMin = this.millisecMinOriginal;
                        }
                    } else {
                        this._defaults.minuteMin = this.minuteMinOriginal;
                        this._defaults.secondMin = this.secondMinOriginal;
                        this._defaults.millisecMin = this.millisecMinOriginal;
                    }
                } else {
                    this._defaults.hourMin = this.hourMinOriginal;
                    this._defaults.minuteMin = this.minuteMinOriginal;
                    this._defaults.secondMin = this.secondMinOriginal;
                    this._defaults.millisecMin = this.millisecMinOriginal;
                }
            }

            if ($.datepicker._get(dp_inst, 'maxDateTime') !== null && $.datepicker._get(dp_inst, 'maxDateTime') !== undefined && dp_date) {
                var maxDateTime = $.datepicker._get(dp_inst, 'maxDateTime'),
                    maxDateTimeDate = new Date(maxDateTime.getFullYear(), maxDateTime.getMonth(), maxDateTime.getDate(), 0, 0, 0, 0);

                if (this.hourMaxOriginal === null || this.minuteMaxOriginal === null || this.secondMaxOriginal === null) {
                    this.hourMaxOriginal = o.hourMax;
                    this.minuteMaxOriginal = o.minuteMax;
                    this.secondMaxOriginal = o.secondMax;
                    this.millisecMaxOriginal = o.millisecMax;
                }

                if (dp_inst.settings.timeOnly || maxDateTimeDate.getTime() == dp_date.getTime()) {
                    this._defaults.hourMax = maxDateTime.getHours();
                    if (this.hour >= this._defaults.hourMax) {
                        this.hour = this._defaults.hourMax;
                        this._defaults.minuteMax = maxDateTime.getMinutes();
                        if (this.minute >= this._defaults.minuteMax) {
                            this.minute = this._defaults.minuteMax;
                            this._defaults.secondMax = maxDateTime.getSeconds();
                        } else if (this.second >= this._defaults.secondMax) {
                            this.second = this._defaults.secondMax;
                            this._defaults.millisecMax = maxDateTime.getMilliseconds();
                        } else {
                            if (this.millisec > this._defaults.millisecMax) this.millisec = this._defaults.millisecMax;
                            this._defaults.millisecMax = this.millisecMaxOriginal;
                        }
                    } else {
                        this._defaults.minuteMax = this.minuteMaxOriginal;
                        this._defaults.secondMax = this.secondMaxOriginal;
                        this._defaults.millisecMax = this.millisecMaxOriginal;
                    }
                } else {
                    this._defaults.hourMax = this.hourMaxOriginal;
                    this._defaults.minuteMax = this.minuteMaxOriginal;
                    this._defaults.secondMax = this.secondMaxOriginal;
                    this._defaults.millisecMax = this.millisecMaxOriginal;
                }
            }

            if (adjustSliders !== undefined && adjustSliders === true) {
                var hourMax = parseInt((this._defaults.hourMax - ((this._defaults.hourMax - this._defaults.hourMin) % this._defaults.stepHour)), 10),
                    minMax = parseInt((this._defaults.minuteMax - ((this._defaults.minuteMax - this._defaults.minuteMin) % this._defaults.stepMinute)), 10),
                    secMax = parseInt((this._defaults.secondMax - ((this._defaults.secondMax - this._defaults.secondMin) % this._defaults.stepSecond)), 10),
                    millisecMax = parseInt((this._defaults.millisecMax - ((this._defaults.millisecMax - this._defaults.millisecMin) % this._defaults.stepMillisec)), 10);

                if (this.hour_slider)
                    this.hour_slider.slider("option", { min: this._defaults.hourMin, max: hourMax }).slider('value', this.hour);
                if (this.minute_slider)
                    this.minute_slider.slider("option", { min: this._defaults.minuteMin, max: minMax }).slider('value', this.minute);
                if (this.second_slider)
                    this.second_slider.slider("option", { min: this._defaults.secondMin, max: secMax }).slider('value', this.second);
                if (this.millisec_slider)
                    this.millisec_slider.slider("option", { min: this._defaults.millisecMin, max: millisecMax }).slider('value', this.millisec);
            }
        },

        //########################################################################
        // when a slider moves, set the internal time...
        // on time change is also called when the time is updated in the text field
        //########################################################################
        _onTimeChange: function () {
            var hour = (this.hour_slider) ? this.hour_slider.slider('value') : false,
                minute = (this.minute_slider) ? this.minute_slider.slider('value') : false,
                second = (this.second_slider) ? this.second_slider.slider('value') : false,
                millisec = (this.millisec_slider) ? this.millisec_slider.slider('value') : false,
                timezone = (this.timezone_select) ? this.timezone_select.val() : false,
                o = this._defaults;

            if (typeof (hour) == 'object') hour = false;
            if (typeof (minute) == 'object') minute = false;
            if (typeof (second) == 'object') second = false;
            if (typeof (millisec) == 'object') millisec = false;
            if (typeof (timezone) == 'object') timezone = false;

            if (hour !== false) hour = parseInt(hour, 10);
            if (minute !== false) minute = parseInt(minute, 10);
            if (second !== false) second = parseInt(second, 10);
            if (millisec !== false) millisec = parseInt(millisec, 10);

            var ampm = o[hour < 12 ? 'amNames' : 'pmNames'][0];

            // If the update was done in the input field, the input field should not be updated.
            // If the update was done using the sliders, update the input field.
            var hasChanged = (hour != this.hour || minute != this.minute
                || second != this.second || millisec != this.millisec
                || (this.ampm.length > 0
                    && (hour < 12) != ($.inArray(this.ampm.toUpperCase(), this.amNames) !== -1))
                || timezone != this.timezone);

            if (hasChanged) {
                if (hour !== false) this.hour = hour;
                if (minute !== false) this.minute = minute;
                if (second !== false) this.second = second;
                if (millisec !== false) this.millisec = millisec;
                if (timezone !== false) this.timezone = timezone;

                if (!this.inst) this.inst = $.datepicker._getInst(this.$input[0]);

                this._limitMinMaxDateTime(this.inst, true);
            }
            if (o.ampm) this.ampm = ampm;

            //this._formatTime();
            this.formattedTime = $.datepicker.formatTime(this._defaults.timeFormat, this, this._defaults);
            if (this.$timeObj) this.$timeObj.text(this.formattedTime + o.timeSuffix);
            this.timeDefined = true;
            if (hasChanged) this._updateDateTime();
        },

        //########################################################################
        // call custom onSelect.
        // bind to sliders slidestop, and grid click.
        //########################################################################
        _onSelectHandler: function () {
            var onSelect = this._defaults.onSelect;
            var inputEl = this.$input ? this.$input[0] : null;
            if (onSelect && inputEl) {
                onSelect.apply(inputEl, [this.formattedDateTime, this]);
            }
        },

        //########################################################################
        // left for any backwards compatibility
        //########################################################################
        _formatTime: function (time, format) {
            time = time || { hour: this.hour, minute: this.minute, second: this.second, millisec: this.millisec, ampm: this.ampm, timezone: this.timezone };
            var tmptime = (format || this._defaults.timeFormat).toString();

            tmptime = $.datepicker.formatTime(tmptime, time, this._defaults);

            if (arguments.length) return tmptime;
            else this.formattedTime = tmptime;
        },

        //########################################################################
        // update our input with the new date time..
        //########################################################################
        _updateDateTime: function (dp_inst) {
            dp_inst = this.inst || dp_inst;
            var dt = $.datepicker._daylightSavingAdjust(new Date(dp_inst.selectedYear, dp_inst.selectedMonth, dp_inst.selectedDay)),
                dateFmt = $.datepicker._get(dp_inst, 'dateFormat'),
                formatCfg = $.datepicker._getFormatConfig(dp_inst),
                timeAvailable = dt !== null && this.timeDefined;
            this.formattedDate = $.datepicker.formatDate(dateFmt, (dt === null ? new Date() : dt), formatCfg);
            var formattedDateTime = this.formattedDate;
            if (dp_inst.lastVal !== undefined && (dp_inst.lastVal.length > 0 && this.$input.val().length === 0))
                return;

            if (this._defaults.timeOnly === true) {
                formattedDateTime = this.formattedTime;
            } else if (this._defaults.timeOnly !== true && (this._defaults.alwaysSetTime || timeAvailable)) {
                formattedDateTime += this._defaults.separator + this.formattedTime + this._defaults.timeSuffix;
            }

            this.formattedDateTime = formattedDateTime;

            if (!this._defaults.showTimepicker) {
                this.$input.val(this.formattedDate);
            } else if (this.$altInput && this._defaults.altFieldTimeOnly === true) {
                this.$altInput.val(this.formattedTime);
                this.$input.val(this.formattedDate);
            } else if (this.$altInput) {
                this.$altInput.val(formattedDateTime);
                this.$input.val(formattedDateTime);
            } else {
                this.$input.val(formattedDateTime);
            }

            this.$input.trigger("change");
        }
    });

    $.fn.extend({
        //########################################################################
        // shorthand just to use timepicker..
        //########################################################################
        timepicker: function (o) {
            o = o || {};
            var tmp_args = arguments;

            if (typeof o == 'object') tmp_args[0] = $.extend(o, { timeOnly: true });

            return $(this).each(function () {
                $.fn.datetimepicker.apply($(this), tmp_args);
            });
        },

        //########################################################################
        // extend timepicker to datepicker
        //########################################################################
        datetimepicker: function (o) {
            o = o || {};
            var $input = this,
                tmp_args = arguments;

            if (typeof (o) == 'string') {
                if (o == 'getDate')
                    return $.fn.datepicker.apply($(this[0]), tmp_args);
                else
                    return this.each(function () {
                        var $t = $(this);
                        $t.datepicker.apply($t, tmp_args);
                    });
            }
            else
                return this.each(function () {
                    var $t = $(this);
                    $t.datepicker($.timepicker._newInst($t, o)._defaults);
                });
        }
    });

    //########################################################################
    // format the time all pretty...
    // format = string format of the time
    // time = a {}, not a Date() for timezones
    // options = essentially the regional[].. amNames, pmNames, ampm
    //########################################################################
    $.datepicker.formatTime = function (format, time, options) {
        options = options || {};
        options = $.extend($.timepicker._defaults, options);
        time = $.extend({ hour: 0, minute: 0, second: 0, millisec: 0, timezone: '+0000' }, time);

        var tmptime = format;
        var ampmName = options['amNames'][0];

        var hour = parseInt(time.hour, 10);
        if (options.ampm) {
            if (hour > 11) {
                ampmName = options['pmNames'][0];
                if (hour > 12)
                    hour = hour % 12;
            }
            if (hour === 0)
                hour = 12;
        }
        tmptime = tmptime.replace(/(?:hh?|mm?|ss?|[tT]{1,2}|[lz])/g, function (match) {
            switch (match.toLowerCase()) {
                case 'hh': return ('0' + hour).slice(-2);
                case 'h': return hour;
                case 'mm': return ('0' + time.minute).slice(-2);
                case 'm': return time.minute;
                case 'ss': return ('0' + time.second).slice(-2);
                case 's': return time.second;
                case 'l': return ('00' + time.millisec).slice(-3);
                case 'z': return time.timezone;
                case 't': case 'tt':
                    if (options.ampm) {
                        if (match.length == 1)
                            ampmName = ampmName.charAt(0);
                        return match.charAt(0) == 'T' ? ampmName.toUpperCase() : ampmName.toLowerCase();
                    }
                    return '';
            }
        });

        tmptime = $.trim(tmptime);
        return tmptime;
    }

    //########################################################################
    // the bad hack :/ override datepicker so it doesnt close on select
    // inspired: http://stackoverflow.com/questions/1252512/jquery-datepicker-prevent-closing-picker-when-clicking-a-date/1762378#1762378
    //########################################################################
    $.datepicker._base_selectDate = $.datepicker._selectDate;
    $.datepicker._selectDate = function (id, dateStr) {
        var inst = this._getInst($(id)[0]),
            tp_inst = this._get(inst, 'timepicker');

        if (tp_inst) {
            tp_inst._limitMinMaxDateTime(inst, true);
            inst.inline = inst.stay_open = true;
            //This way the onSelect handler called from calendarpicker get the full dateTime
            this._base_selectDate(id, dateStr);
            inst.inline = inst.stay_open = false;
            this._notifyChange(inst);
            this._updateDatepicker(inst);
        }
        else this._base_selectDate(id, dateStr);
    };

    //#############################################################################################
    // second bad hack :/ override datepicker so it triggers an event when changing the input field
    // and does not redraw the datepicker on every selectDate event
    //#############################################################################################
    $.datepicker._base_updateDatepicker = $.datepicker._updateDatepicker;
    $.datepicker._updateDatepicker = function (inst) {
        // don't popup the datepicker if there is another instance already opened
        var input = inst.input[0];
        if ($.datepicker._curInst &&
            $.datepicker._curInst != inst &&
            $.datepicker._datepickerShowing &&
            $.datepicker._lastInput != input) {
            return;
        }

        if (typeof (inst.stay_open) !== 'boolean' || inst.stay_open === false) {
            this._base_updateDatepicker(inst);

            // Reload the time control when changing something in the input text field.
            var tp_inst = this._get(inst, 'timepicker');
            if (tp_inst) tp_inst._addTimePicker(inst);
        }
    };

    //#######################################################################################
    // third bad hack :/ override datepicker so it allows spaces and colon in the input field
    //#######################################################################################
    $.datepicker._base_doKeyPress = $.datepicker._doKeyPress;
    $.datepicker._doKeyPress = function (event) {
        var inst = $.datepicker._getInst(event.target),
            tp_inst = $.datepicker._get(inst, 'timepicker');

        if (tp_inst) {
            if ($.datepicker._get(inst, 'constrainInput')) {
                var ampm = tp_inst._defaults.ampm,
                    dateChars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat')),
                    datetimeChars = tp_inst._defaults.timeFormat.toString()
                        .replace(/[hms]/g, '')
                        .replace(/TT/g, ampm ? 'APM' : '')
                        .replace(/Tt/g, ampm ? 'AaPpMm' : '')
                        .replace(/tT/g, ampm ? 'AaPpMm' : '')
                        .replace(/T/g, ampm ? 'AP' : '')
                        .replace(/tt/g, ampm ? 'apm' : '')
                        .replace(/t/g, ampm ? 'ap' : '') +
                        " " +
                        tp_inst._defaults.separator +
                        tp_inst._defaults.timeSuffix +
                        (tp_inst._defaults.showTimezone ? tp_inst._defaults.timezoneList.join('') : '') +
                        (tp_inst._defaults.amNames.join('')) +
                        (tp_inst._defaults.pmNames.join('')) +
                        dateChars,
                    chr = String.fromCharCode(event.charCode === undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || (chr < ' ' || !dateChars || datetimeChars.indexOf(chr) > -1);
            }
        }

        return $.datepicker._base_doKeyPress(event);
    };

    //#######################################################################################
    // Override key up event to sync manual input changes.
    //#######################################################################################
    $.datepicker._base_doKeyUp = $.datepicker._doKeyUp;
    $.datepicker._doKeyUp = function (event) {
        var inst = $.datepicker._getInst(event.target),
            tp_inst = $.datepicker._get(inst, 'timepicker');

        if (tp_inst) {
            if (tp_inst._defaults.timeOnly && (inst.input.val() != inst.lastVal)) {
                try {
                    $.datepicker._updateDatepicker(inst);
                }
                catch (err) {
                    $.datepicker.log(err);
                }
            }
        }

        return $.datepicker._base_doKeyUp(event);
    };

    //#######################################################################################
    // override "Today" button to also grab the time.
    //#######################################################################################
    $.datepicker._base_gotoToday = $.datepicker._gotoToday;
    $.datepicker._gotoToday = function (id) {
        var inst = this._getInst($(id)[0]),
            $dp = inst.dpDiv;
        this._base_gotoToday(id);
        var now = new Date();
        var tp_inst = this._get(inst, 'timepicker');
        if (tp_inst && tp_inst._defaults.showTimezone && tp_inst.timezone_select) {
            var tzoffset = now.getTimezoneOffset(); // If +0100, returns -60
            var tzsign = tzoffset > 0 ? '-' : '+';
            tzoffset = Math.abs(tzoffset);
            var tzmin = tzoffset % 60;
            tzoffset = tzsign + ('0' + (tzoffset - tzmin) / 60).slice(-2) + ('0' + tzmin).slice(-2);
            if (tp_inst._defaults.timezoneIso8609)
                tzoffset = tzoffset.substring(0, 3) + ':' + tzoffset.substring(3);
            tp_inst.timezone_select.val(tzoffset);
        }
        this._setTime(inst, now);
        $('.ui-datepicker-today', $dp).click();
    };

    //#######################################################################################
    // Disable & enable the Time in the datetimepicker
    //#######################################################################################
    $.datepicker._disableTimepickerDatepicker = function (target, date, withDate) {
        var inst = this._getInst(target),
            tp_inst = this._get(inst, 'timepicker');
        $(target).datepicker('getDate'); // Init selected[Year|Month|Day]
        if (tp_inst) {
            tp_inst._defaults.showTimepicker = false;
            tp_inst._updateDateTime(inst);
        }
    };

    $.datepicker._enableTimepickerDatepicker = function (target, date, withDate) {
        var inst = this._getInst(target),
            tp_inst = this._get(inst, 'timepicker');
        $(target).datepicker('getDate'); // Init selected[Year|Month|Day]
        if (tp_inst) {
            tp_inst._defaults.showTimepicker = true;
            tp_inst._addTimePicker(inst); // Could be disabled on page load
            tp_inst._updateDateTime(inst);
        }
    };

    //#######################################################################################
    // Create our own set time function
    //#######################################################################################
    $.datepicker._setTime = function (inst, date) {
        var tp_inst = this._get(inst, 'timepicker');
        if (tp_inst) {
            var defaults = tp_inst._defaults,
                // calling _setTime with no date sets time to defaults
                hour = date ? date.getHours() : defaults.hour,
                minute = date ? date.getMinutes() : defaults.minute,
                second = date ? date.getSeconds() : defaults.second,
                millisec = date ? date.getMilliseconds() : defaults.millisec;

            //check if within min/max times..
            if ((hour < defaults.hourMin || hour > defaults.hourMax) || (minute < defaults.minuteMin || minute > defaults.minuteMax) || (second < defaults.secondMin || second > defaults.secondMax) || (millisec < defaults.millisecMin || millisec > defaults.millisecMax)) {
                hour = defaults.hourMin;
                minute = defaults.minuteMin;
                second = defaults.secondMin;
                millisec = defaults.millisecMin;
            }

            tp_inst.hour = hour;
            tp_inst.minute = minute;
            tp_inst.second = second;
            tp_inst.millisec = millisec;

            if (tp_inst.hour_slider) tp_inst.hour_slider.slider('value', hour);
            if (tp_inst.minute_slider) tp_inst.minute_slider.slider('value', minute);
            if (tp_inst.second_slider) tp_inst.second_slider.slider('value', second);
            if (tp_inst.millisec_slider) tp_inst.millisec_slider.slider('value', millisec);

            tp_inst._onTimeChange();
            tp_inst._updateDateTime(inst);
        }
    };

    //#######################################################################################
    // Create new public method to set only time, callable as $().datepicker('setTime', date)
    //#######################################################################################
    $.datepicker._setTimeDatepicker = function (target, date, withDate) {
        var inst = this._getInst(target),
            tp_inst = this._get(inst, 'timepicker');

        if (tp_inst) {
            this._setDateFromField(inst);
            var tp_date;
            if (date) {
                if (typeof date == "string") {
                    tp_inst._parseTime(date, withDate);
                    tp_date = new Date();
                    tp_date.setHours(tp_inst.hour, tp_inst.minute, tp_inst.second, tp_inst.millisec);
                }
                else tp_date = new Date(date.getTime());
                if (tp_date.toString() == 'Invalid Date') tp_date = undefined;
                this._setTime(inst, tp_date);
            }
        }
    };

    //#######################################################################################
    // override setDate() to allow setting time too within Date object
    //#######################################################################################
    $.datepicker._base_setDateDatepicker = $.datepicker._setDateDatepicker;
    $.datepicker._setDateDatepicker = function (target, date) {
        var inst = this._getInst(target),
            tp_date = (date instanceof Date) ? new Date(date.getTime()) : date;

        this._updateDatepicker(inst);
        this._base_setDateDatepicker.apply(this, arguments);
        this._setTimeDatepicker(target, tp_date, true);
    };

    //#######################################################################################
    // override getDate() to allow getting time too within Date object
    //#######################################################################################
    $.datepicker._base_getDateDatepicker = $.datepicker._getDateDatepicker;
    $.datepicker._getDateDatepicker = function (target, noDefault) {
        var inst = this._getInst(target),
            tp_inst = this._get(inst, 'timepicker');

        if (tp_inst) {
            this._setDateFromField(inst, noDefault);
            var date = this._getDate(inst);
            if (date && tp_inst._parseTime($(target).val(), tp_inst.timeOnly)) date.setHours(tp_inst.hour, tp_inst.minute, tp_inst.second, tp_inst.millisec);
            return date;
        }
        return this._base_getDateDatepicker(target, noDefault);
    };

    //#######################################################################################
    // override parseDate() because UI 1.8.14 throws an error about "Extra characters"
    // An option in datapicker to ignore extra format characters would be nicer.
    //#######################################################################################
    $.datepicker._base_parseDate = $.datepicker.parseDate;
    $.datepicker.parseDate = function (format, value, settings) {
        var date;
        try {
            date = this._base_parseDate(format, value, settings);
        } catch (err) {
            if (err.indexOf(":") >= 0) {
                // Hack!  The error message ends with a colon, a space, and
                // the "extra" characters.  We rely on that instead of
                // attempting to perfectly reproduce the parsing algorithm.
                date = this._base_parseDate(format, value.substring(0, value.length - (err.length - err.indexOf(':') - 2)), settings);
            } else {
                // The underlying error was not related to the time
                throw err;
            }
        }
        return date;
    };

    //#######################################################################################
    // override formatDate to set date with time to the input
    //#######################################################################################
    $.datepicker._base_formatDate = $.datepicker._formatDate;
    $.datepicker._formatDate = function (inst, day, month, year) {
        var tp_inst = this._get(inst, 'timepicker');
        if (tp_inst) {
            if (day)
                var b = this._base_formatDate(inst, day, month, year);
            tp_inst._updateDateTime(inst);
            return tp_inst.$input.val();
        }
        return this._base_formatDate(inst);
    };

    //#######################################################################################
    // override options setter to add time to maxDate(Time) and minDate(Time). MaxDate
    //#######################################################################################
    $.datepicker._base_optionDatepicker = $.datepicker._optionDatepicker;
    $.datepicker._optionDatepicker = function (target, name, value) {
        var inst = this._getInst(target),
            tp_inst = this._get(inst, 'timepicker');
        if (tp_inst) {
            var min, max, onselect;
            if (typeof name == 'string') { // if min/max was set with the string
                if (name === 'minDate' || name === 'minDateTime')
                    min = value;
                else if (name === 'maxDate' || name === 'maxDateTime')
                    max = value;
                else if (name === 'onSelect')
                    onselect = value;
            } else if (typeof name == 'object') { //if min/max was set with the JSON
                if (name.minDate)
                    min = name.minDate;
                else if (name.minDateTime)
                    min = name.minDateTime;
                else if (name.maxDate)
                    max = name.maxDate;
                else if (name.maxDateTime)
                    max = name.maxDateTime;
            }
            if (min) { //if min was set
                if (min == 0)
                    min = new Date();
                else
                    min = new Date(min);

                tp_inst._defaults.minDate = min;
                tp_inst._defaults.minDateTime = min;
            } else if (max) { //if max was set
                if (max == 0)
                    max = new Date();
                else
                    max = new Date(max);
                tp_inst._defaults.maxDate = max;
                tp_inst._defaults.maxDateTime = max;
            }
            else if (onselect)
                tp_inst._defaults.onSelect = onselect;
        }
        if (value === undefined)
            return this._base_optionDatepicker(target, name);
        return this._base_optionDatepicker(target, name, value);
    };

    //#######################################################################################
    // jQuery extend now ignores nulls!
    //#######################################################################################
    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props)
            if (props[name] === null || props[name] === undefined)
                target[name] = props[name];
        return target;
    };

    $.timepicker = new Timepicker(); // singleton instance
    $.timepicker.version = "0.9.9";
})(jQuery);;
/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Cloudream (cloudream@gmail.com). */
jQuery(function ($) {
    $.datepicker.regional['zh-CN'] = {
        closeText: '关闭',
        prevText: '&#x3c;上月',
        nextText: '下月&#x3e;',
        currentText: '今天',
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['一', '二', '三', '四', '五', '六',
            '七', '八', '九', '十', '十一', '十二'],
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        weekHeader: '周',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: '年'
    };
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);

    $.timepicker.regional['zh-CN'] = {
        timeOnlyTitle: '选择时间',
        timeText: '时间',
        hourText: '小时',
        minuteText: '分钟',
        secondText: '秒',
        millisecText: '毫秒',
        currentText: '现在',
        closeText: '完成',
        ampm: false
    };
    $.timepicker.setDefaults($.timepicker.regional['zh-CN']);
});;


/*
    http://www.JSON.org/json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z'
                : null;
        };

        String.prototype.toJSON =
            Number.prototype.toJSON =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        rep;

    function quote(string) {
        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe escape
        // sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
        // Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

        // If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        // If we were called with a replacer function, then call the replacer to
        // obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        // What happens next depends on the value's type.

        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

                // JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

                // If the value is a boolean or null, convert it to a string. Note:
                // typeof null does not produce 'null'. The case is included here in
                // the remote chance that this gets fixed someday.

                return String(value);

            // If the type is 'object', we might be dealing with an object or an array or
            // null.

            case 'object':

                // Due to a specification blunder in ECMAScript, typeof null is 'object',
                // so watch out for that case.

                if (!value) {
                    return 'null';
                }

                // Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

                // Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    // The value is an array. Stringify every element. Use null as a placeholder
                    // for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

                    // Join all of the elements together, separated with commas, and wrap them in
                    // brackets.

                    v = partial.length === 0
                        ? '[]'
                        : gap
                            ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                            : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

                // If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
                    // Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

                // Join all of the member texts together, separated with commas,
                // and wrap them in braces.

                v = partial.length === 0
                    ? '{}'
                    : gap
                        ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                        : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

    // If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            // The stringify method takes a value and an optional replacer, and an optional
            // space parameter, and returns a JSON text. The replacer can be a function
            // that can replace values, or an array of strings that will select the keys.
            // A default replacer method can be provided. Use of the space parameter can
            // produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

            // If the space parameter is a number, make an indent string containing that
            // many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

                // If the space parameter is a string, it will be used as the indent string.
            } else if (typeof space === 'string') {
                indent = space;
            }

            // If there is a replacer, it must be a function or an array.
            // Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

            // Make a fake root object containing our value under the key of ''.
            // Return the result of stringifying the value.

            return str('', { '': value });
        };
    }

    // If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            // The parse method takes a text and an optional reviver function, and returns
            // a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {
                // The walk method is used to recursively walk the resulting structure so
                // that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }

            // Parsing happens in four stages. In the first stage, we replace certain
            // Unicode characters with escape sequences. JavaScript handles many characters
            // incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            // In the second stage, we run the text against regular expressions that look
            // for non-JSON patterns. We are especially concerned with '()' and 'new'
            // because they can cause invocation, and '=' because it can cause mutation.
            // But just to be safe, we want to reject all unexpected forms.

            // We split the second stage into 4 regexp operations in order to work around
            // crippling inefficiencies in IE's and Safari's regexp engines. First we
            // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
            // replace all simple value tokens with ']' characters. Third, we delete all
            // open brackets that follow a colon or comma or that begin the text. Finally,
            // we look to see that the remaining characters are only whitespace or ']' or
            // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                    .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                // In the third stage we use the eval function to compile the text into a
                // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
                // in JavaScript: it can begin a block or an object literal. We wrap the text
                // in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

                // In the optional fourth stage, we recursively walk the new structure, passing
                // each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({ '': j }, '')
                    : j;
            }

            // If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());;
/*!
 * ASP.NET SignalR JavaScript Library v2.2.0
 * http://signalr.net/
 *
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *
 */
(function (n, t, i) { function w(t, i) { var u, f; if (n.isArray(t)) { for (u = t.length - 1; u >= 0; u--) f = t[u], n.type(f) === "string" && r.transports[f] || (i.log("Invalid transport: " + f + ", removing it from the transports list."), t.splice(u, 1)); t.length === 0 && (i.log("No transports remain within the specified transport array."), t = null) } else if (r.transports[t] || t === "auto") { if (t === "auto" && r._.ieVersion <= 8) return ["longPolling"] } else i.log("Invalid transport: " + t.toString() + "."), t = null; return t } function b(n) { return n === "http:" ? 80 : n === "https:" ? 443 : void 0 } function a(n, t) { return t.match(/:\d+$/) ? t : t + ":" + b(n) } function k(t, i) { var u = this, r = []; u.tryBuffer = function (i) { return t.state === n.signalR.connectionState.connecting ? (r.push(i), !0) : !1 }; u.drain = function () { if (t.state === n.signalR.connectionState.connected) while (r.length > 0) i(r.shift()) }; u.clear = function () { r = [] } } var f = { nojQuery: "jQuery was not found. Please ensure jQuery is referenced before the SignalR client JavaScript file.", noTransportOnInit: "No transport could be initialized successfully. Try specifying a different transport or none at all for auto initialization.", errorOnNegotiate: "Error during negotiation request.", stoppedWhileLoading: "The connection was stopped during page load.", stoppedWhileNegotiating: "The connection was stopped during the negotiate request.", errorParsingNegotiateResponse: "Error parsing negotiate response.", errorDuringStartRequest: "Error during start request. Stopping the connection.", stoppedDuringStartRequest: "The connection was stopped during the start request.", errorParsingStartResponse: "Error parsing start response: '{0}'. Stopping the connection.", invalidStartResponse: "Invalid start response: '{0}'. Stopping the connection.", protocolIncompatible: "You are using a version of the client that isn't compatible with the server. Client version {0}, server version {1}.", sendFailed: "Send failed.", parseFailed: "Failed at parsing response: {0}", longPollFailed: "Long polling request failed.", eventSourceFailedToConnect: "EventSource failed to connect.", eventSourceError: "Error raised by EventSource", webSocketClosed: "WebSocket closed.", pingServerFailedInvalidResponse: "Invalid ping response when pinging server: '{0}'.", pingServerFailed: "Failed to ping server.", pingServerFailedStatusCode: "Failed to ping server.  Server responded with status code {0}, stopping the connection.", pingServerFailedParse: "Failed to parse ping server response, stopping the connection.", noConnectionTransport: "Connection is in an invalid state, there is no transport active.", webSocketsInvalidState: "The Web Socket transport is in an invalid state, transitioning into reconnecting.", reconnectTimeout: "Couldn't reconnect within the configured timeout of {0} ms, disconnecting.", reconnectWindowTimeout: "The client has been inactive since {0} and it has exceeded the inactivity timeout of {1} ms. Stopping the connection." }; if (typeof n != "function") throw new Error(f.nojQuery); var r, h, s = t.document.readyState === "complete", e = n(t), c = "__Negotiate Aborted__", u = { onStart: "onStart", onStarting: "onStarting", onReceived: "onReceived", onError: "onError", onConnectionSlow: "onConnectionSlow", onReconnecting: "onReconnecting", onReconnect: "onReconnect", onStateChanged: "onStateChanged", onDisconnect: "onDisconnect" }, v = function (n, i) { if (i !== !1) { var r; typeof t.console != "undefined" && (r = "[" + (new Date).toTimeString() + "] SignalR: " + n, t.console.debug ? t.console.debug(r) : t.console.log && t.console.log(r)) } }, o = function (t, i, r) { return i === t.state ? (t.state = r, n(t).triggerHandler(u.onStateChanged, [{ oldState: i, newState: r }]), !0) : !1 }, y = function (n) { return n.state === r.connectionState.disconnected }, l = function (n) { return n._.keepAliveData.activated && n.transport.supportsKeepAlive(n) }, p = function (i) { var f, e; i._.configuredStopReconnectingTimeout || (e = function (t) { var i = r._.format(r.resources.reconnectTimeout, t.disconnectTimeout); t.log(i); n(t).triggerHandler(u.onError, [r._.error(i, "TimeoutException")]); t.stop(!1, !1) }, i.reconnecting(function () { var n = this; n.state === r.connectionState.reconnecting && (f = t.setTimeout(function () { e(n) }, n.disconnectTimeout)) }), i.stateChanged(function (n) { n.oldState === r.connectionState.reconnecting && t.clearTimeout(f) }), i._.configuredStopReconnectingTimeout = !0) }; r = function (n, t, i) { return new r.fn.init(n, t, i) }; r._ = { defaultContentType: "application/x-www-form-urlencoded; charset=UTF-8", ieVersion: function () { var i, n; return t.navigator.appName === "Microsoft Internet Explorer" && (n = /MSIE ([0-9]+\.[0-9]+)/.exec(t.navigator.userAgent), n && (i = t.parseFloat(n[1]))), i }(), error: function (n, t, i) { var r = new Error(n); return r.source = t, typeof i != "undefined" && (r.context = i), r }, transportError: function (n, t, r, u) { var f = this.error(n, r, u); return f.transport = t ? t.name : i, f }, format: function () { for (var t = arguments[0], n = 0; n < arguments.length - 1; n++) t = t.replace("{" + n + "}", arguments[n + 1]); return t }, firefoxMajorVersion: function (n) { var t = n.match(/Firefox\/(\d+)/); return !t || !t.length || t.length < 2 ? 0 : parseInt(t[1], 10) }, configurePingInterval: function (i) { var f = i._.config, e = function (t) { n(i).triggerHandler(u.onError, [t]) }; f && !i._.pingIntervalId && f.pingInterval && (i._.pingIntervalId = t.setInterval(function () { r.transports._logic.pingServer(i).fail(e) }, f.pingInterval)) } }; r.events = u; r.resources = f; r.ajaxDefaults = { processData: !0, timeout: null, async: !0, global: !1, cache: !1 }; r.changeState = o; r.isDisconnecting = y; r.connectionState = { connecting: 0, connected: 1, reconnecting: 2, disconnected: 4 }; r.hub = { start: function () { throw new Error("SignalR: Error loading hubs. Ensure your hubs reference is correct, e.g. <script src='/signalr/js'><\/script>."); } }; e.load(function () { s = !0 }); r.fn = r.prototype = { init: function (t, i, r) { var f = n(this); this.url = t; this.qs = i; this.lastError = null; this._ = { keepAliveData: {}, connectingMessageBuffer: new k(this, function (n) { f.triggerHandler(u.onReceived, [n]) }), lastMessageAt: (new Date).getTime(), lastActiveAt: (new Date).getTime(), beatInterval: 5e3, beatHandle: null, totalTransportConnectTimeout: 0 }; typeof r == "boolean" && (this.logging = r) }, _parseResponse: function (n) { var t = this; return n ? typeof n == "string" ? t.json.parse(n) : n : n }, _originalJson: t.JSON, json: t.JSON, isCrossDomain: function (i, r) { var u; return (i = n.trim(i), r = r || t.location, i.indexOf("http") !== 0) ? !1 : (u = t.document.createElement("a"), u.href = i, u.protocol + a(u.protocol, u.host) !== r.protocol + a(r.protocol, r.host)) }, ajaxDataType: "text", contentType: "application/json; charset=UTF-8", logging: !1, state: r.connectionState.disconnected, clientProtocol: "1.5", reconnectDelay: 2e3, transportConnectTimeout: 0, disconnectTimeout: 3e4, reconnectWindow: 3e4, keepAliveWarnAt: 2 / 3, start: function (i, h) { var a = this, v = { pingInterval: 3e5, waitForPageLoad: !0, transport: "auto", jsonp: !1 }, d, y = a._deferral || n.Deferred(), b = t.document.createElement("a"), k, g; if (a.lastError = null, a._deferral = y, !a.json) throw new Error("SignalR: No JSON parser found. Please ensure json2.js is referenced before the SignalR.js file if you need to support clients without native JSON parsing support, e.g. IE<8."); if (n.type(i) === "function" ? h = i : n.type(i) === "object" && (n.extend(v, i), n.type(v.callback) === "function" && (h = v.callback)), v.transport = w(v.transport, a), !v.transport) throw new Error("SignalR: Invalid transport(s) specified, aborting start."); return (a._.config = v, !s && v.waitForPageLoad === !0) ? (a._.deferredStartHandler = function () { a.start(i, h) }, e.bind("load", a._.deferredStartHandler), y.promise()) : a.state === r.connectionState.connecting ? y.promise() : o(a, r.connectionState.disconnected, r.connectionState.connecting) === !1 ? (y.resolve(a), y.promise()) : (p(a), b.href = a.url, b.protocol && b.protocol !== ":" ? (a.protocol = b.protocol, a.host = b.host) : (a.protocol = t.document.location.protocol, a.host = b.host || t.document.location.host), a.baseUrl = a.protocol + "//" + a.host, a.wsProtocol = a.protocol === "https:" ? "wss://" : "ws://", v.transport === "auto" && v.jsonp === !0 && (v.transport = "longPolling"), a.url.indexOf("//") === 0 && (a.url = t.location.protocol + a.url, a.log("Protocol relative URL detected, normalizing it to '" + a.url + "'.")), this.isCrossDomain(a.url) && (a.log("Auto detected cross domain url."), v.transport === "auto" && (v.transport = ["webSockets", "serverSentEvents", "longPolling"]), typeof v.withCredentials == "undefined" && (v.withCredentials = !0), v.jsonp || (v.jsonp = !n.support.cors, v.jsonp && a.log("Using jsonp because this browser doesn't support CORS.")), a.contentType = r._.defaultContentType), a.withCredentials = v.withCredentials, a.ajaxDataType = v.jsonp ? "jsonp" : "text", n(a).bind(u.onStart, function () { n.type(h) === "function" && h.call(a); y.resolve(a) }), a._.initHandler = r.transports._logic.initHandler(a), d = function (i, s) { var c = r._.error(f.noTransportOnInit); if (s = s || 0, s >= i.length) { s === 0 ? a.log("No transports supported by the server were selected.") : s === 1 ? a.log("No fallback transports were selected.") : a.log("Fallback transports exhausted."); n(a).triggerHandler(u.onError, [c]); y.reject(c); a.stop(); return } if (a.state !== r.connectionState.disconnected) { var p = i[s], h = r.transports[p], v = function () { d(i, s + 1) }; a.transport = h; try { a._.initHandler.start(h, function () { var i = r._.firefoxMajorVersion(t.navigator.userAgent) >= 11, f = !!a.withCredentials && i; a.log("The start request succeeded. Transitioning to the connected state."); l(a) && r.transports._logic.monitorKeepAlive(a); r.transports._logic.startHeartbeat(a); r._.configurePingInterval(a); o(a, r.connectionState.connecting, r.connectionState.connected) || a.log("WARNING! The connection was not in the connecting state."); a._.connectingMessageBuffer.drain(); n(a).triggerHandler(u.onStart); e.bind("unload", function () { a.log("Window unloading, stopping the connection."); a.stop(f) }); i && e.bind("beforeunload", function () { t.setTimeout(function () { a.stop(f) }, 0) }) }, v) } catch (w) { a.log(h.name + " transport threw '" + w.message + "' when attempting to start."); v() } } }, k = a.url + "/negotiate", g = function (t, i) { var e = r._.error(f.errorOnNegotiate, t, i._.negotiateRequest); n(i).triggerHandler(u.onError, e); y.reject(e); i.stop() }, n(a).triggerHandler(u.onStarting), k = r.transports._logic.prepareQueryString(a, k), a.log("Negotiating with '" + k + "'."), a._.negotiateRequest = r.transports._logic.ajax(a, { url: k, error: function (n, t) { t !== c ? g(n, a) : y.reject(r._.error(f.stoppedWhileNegotiating, null, a._.negotiateRequest)) }, success: function (t) { var i, e, h, o = [], s = []; try { i = a._parseResponse(t) } catch (c) { g(r._.error(f.errorParsingNegotiateResponse, c), a); return } if (e = a._.keepAliveData, a.appRelativeUrl = i.Url, a.id = i.ConnectionId, a.token = i.ConnectionToken, a.webSocketServerUrl = i.WebSocketServerUrl, a._.pollTimeout = i.ConnectionTimeout * 1e3 + 1e4, a.disconnectTimeout = i.DisconnectTimeout * 1e3, a._.totalTransportConnectTimeout = a.transportConnectTimeout + i.TransportConnectTimeout * 1e3, i.KeepAliveTimeout ? (e.activated = !0, e.timeout = i.KeepAliveTimeout * 1e3, e.timeoutWarning = e.timeout * a.keepAliveWarnAt, a._.beatInterval = (e.timeout - e.timeoutWarning) / 3) : e.activated = !1, a.reconnectWindow = a.disconnectTimeout + (e.timeout || 0), !i.ProtocolVersion || i.ProtocolVersion !== a.clientProtocol) { h = r._.error(r._.format(f.protocolIncompatible, a.clientProtocol, i.ProtocolVersion)); n(a).triggerHandler(u.onError, [h]); y.reject(h); return } n.each(r.transports, function (n) { if (n.indexOf("_") === 0 || n === "webSockets" && !i.TryWebSockets) return !0; s.push(n) }); n.isArray(v.transport) ? n.each(v.transport, function (t, i) { n.inArray(i, s) >= 0 && o.push(i) }) : v.transport === "auto" ? o = s : n.inArray(v.transport, s) >= 0 && o.push(v.transport); d(o) } }), y.promise()) }, starting: function (t) { var i = this; return n(i).bind(u.onStarting, function () { t.call(i) }), i }, send: function (n) { var t = this; if (t.state === r.connectionState.disconnected) throw new Error("SignalR: Connection must be started before data can be sent. Call .start() before .send()"); if (t.state === r.connectionState.connecting) throw new Error("SignalR: Connection has not been fully initialized. Use .start().done() or .start().fail() to run logic after the connection has started."); return t.transport.send(t, n), t }, received: function (t) { var i = this; return n(i).bind(u.onReceived, function (n, r) { t.call(i, r) }), i }, stateChanged: function (t) { var i = this; return n(i).bind(u.onStateChanged, function (n, r) { t.call(i, r) }), i }, error: function (t) { var i = this; return n(i).bind(u.onError, function (n, r, u) { i.lastError = r; t.call(i, r, u) }), i }, disconnected: function (t) { var i = this; return n(i).bind(u.onDisconnect, function () { t.call(i) }), i }, connectionSlow: function (t) { var i = this; return n(i).bind(u.onConnectionSlow, function () { t.call(i) }), i }, reconnecting: function (t) { var i = this; return n(i).bind(u.onReconnecting, function () { t.call(i) }), i }, reconnected: function (t) { var i = this; return n(i).bind(u.onReconnect, function () { t.call(i) }), i }, stop: function (i, h) { var a = this, v = a._deferral; if (a._.deferredStartHandler && e.unbind("load", a._.deferredStartHandler), delete a._.config, delete a._.deferredStartHandler, !s && (!a._.config || a._.config.waitForPageLoad === !0)) { a.log("Stopping connection prior to negotiate."); v && v.reject(r._.error(f.stoppedWhileLoading)); return } if (a.state !== r.connectionState.disconnected) return a.log("Stopping connection."), o(a, a.state, r.connectionState.disconnected), t.clearTimeout(a._.beatHandle), t.clearInterval(a._.pingIntervalId), a.transport && (a.transport.stop(a), h !== !1 && a.transport.abort(a, i), l(a) && r.transports._logic.stopMonitoringKeepAlive(a), a.transport = null), a._.negotiateRequest && (a._.negotiateRequest.abort(c), delete a._.negotiateRequest), a._.initHandler && a._.initHandler.stop(), n(a).triggerHandler(u.onDisconnect), delete a._deferral, delete a.messageId, delete a.groupsToken, delete a.id, delete a._.pingIntervalId, delete a._.lastMessageAt, delete a._.lastActiveAt, a._.connectingMessageBuffer.clear(), a }, log: function (n) { v(n, this.logging) } }; r.fn.init.prototype = r.fn; r.noConflict = function () { return n.connection === r && (n.connection = h), r }; n.connection && (h = n.connection); n.connection = n.signalR = r })(window.jQuery, window), function (n, t, i) { function s(n) { n._.keepAliveData.monitoring && l(n); u.markActive(n) && (n._.beatHandle = t.setTimeout(function () { s(n) }, n._.beatInterval)) } function l(t) { var i = t._.keepAliveData, u; t.state === r.connectionState.connected && (u = (new Date).getTime() - t._.lastMessageAt, u >= i.timeout ? (t.log("Keep alive timed out.  Notifying transport that connection has been lost."), t.transport.lostConnection(t)) : u >= i.timeoutWarning ? i.userNotified || (t.log("Keep alive has been missed, connection may be dead/slow."), n(t).triggerHandler(f.onConnectionSlow), i.userNotified = !0) : i.userNotified = !1) } function e(n, t) { var i = n.url + t; return n.transport && (i += "?transport=" + n.transport.name), u.prepareQueryString(n, i) } function h(n) { this.connection = n; this.startRequested = !1; this.startCompleted = !1; this.connectionStopped = !1 } var r = n.signalR, f = n.signalR.events, c = n.signalR.changeState, o = "__Start Aborted__", u; r.transports = {}; h.prototype = { start: function (n, r, u) { var f = this, e = f.connection, o = !1; if (f.startRequested || f.connectionStopped) { e.log("WARNING! " + n.name + " transport cannot be started. Initialization ongoing or completed."); return } e.log(n.name + " transport starting."); f.transportTimeoutHandle = t.setTimeout(function () { o || (o = !0, e.log(n.name + " transport timed out when trying to connect."), f.transportFailed(n, i, u)) }, e._.totalTransportConnectTimeout); n.start(e, function () { o || f.initReceived(n, r) }, function (t) { return o || (o = !0, f.transportFailed(n, t, u)), !f.startCompleted || f.connectionStopped }) }, stop: function () { this.connectionStopped = !0; t.clearTimeout(this.transportTimeoutHandle); r.transports._logic.tryAbortStartRequest(this.connection) }, initReceived: function (n, i) { var u = this, f = u.connection; if (u.startRequested) { f.log("WARNING! The client received multiple init messages."); return } u.connectionStopped || (u.startRequested = !0, t.clearTimeout(u.transportTimeoutHandle), f.log(n.name + " transport connected. Initiating start request."), r.transports._logic.ajaxStart(f, function () { u.startCompleted = !0; i() })) }, transportFailed: function (i, u, e) { var o = this.connection, h = o._deferral, s; this.connectionStopped || (t.clearTimeout(this.transportTimeoutHandle), this.startRequested ? this.startCompleted || (s = r._.error(r.resources.errorDuringStartRequest, u), o.log(i.name + " transport failed during the start request. Stopping the connection."), n(o).triggerHandler(f.onError, [s]), h && h.reject(s), o.stop()) : (i.stop(o), o.log(i.name + " transport failed to connect. Attempting to fall back."), e())) } }; u = r.transports._logic = { ajax: function (t, i) { return n.ajax(n.extend(!0, {}, n.signalR.ajaxDefaults, { type: "GET", data: {}, xhrFields: { withCredentials: t.withCredentials }, contentType: t.contentType, dataType: t.ajaxDataType }, i)) }, pingServer: function (t) { var e, f, i = n.Deferred(); return t.transport ? (e = t.url + "/ping", e = u.addQs(e, t.qs), f = u.ajax(t, { url: e, success: function (n) { var u; try { u = t._parseResponse(n) } catch (e) { i.reject(r._.transportError(r.resources.pingServerFailedParse, t.transport, e, f)); t.stop(); return } u.Response === "pong" ? i.resolve() : i.reject(r._.transportError(r._.format(r.resources.pingServerFailedInvalidResponse, n), t.transport, null, f)) }, error: function (n) { n.status === 401 || n.status === 403 ? (i.reject(r._.transportError(r._.format(r.resources.pingServerFailedStatusCode, n.status), t.transport, n, f)), t.stop()) : i.reject(r._.transportError(r.resources.pingServerFailed, t.transport, n, f)) } })) : i.reject(r._.transportError(r.resources.noConnectionTransport, t.transport)), i.promise() }, prepareQueryString: function (n, i) { var r; return r = u.addQs(i, "clientProtocol=" + n.clientProtocol), r = u.addQs(r, n.qs), n.token && (r += "&connectionToken=" + t.encodeURIComponent(n.token)), n.data && (r += "&connectionData=" + t.encodeURIComponent(n.data)), r }, addQs: function (t, i) { var r = t.indexOf("?") !== -1 ? "&" : "?", u; if (!i) return t; if (typeof i == "object") return t + r + n.param(i); if (typeof i == "string") return u = i.charAt(0), (u === "?" || u === "&") && (r = ""), t + r + i; throw new Error("Query string property must be either a string or object."); }, getUrl: function (n, i, r, f, e) { var h = i === "webSockets" ? "" : n.baseUrl, o = h + n.appRelativeUrl, s = "transport=" + i; return !e && n.groupsToken && (s += "&groupsToken=" + t.encodeURIComponent(n.groupsToken)), r ? (o += f ? "/poll" : "/reconnect", !e && n.messageId && (s += "&messageId=" + t.encodeURIComponent(n.messageId))) : o += "/connect", o += "?" + s, o = u.prepareQueryString(n, o), e || (o += "&tid=" + Math.floor(Math.random() * 11)), o }, maximizePersistentResponse: function (n) { return { MessageId: n.C, Messages: n.M, Initialized: typeof n.S != "undefined" ? !0 : !1, ShouldReconnect: typeof n.T != "undefined" ? !0 : !1, LongPollDelay: n.L, GroupsToken: n.G } }, updateGroups: function (n, t) { t && (n.groupsToken = t) }, stringifySend: function (n, t) { return typeof t == "string" || typeof t == "undefined" || t === null ? t : n.json.stringify(t) }, ajaxSend: function (t, i) { var h = u.stringifySend(t, i), c = e(t, "/send"), o, s = function (t, u) { n(u).triggerHandler(f.onError, [r._.transportError(r.resources.sendFailed, u.transport, t, o), i]) }; return o = u.ajax(t, { url: c, type: t.ajaxDataType === "jsonp" ? "GET" : "POST", contentType: r._.defaultContentType, data: { data: h }, success: function (n) { var i; if (n) { try { i = t._parseResponse(n) } catch (r) { s(r, t); t.stop(); return } u.triggerReceived(t, i) } }, error: function (n, i) { i !== "abort" && i !== "parsererror" && s(n, t) } }) }, ajaxAbort: function (n, t) { if (typeof n.transport != "undefined") { t = typeof t == "undefined" ? !0 : t; var i = e(n, "/abort"); u.ajax(n, { url: i, async: t, timeout: 1e3, type: "POST" }); n.log("Fired ajax abort async = " + t + ".") } }, ajaxStart: function (t, i) { var h = function (n) { var i = t._deferral; i && i.reject(n) }, s = function (i) { t.log("The start request failed. Stopping the connection."); n(t).triggerHandler(f.onError, [i]); h(i); t.stop() }; t._.startRequest = u.ajax(t, { url: e(t, "/start"), success: function (n, u, f) { var e; try { e = t._parseResponse(n) } catch (o) { s(r._.error(r._.format(r.resources.errorParsingStartResponse, n), o, f)); return } e.Response === "started" ? i() : s(r._.error(r._.format(r.resources.invalidStartResponse, n), null, f)) }, error: function (n, i, u) { i !== o ? s(r._.error(r.resources.errorDuringStartRequest, u, n)) : (t.log("The start request aborted because connection.stop() was called."), h(r._.error(r.resources.stoppedDuringStartRequest, null, n))) } }) }, tryAbortStartRequest: function (n) { n._.startRequest && (n._.startRequest.abort(o), delete n._.startRequest) }, tryInitialize: function (n, t) { n.Initialized && t() }, triggerReceived: function (t, i) { t._.connectingMessageBuffer.tryBuffer(i) || n(t).triggerHandler(f.onReceived, [i]) }, processMessages: function (t, i, r) { var f; u.markLastMessage(t); i && (f = u.maximizePersistentResponse(i), u.updateGroups(t, f.GroupsToken), f.MessageId && (t.messageId = f.MessageId), f.Messages && (n.each(f.Messages, function (n, i) { u.triggerReceived(t, i) }), u.tryInitialize(f, r))) }, monitorKeepAlive: function (t) { var i = t._.keepAliveData; i.monitoring ? t.log("Tried to monitor keep alive but it's already being monitored.") : (i.monitoring = !0, u.markLastMessage(t), t._.keepAliveData.reconnectKeepAliveUpdate = function () { u.markLastMessage(t) }, n(t).bind(f.onReconnect, t._.keepAliveData.reconnectKeepAliveUpdate), t.log("Now monitoring keep alive with a warning timeout of " + i.timeoutWarning + ", keep alive timeout of " + i.timeout + " and disconnecting timeout of " + t.disconnectTimeout)) }, stopMonitoringKeepAlive: function (t) { var i = t._.keepAliveData; i.monitoring && (i.monitoring = !1, n(t).unbind(f.onReconnect, t._.keepAliveData.reconnectKeepAliveUpdate), t._.keepAliveData = {}, t.log("Stopping the monitoring of the keep alive.")) }, startHeartbeat: function (n) { n._.lastActiveAt = (new Date).getTime(); s(n) }, markLastMessage: function (n) { n._.lastMessageAt = (new Date).getTime() }, markActive: function (n) { return u.verifyLastActive(n) ? (n._.lastActiveAt = (new Date).getTime(), !0) : !1 }, isConnectedOrReconnecting: function (n) { return n.state === r.connectionState.connected || n.state === r.connectionState.reconnecting }, ensureReconnectingState: function (t) { return c(t, r.connectionState.connected, r.connectionState.reconnecting) === !0 && n(t).triggerHandler(f.onReconnecting), t.state === r.connectionState.reconnecting }, clearReconnectTimeout: function (n) { n && n._.reconnectTimeout && (t.clearTimeout(n._.reconnectTimeout), delete n._.reconnectTimeout) }, verifyLastActive: function (t) { if ((new Date).getTime() - t._.lastActiveAt >= t.reconnectWindow) { var i = r._.format(r.resources.reconnectWindowTimeout, new Date(t._.lastActiveAt), t.reconnectWindow); return t.log(i), n(t).triggerHandler(f.onError, [r._.error(i, "TimeoutException")]), t.stop(!1, !1), !1 } return !0 }, reconnect: function (n, i) { var f = r.transports[i]; if (u.isConnectedOrReconnecting(n) && !n._.reconnectTimeout) { if (!u.verifyLastActive(n)) return; n._.reconnectTimeout = t.setTimeout(function () { u.verifyLastActive(n) && (f.stop(n), u.ensureReconnectingState(n) && (n.log(i + " reconnecting."), f.start(n))) }, n.reconnectDelay) } }, handleParseFailure: function (t, i, u, e, o) { var s = r._.transportError(r._.format(r.resources.parseFailed, i), t.transport, u, o); e && e(s) ? t.log("Failed to parse server response while attempting to connect.") : (n(t).triggerHandler(f.onError, [s]), t.stop()) }, initHandler: function (n) { return new h(n) }, foreverFrame: { count: 0, connections: {} } } }(window.jQuery, window), function (n, t) { var r = n.signalR, u = n.signalR.events, f = n.signalR.changeState, i = r.transports._logic; r.transports.webSockets = { name: "webSockets", supportsKeepAlive: function () { return !0 }, send: function (t, f) { var e = i.stringifySend(t, f); try { t.socket.send(e) } catch (o) { n(t).triggerHandler(u.onError, [r._.transportError(r.resources.webSocketsInvalidState, t.transport, o, t.socket), f]) } }, start: function (e, o, s) { var h, c = !1, l = this, a = !o, v = n(e); if (!t.WebSocket) { s(); return } e.socket || (h = e.webSocketServerUrl ? e.webSocketServerUrl : e.wsProtocol + e.host, h += i.getUrl(e, this.name, a), e.log("Connecting to websocket endpoint '" + h + "'."), e.socket = new t.WebSocket(h), e.socket.onopen = function () { c = !0; e.log("Websocket opened."); i.clearReconnectTimeout(e); f(e, r.connectionState.reconnecting, r.connectionState.connected) === !0 && v.triggerHandler(u.onReconnect) }, e.socket.onclose = function (t) { var i; this === e.socket && (c && typeof t.wasClean != "undefined" && t.wasClean === !1 ? (i = r._.transportError(r.resources.webSocketClosed, e.transport, t), e.log("Unclean disconnect from websocket: " + (t.reason || "[no reason given]."))) : e.log("Websocket closed."), s && s(i) || (i && n(e).triggerHandler(u.onError, [i]), l.reconnect(e))) }, e.socket.onmessage = function (t) { var r; try { r = e._parseResponse(t.data) } catch (u) { i.handleParseFailure(e, t.data, u, s, t); return } r && (n.isEmptyObject(r) || r.M ? i.processMessages(e, r, o) : i.triggerReceived(e, r)) }) }, reconnect: function (n) { i.reconnect(n, this.name) }, lostConnection: function (n) { this.reconnect(n) }, stop: function (n) { i.clearReconnectTimeout(n); n.socket && (n.log("Closing the Websocket."), n.socket.close(), n.socket = null) }, abort: function (n, t) { i.ajaxAbort(n, t) } } }(window.jQuery, window), function (n, t) { var i = n.signalR, u = n.signalR.events, e = n.signalR.changeState, r = i.transports._logic, f = function (n) { t.clearTimeout(n._.reconnectAttemptTimeoutHandle); delete n._.reconnectAttemptTimeoutHandle }; i.transports.serverSentEvents = { name: "serverSentEvents", supportsKeepAlive: function () { return !0 }, timeOut: 3e3, start: function (o, s, h) { var c = this, l = !1, a = n(o), v = !s, y; if (o.eventSource && (o.log("The connection already has an event source. Stopping it."), o.stop()), !t.EventSource) { h && (o.log("This browser doesn't support SSE."), h()); return } y = r.getUrl(o, this.name, v); try { o.log("Attempting to connect to SSE endpoint '" + y + "'."); o.eventSource = new t.EventSource(y, { withCredentials: o.withCredentials }) } catch (p) { o.log("EventSource failed trying to connect with error " + p.Message + "."); h ? h() : (a.triggerHandler(u.onError, [i._.transportError(i.resources.eventSourceFailedToConnect, o.transport, p)]), v && c.reconnect(o)); return } v && (o._.reconnectAttemptTimeoutHandle = t.setTimeout(function () { l === !1 && o.eventSource.readyState !== t.EventSource.OPEN && c.reconnect(o) }, c.timeOut)); o.eventSource.addEventListener("open", function () { o.log("EventSource connected."); f(o); r.clearReconnectTimeout(o); l === !1 && (l = !0, e(o, i.connectionState.reconnecting, i.connectionState.connected) === !0 && a.triggerHandler(u.onReconnect)) }, !1); o.eventSource.addEventListener("message", function (n) { var t; if (n.data !== "initialized") { try { t = o._parseResponse(n.data) } catch (i) { r.handleParseFailure(o, n.data, i, h, n); return } r.processMessages(o, t, s) } }, !1); o.eventSource.addEventListener("error", function (n) { var r = i._.transportError(i.resources.eventSourceError, o.transport, n); this === o.eventSource && (h && h(r) || (o.log("EventSource readyState: " + o.eventSource.readyState + "."), n.eventPhase === t.EventSource.CLOSED ? (o.log("EventSource reconnecting due to the server connection ending."), c.reconnect(o)) : (o.log("EventSource error."), a.triggerHandler(u.onError, [r])))) }, !1) }, reconnect: function (n) { r.reconnect(n, this.name) }, lostConnection: function (n) { this.reconnect(n) }, send: function (n, t) { r.ajaxSend(n, t) }, stop: function (n) { f(n); r.clearReconnectTimeout(n); n && n.eventSource && (n.log("EventSource calling close()."), n.eventSource.close(), n.eventSource = null, delete n.eventSource) }, abort: function (n, t) { r.ajaxAbort(n, t) } } }(window.jQuery, window), function (n, t) { var r = n.signalR, e = n.signalR.events, o = n.signalR.changeState, i = r.transports._logic, u = function () { var n = t.document.createElement("iframe"); return n.setAttribute("style", "position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;"), n }, f = function () { var i = null, f = 1e3, n = 0; return { prevent: function () { r._.ieVersion <= 8 && (n === 0 && (i = t.setInterval(function () { var n = u(); t.document.body.appendChild(n); t.document.body.removeChild(n); n = null }, f)), n++) }, cancel: function () { n === 1 && t.clearInterval(i); n > 0 && n-- } } }(); r.transports.foreverFrame = { name: "foreverFrame", supportsKeepAlive: function () { return !0 }, iframeClearThreshold: 50, start: function (n, r, e) { var l = this, s = i.foreverFrame.count += 1, h, o = u(), c = function () { n.log("Forever frame iframe finished loading and is no longer receiving messages."); e && e() || l.reconnect(n) }; if (t.EventSource) { e && (n.log("Forever Frame is not supported by SignalR on browsers with SSE support."), e()); return } o.setAttribute("data-signalr-connection-id", n.id); f.prevent(); h = i.getUrl(n, this.name); h += "&frameId=" + s; t.document.documentElement.appendChild(o); n.log("Binding to iframe's load event."); o.addEventListener ? o.addEventListener("load", c, !1) : o.attachEvent && o.attachEvent("onload", c); o.src = h; i.foreverFrame.connections[s] = n; n.frame = o; n.frameId = s; r && (n.onSuccess = function () { n.log("Iframe transport started."); r() }) }, reconnect: function (n) { var r = this; i.isConnectedOrReconnecting(n) && i.verifyLastActive(n) && t.setTimeout(function () { if (i.verifyLastActive(n) && n.frame && i.ensureReconnectingState(n)) { var u = n.frame, t = i.getUrl(n, r.name, !0) + "&frameId=" + n.frameId; n.log("Updating iframe src to '" + t + "'."); u.src = t } }, n.reconnectDelay) }, lostConnection: function (n) { this.reconnect(n) }, send: function (n, t) { i.ajaxSend(n, t) }, receive: function (t, u) { var f, e, o; if (t.json !== t._originalJson && (u = t._originalJson.stringify(u)), o = t._parseResponse(u), i.processMessages(t, o, t.onSuccess), t.state === n.signalR.connectionState.connected && (t.frameMessageCount = (t.frameMessageCount || 0) + 1, t.frameMessageCount > r.transports.foreverFrame.iframeClearThreshold && (t.frameMessageCount = 0, f = t.frame.contentWindow || t.frame.contentDocument, f && f.document && f.document.body))) for (e = f.document.body; e.firstChild;) e.removeChild(e.firstChild) }, stop: function (n) { var r = null; if (f.cancel(), n.frame) { if (n.frame.stop) n.frame.stop(); else try { r = n.frame.contentWindow || n.frame.contentDocument; r.document && r.document.execCommand && r.document.execCommand("Stop") } catch (u) { n.log("Error occured when stopping foreverFrame transport. Message = " + u.message + ".") } n.frame.parentNode === t.document.body && t.document.body.removeChild(n.frame); delete i.foreverFrame.connections[n.frameId]; n.frame = null; n.frameId = null; delete n.frame; delete n.frameId; delete n.onSuccess; delete n.frameMessageCount; n.log("Stopping forever frame.") } }, abort: function (n, t) { i.ajaxAbort(n, t) }, getConnection: function (n) { return i.foreverFrame.connections[n] }, started: function (t) { o(t, r.connectionState.reconnecting, r.connectionState.connected) === !0 && n(t).triggerHandler(e.onReconnect) } } }(window.jQuery, window), function (n, t) { var r = n.signalR, u = n.signalR.events, e = n.signalR.changeState, f = n.signalR.isDisconnecting, i = r.transports._logic; r.transports.longPolling = { name: "longPolling", supportsKeepAlive: function () { return !1 }, reconnectDelay: 3e3, start: function (o, s, h) { var a = this, v = function () { v = n.noop; o.log("LongPolling connected."); s() }, y = function (n) { return h(n) ? (o.log("LongPolling failed to connect."), !0) : !1 }, c = o._, l = 0, p = function (i) { t.clearTimeout(c.reconnectTimeoutId); c.reconnectTimeoutId = null; e(i, r.connectionState.reconnecting, r.connectionState.connected) === !0 && (i.log("Raising the reconnect event"), n(i).triggerHandler(u.onReconnect)) }, w = 36e5; o.pollXhr && (o.log("Polling xhr requests already exists, aborting."), o.stop()); o.messageId = null; c.reconnectTimeoutId = null; c.pollTimeoutId = t.setTimeout(function () { (function e(s, h) { var g = s.messageId, nt = g === null, k = !nt, tt = !h, d = i.getUrl(s, a.name, k, tt, !0), b = {}; (s.messageId && (b.messageId = s.messageId), s.groupsToken && (b.groupsToken = s.groupsToken), f(s) !== !0) && (o.log("Opening long polling request to '" + d + "'."), s.pollXhr = i.ajax(o, { xhrFields: { onprogress: function () { i.markLastMessage(o) } }, url: d, type: "POST", contentType: r._.defaultContentType, data: b, timeout: o._.pollTimeout, success: function (r) { var h, w = 0, u, a; o.log("Long poll complete."); l = 0; try { h = o._parseResponse(r) } catch (b) { i.handleParseFailure(s, r, b, y, s.pollXhr); return } (c.reconnectTimeoutId !== null && p(s), h && (u = i.maximizePersistentResponse(h)), i.processMessages(s, h, v), u && n.type(u.LongPollDelay) === "number" && (w = u.LongPollDelay), f(s) !== !0) && (a = u && u.ShouldReconnect, !a || i.ensureReconnectingState(s)) && (w > 0 ? c.pollTimeoutId = t.setTimeout(function () { e(s, a) }, w) : e(s, a)) }, error: function (f, h) { var v = r._.transportError(r.resources.longPollFailed, o.transport, f, s.pollXhr); if (t.clearTimeout(c.reconnectTimeoutId), c.reconnectTimeoutId = null, h === "abort") { o.log("Aborted xhr request."); return } if (!y(v)) { if (l++ , o.state !== r.connectionState.reconnecting && (o.log("An error occurred using longPolling. Status = " + h + ".  Response = " + f.responseText + "."), n(s).triggerHandler(u.onError, [v])), (o.state === r.connectionState.connected || o.state === r.connectionState.reconnecting) && !i.verifyLastActive(o)) return; if (!i.ensureReconnectingState(s)) return; c.pollTimeoutId = t.setTimeout(function () { e(s, !0) }, a.reconnectDelay) } } }), k && h === !0 && (c.reconnectTimeoutId = t.setTimeout(function () { p(s) }, Math.min(1e3 * (Math.pow(2, l) - 1), w)))) })(o) }, 250) }, lostConnection: function (n) { n.pollXhr && n.pollXhr.abort("lostConnection") }, send: function (n, t) { i.ajaxSend(n, t) }, stop: function (n) { t.clearTimeout(n._.pollTimeoutId); t.clearTimeout(n._.reconnectTimeoutId); delete n._.pollTimeoutId; delete n._.reconnectTimeoutId; n.pollXhr && (n.pollXhr.abort(), n.pollXhr = null, delete n.pollXhr) }, abort: function (n, t) { i.ajaxAbort(n, t) } } }(window.jQuery, window), function (n) { function r(n) { return n + e } function s(n, t, i) { for (var f = n.length, u = [], r = 0; r < f; r += 1) n.hasOwnProperty(r) && (u[r] = t.call(i, n[r], r, n)); return u } function h(t) { return n.isFunction(t) ? null : n.type(t) === "undefined" ? null : t } function u(n) { for (var t in n) if (n.hasOwnProperty(t)) return !0; return !1 } function f(n, t) { var i = n._.invocationCallbacks, r, f; u(i) && n.log("Clearing hub invocation callbacks with error: " + t + "."); n._.invocationCallbackId = 0; delete n._.invocationCallbacks; n._.invocationCallbacks = {}; for (f in i) r = i[f], r.method.call(r.scope, { E: t }) } function i(n, t) { return new i.fn.init(n, t) } function t(i, r) { var u = { qs: null, logging: !1, useDefaultPath: !0 }; return n.extend(u, r), (!i || u.useDefaultPath) && (i = (i || "") + "/signalr"), new t.fn.init(i, u) } var e = ".hubProxy", o = n.signalR; i.fn = i.prototype = { init: function (n, t) { this.state = {}; this.connection = n; this.hubName = t; this._ = { callbackMap: {} } }, constructor: i, hasSubscriptions: function () { return u(this._.callbackMap) }, on: function (t, i) { var u = this, f = u._.callbackMap; return t = t.toLowerCase(), f[t] || (f[t] = {}), f[t][i] = function (n, t) { i.apply(u, t) }, n(u).bind(r(t), f[t][i]), u }, off: function (t, i) { var e = this, o = e._.callbackMap, f; return t = t.toLowerCase(), f = o[t], f && (f[i] ? (n(e).unbind(r(t), f[i]), delete f[i], u(f) || delete o[t]) : i || (n(e).unbind(r(t)), delete o[t])), e }, invoke: function (t) { var i = this, r = i.connection, e = n.makeArray(arguments).slice(1), c = s(e, h), f = { H: i.hubName, M: t, A: c, I: r._.invocationCallbackId }, u = n.Deferred(), l = function (f) { var e = i._maximizeHubResponse(f), h, s; n.extend(i.state, e.State); e.Progress ? u.notifyWith ? u.notifyWith(i, [e.Progress.Data]) : r._.progressjQueryVersionLogged || (r.log("A hub method invocation progress update was received but the version of jQuery in use (" + n.prototype.jquery + ") does not support progress updates. Upgrade to jQuery 1.7+ to receive progress notifications."), r._.progressjQueryVersionLogged = !0) : e.Error ? (e.StackTrace && r.log(e.Error + "\n" + e.StackTrace + "."), h = e.IsHubException ? "HubException" : "Exception", s = o._.error(e.Error, h), s.data = e.ErrorData, r.log(i.hubName + "." + t + " failed to execute. Error: " + s.message), u.rejectWith(i, [s])) : (r.log("Invoked " + i.hubName + "." + t), u.resolveWith(i, [e.Result])) }; return r._.invocationCallbacks[r._.invocationCallbackId.toString()] = { scope: i, method: l }, r._.invocationCallbackId += 1, n.isEmptyObject(i.state) || (f.S = i.state), r.log("Invoking " + i.hubName + "." + t), r.send(f), u.promise() }, _maximizeHubResponse: function (n) { return { State: n.S, Result: n.R, Progress: n.P ? { Id: n.P.I, Data: n.P.D } : null, Id: n.I, IsHubException: n.H, Error: n.E, StackTrace: n.T, ErrorData: n.D } } }; i.fn.init.prototype = i.fn; t.fn = t.prototype = n.connection(); t.fn.init = function (t, i) { var e = { qs: null, logging: !1, useDefaultPath: !0 }, u = this; n.extend(e, i); n.signalR.fn.init.call(u, t, e.qs, e.logging); u.proxies = {}; u._.invocationCallbackId = 0; u._.invocationCallbacks = {}; u.received(function (t) { var f, o, e, i, s, h; t && (typeof t.P != "undefined" ? (e = t.P.I.toString(), i = u._.invocationCallbacks[e], i && i.method.call(i.scope, t)) : typeof t.I != "undefined" ? (e = t.I.toString(), i = u._.invocationCallbacks[e], i && (u._.invocationCallbacks[e] = null, delete u._.invocationCallbacks[e], i.method.call(i.scope, t))) : (f = this._maximizeClientHubInvocation(t), u.log("Triggering client hub event '" + f.Method + "' on hub '" + f.Hub + "'."), s = f.Hub.toLowerCase(), h = f.Method.toLowerCase(), o = this.proxies[s], n.extend(o.state, f.State), n(o).triggerHandler(r(h), [f.Args]))) }); u.error(function (n, t) { var i, r; t && (i = t.I, r = u._.invocationCallbacks[i], r && (u._.invocationCallbacks[i] = null, delete u._.invocationCallbacks[i], r.method.call(r.scope, { E: n }))) }); u.reconnecting(function () { u.transport && u.transport.name === "webSockets" && f(u, "Connection started reconnecting before invocation result was received.") }); u.disconnected(function () { f(u, "Connection was disconnected before invocation result was received.") }) }; t.fn._maximizeClientHubInvocation = function (n) { return { Hub: n.H, Method: n.M, Args: n.A, State: n.S } }; t.fn._registerSubscribedHubs = function () { var t = this; t._subscribedToHubs || (t._subscribedToHubs = !0, t.starting(function () { var i = []; n.each(t.proxies, function (n) { this.hasSubscriptions() && (i.push({ name: n }), t.log("Client subscribed to hub '" + n + "'.")) }); i.length === 0 && t.log("No hubs have been subscribed to.  The client will not receive data from hubs.  To fix, declare at least one client side function prior to connection start for each hub you wish to subscribe to."); t.data = t.json.stringify(i) })) }; t.fn.createHubProxy = function (n) { n = n.toLowerCase(); var t = this.proxies[n]; return t || (t = i(this, n), this.proxies[n] = t), this._registerSubscribedHubs(), t }; t.fn.init.prototype = t.fn; n.hubConnection = t }(window.jQuery, window), function (n) { n.signalR.version = "2.2.0" }(window.jQuery);
/*!
 * jQuery Mousewheel 3.1.12
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ('onwheel' in document || document.documentMode >= 9) ?
            ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ($.event.fixHooks) {
        for (var i = toFix.length; i;) {
            $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function () {
            if (this.addEventListener) {
                for (var i = toBind.length; i;) {
                    this.addEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function () {
            if (this.removeEventListener) {
                for (var i = toBind.length; i;) {
                    this.removeEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function (elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function (elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function (fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function (fn) {
            return this.unbind('mousewheel', fn);
        }
    });

    function handler(event) {
        var orgEvent = event || window.event,
            args = slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            offsetX = 0,
            offsetY = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ('detail' in orgEvent) { deltaY = orgEvent.detail * -1; }
        if ('wheelDelta' in orgEvent) { deltaY = orgEvent.wheelDelta; }
        if ('wheelDeltaY' in orgEvent) { deltaY = orgEvent.wheelDeltaY; }
        if ('wheelDeltaX' in orgEvent) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ('deltaY' in orgEvent) {
            deltaY = orgEvent.deltaY * -1;
            delta = deltaY;
        }
        if ('deltaX' in orgEvent) {
            deltaX = orgEvent.deltaX;
            if (deltaY === 0) { delta = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if (deltaY === 0 && deltaX === 0) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if (orgEvent.deltaMode === 1) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if (orgEvent.deltaMode === 2) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

        if (!lowestDelta || absDelta < lowestDelta) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
            // Divide all the things by 40!
            delta /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
        deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
        deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if (special.settings.normalizeOffset && this.getBoundingClientRect) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }
}));;
/*!
 * jScrollPane - v2.0.23 - 2016-01-28
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2014 Kelvin Luck
 * Dual licensed under the MIT or GPL licenses.
 */
!function (a) { "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : a(jQuery) }(function (a) { a.fn.jScrollPane = function (b) { function c(b, c) { function d(c) { var f, h, j, k, l, o, p = !1, q = !1; if (N = c, void 0 === O) l = b.scrollTop(), o = b.scrollLeft(), b.css({ overflow: "hidden", padding: 0 }), P = b.innerWidth() + rb, Q = b.innerHeight(), b.width(P), O = a('<div class="jspPane" />').css("padding", qb).append(b.children()), R = a('<div class="jspContainer" />').css({ width: P + "px", height: Q + "px" }).append(O).appendTo(b); else { if (b.css("width", ""), p = N.stickToBottom && A(), q = N.stickToRight && B(), k = b.innerWidth() + rb != P || b.outerHeight() != Q, k && (P = b.innerWidth() + rb, Q = b.innerHeight(), R.css({ width: P + "px", height: Q + "px" })), !k && sb == S && O.outerHeight() == T) return void b.width(P); sb = S, O.css("width", ""), b.width(P), R.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end() } O.css("overflow", "auto"), S = c.contentWidth ? c.contentWidth : O[0].scrollWidth, T = O[0].scrollHeight, O.css("overflow", ""), U = S / P, V = T / Q, W = V > 1, X = U > 1, X || W ? (b.addClass("jspScrollable"), f = N.maintainPosition && ($ || bb), f && (h = y(), j = z()), e(), g(), i(), f && (w(q ? S - P : h, !1), v(p ? T - Q : j, !1)), F(), C(), L(), N.enableKeyboardNavigation && H(), N.clickOnTrack && m(), J(), N.hijackInternalLinks && K()) : (b.removeClass("jspScrollable"), O.css({ top: 0, left: 0, width: R.width() - rb }), D(), G(), I(), n()), N.autoReinitialise && !pb ? pb = setInterval(function () { d(N) }, N.autoReinitialiseDelay) : !N.autoReinitialise && pb && clearInterval(pb), l && b.scrollTop(0) && v(l, !1), o && b.scrollLeft(0) && w(o, !1), b.trigger("jsp-initialised", [X || W]) } function e() { W && (R.append(a('<div class="jspVerticalBar" />').append(a('<div class="jspCap jspCapTop" />'), a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'), a('<div class="jspDragBottom" />'))), a('<div class="jspCap jspCapBottom" />'))), cb = R.find(">.jspVerticalBar"), db = cb.find(">.jspTrack"), Y = db.find(">.jspDrag"), N.showArrows && (hb = a('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", k(0, -1)).bind("click.jsp", E), ib = a('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", k(0, 1)).bind("click.jsp", E), N.arrowScrollOnHover && (hb.bind("mouseover.jsp", k(0, -1, hb)), ib.bind("mouseover.jsp", k(0, 1, ib))), j(db, N.verticalArrowPositions, hb, ib)), fb = Q, R.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function () { fb -= a(this).outerHeight() }), Y.hover(function () { Y.addClass("jspHover") }, function () { Y.removeClass("jspHover") }).bind("mousedown.jsp", function (b) { a("html").bind("dragstart.jsp selectstart.jsp", E), Y.addClass("jspActive"); var c = b.pageY - Y.position().top; return a("html").bind("mousemove.jsp", function (a) { p(a.pageY - c, !1) }).bind("mouseup.jsp mouseleave.jsp", o), !1 }), f()) } function f() { db.height(fb + "px"), $ = 0, eb = N.verticalGutter + db.outerWidth(), O.width(P - eb - rb); try { 0 === cb.position().left && O.css("margin-left", eb + "px") } catch (a) { } } function g() { X && (R.append(a('<div class="jspHorizontalBar" />').append(a('<div class="jspCap jspCapLeft" />'), a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'), a('<div class="jspDragRight" />'))), a('<div class="jspCap jspCapRight" />'))), jb = R.find(">.jspHorizontalBar"), kb = jb.find(">.jspTrack"), _ = kb.find(">.jspDrag"), N.showArrows && (nb = a('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", k(-1, 0)).bind("click.jsp", E), ob = a('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", k(1, 0)).bind("click.jsp", E), N.arrowScrollOnHover && (nb.bind("mouseover.jsp", k(-1, 0, nb)), ob.bind("mouseover.jsp", k(1, 0, ob))), j(kb, N.horizontalArrowPositions, nb, ob)), _.hover(function () { _.addClass("jspHover") }, function () { _.removeClass("jspHover") }).bind("mousedown.jsp", function (b) { a("html").bind("dragstart.jsp selectstart.jsp", E), _.addClass("jspActive"); var c = b.pageX - _.position().left; return a("html").bind("mousemove.jsp", function (a) { r(a.pageX - c, !1) }).bind("mouseup.jsp mouseleave.jsp", o), !1 }), lb = R.innerWidth(), h()) } function h() { R.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function () { lb -= a(this).outerWidth() }), kb.width(lb + "px"), bb = 0 } function i() { if (X && W) { var b = kb.outerHeight(), c = db.outerWidth(); fb -= b, a(jb).find(">.jspCap:visible,>.jspArrow").each(function () { lb += a(this).outerWidth() }), lb -= c, Q -= c, P -= b, kb.parent().append(a('<div class="jspCorner" />').css("width", b + "px")), f(), h() } X && O.width(R.outerWidth() - rb + "px"), T = O.outerHeight(), V = T / Q, X && (mb = Math.ceil(1 / U * lb), mb > N.horizontalDragMaxWidth ? mb = N.horizontalDragMaxWidth : mb < N.horizontalDragMinWidth && (mb = N.horizontalDragMinWidth), _.width(mb + "px"), ab = lb - mb, s(bb)), W && (gb = Math.ceil(1 / V * fb), gb > N.verticalDragMaxHeight ? gb = N.verticalDragMaxHeight : gb < N.verticalDragMinHeight && (gb = N.verticalDragMinHeight), Y.height(gb + "px"), Z = fb - gb, q($)) } function j(a, b, c, d) { var e, f = "before", g = "after"; "os" == b && (b = /Mac/.test(navigator.platform) ? "after" : "split"), b == f ? g = b : b == g && (f = b, e = c, c = d, d = e), a[f](c)[g](d) } function k(a, b, c) { return function () { return l(a, b, this, c), this.blur(), !1 } } function l(b, c, d, e) { d = a(d).addClass("jspActive"); var f, g, h = !0, i = function () { 0 !== b && tb.scrollByX(b * N.arrowButtonSpeed), 0 !== c && tb.scrollByY(c * N.arrowButtonSpeed), g = setTimeout(i, h ? N.initialDelay : N.arrowRepeatFreq), h = !1 }; i(), f = e ? "mouseout.jsp" : "mouseup.jsp", e = e || a("html"), e.bind(f, function () { d.removeClass("jspActive"), g && clearTimeout(g), g = null, e.unbind(f) }) } function m() { n(), W && db.bind("mousedown.jsp", function (b) { if (void 0 === b.originalTarget || b.originalTarget == b.currentTarget) { var c, d = a(this), e = d.offset(), f = b.pageY - e.top - $, g = !0, h = function () { var a = d.offset(), e = b.pageY - a.top - gb / 2, j = Q * N.scrollPagePercent, k = Z * j / (T - Q); if (0 > f) $ - k > e ? tb.scrollByY(-j) : p(e); else { if (!(f > 0)) return void i(); e > $ + k ? tb.scrollByY(j) : p(e) } c = setTimeout(h, g ? N.initialDelay : N.trackClickRepeatFreq), g = !1 }, i = function () { c && clearTimeout(c), c = null, a(document).unbind("mouseup.jsp", i) }; return h(), a(document).bind("mouseup.jsp", i), !1 } }), X && kb.bind("mousedown.jsp", function (b) { if (void 0 === b.originalTarget || b.originalTarget == b.currentTarget) { var c, d = a(this), e = d.offset(), f = b.pageX - e.left - bb, g = !0, h = function () { var a = d.offset(), e = b.pageX - a.left - mb / 2, j = P * N.scrollPagePercent, k = ab * j / (S - P); if (0 > f) bb - k > e ? tb.scrollByX(-j) : r(e); else { if (!(f > 0)) return void i(); e > bb + k ? tb.scrollByX(j) : r(e) } c = setTimeout(h, g ? N.initialDelay : N.trackClickRepeatFreq), g = !1 }, i = function () { c && clearTimeout(c), c = null, a(document).unbind("mouseup.jsp", i) }; return h(), a(document).bind("mouseup.jsp", i), !1 } }) } function n() { kb && kb.unbind("mousedown.jsp"), db && db.unbind("mousedown.jsp") } function o() { a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"), Y && Y.removeClass("jspActive"), _ && _.removeClass("jspActive") } function p(c, d) { if (W) { 0 > c ? c = 0 : c > Z && (c = Z); var e = new a.Event("jsp-will-scroll-y"); if (b.trigger(e, [c]), !e.isDefaultPrevented()) { var f = c || 0, g = 0 === f, h = f == Z, i = c / Z, j = -i * (T - Q); void 0 === d && (d = N.animateScroll), d ? tb.animate(Y, "top", c, q, function () { b.trigger("jsp-user-scroll-y", [-j, g, h]) }) : (Y.css("top", c), q(c), b.trigger("jsp-user-scroll-y", [-j, g, h])) } } } function q(a) { void 0 === a && (a = Y.position().top), R.scrollTop(0), $ = a || 0; var c = 0 === $, d = $ == Z, e = a / Z, f = -e * (T - Q); (ub != c || wb != d) && (ub = c, wb = d, b.trigger("jsp-arrow-change", [ub, wb, vb, xb])), t(c, d), O.css("top", f), b.trigger("jsp-scroll-y", [-f, c, d]).trigger("scroll") } function r(c, d) { if (X) { 0 > c ? c = 0 : c > ab && (c = ab); var e = new a.Event("jsp-will-scroll-x"); if (b.trigger(e, [c]), !e.isDefaultPrevented()) { var f = c || 0, g = 0 === f, h = f == ab, i = c / ab, j = -i * (S - P); void 0 === d && (d = N.animateScroll), d ? tb.animate(_, "left", c, s, function () { b.trigger("jsp-user-scroll-x", [-j, g, h]) }) : (_.css("left", c), s(c), b.trigger("jsp-user-scroll-x", [-j, g, h])) } } } function s(a) { void 0 === a && (a = _.position().left), R.scrollTop(0), bb = a || 0; var c = 0 === bb, d = bb == ab, e = a / ab, f = -e * (S - P); (vb != c || xb != d) && (vb = c, xb = d, b.trigger("jsp-arrow-change", [ub, wb, vb, xb])), u(c, d), O.css("left", f), b.trigger("jsp-scroll-x", [-f, c, d]).trigger("scroll") } function t(a, b) { N.showArrows && (hb[a ? "addClass" : "removeClass"]("jspDisabled"), ib[b ? "addClass" : "removeClass"]("jspDisabled")) } function u(a, b) { N.showArrows && (nb[a ? "addClass" : "removeClass"]("jspDisabled"), ob[b ? "addClass" : "removeClass"]("jspDisabled")) } function v(a, b) { var c = a / (T - Q); p(c * Z, b) } function w(a, b) { var c = a / (S - P); r(c * ab, b) } function x(b, c, d) { var e, f, g, h, i, j, k, l, m, n = 0, o = 0; try { e = a(b) } catch (p) { return } for (f = e.outerHeight(), g = e.outerWidth(), R.scrollTop(0), R.scrollLeft(0) ; !e.is(".jspPane") ;) if (n += e.position().top, o += e.position().left, e = e.offsetParent(), /^body|html$/i.test(e[0].nodeName)) return; h = z(), j = h + Q, h > n || c ? l = n - N.horizontalGutter : n + f > j && (l = n - Q + f + N.horizontalGutter), isNaN(l) || v(l, d), i = y(), k = i + P, i > o || c ? m = o - N.horizontalGutter : o + g > k && (m = o - P + g + N.horizontalGutter), isNaN(m) || w(m, d) } function y() { return -O.position().left } function z() { return -O.position().top } function A() { var a = T - Q; return a > 20 && a - z() < 10 } function B() { var a = S - P; return a > 20 && a - y() < 10 } function C() { R.unbind(zb).bind(zb, function (a, b, c, d) { bb || (bb = 0), $ || ($ = 0); var e = bb, f = $, g = a.deltaFactor || N.mouseWheelSpeed; return tb.scrollBy(c * g, -d * g, !1), e == bb && f == $ }) } function D() { R.unbind(zb) } function E() { return !1 } function F() { O.find(":input,a").unbind("focus.jsp").bind("focus.jsp", function (a) { x(a.target, !1) }) } function G() { O.find(":input,a").unbind("focus.jsp") } function H() { function c() { var a = bb, b = $; switch (d) { case 40: tb.scrollByY(N.keyboardSpeed, !1); break; case 38: tb.scrollByY(-N.keyboardSpeed, !1); break; case 34: case 32: tb.scrollByY(Q * N.scrollPagePercent, !1); break; case 33: tb.scrollByY(-Q * N.scrollPagePercent, !1); break; case 39: tb.scrollByX(N.keyboardSpeed, !1); break; case 37: tb.scrollByX(-N.keyboardSpeed, !1) } return e = a != bb || b != $ } var d, e, f = []; X && f.push(jb[0]), W && f.push(cb[0]), O.bind("focus.jsp", function () { b.focus() }), b.attr("tabindex", 0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp", function (b) { if (b.target === this || f.length && a(b.target).closest(f).length) { var g = bb, h = $; switch (b.keyCode) { case 40: case 38: case 34: case 32: case 33: case 39: case 37: d = b.keyCode, c(); break; case 35: v(T - Q), d = null; break; case 36: v(0), d = null } return e = b.keyCode == d && g != bb || h != $, !e } }).bind("keypress.jsp", function (b) { return b.keyCode == d && c(), b.target === this || f.length && a(b.target).closest(f).length ? !e : void 0 }), N.hideFocus ? (b.css("outline", "none"), "hideFocus" in R[0] && b.attr("hideFocus", !0)) : (b.css("outline", ""), "hideFocus" in R[0] && b.attr("hideFocus", !1)) } function I() { b.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp"), O.unbind(".jsp") } function J() { if (location.hash && location.hash.length > 1) { var b, c, d = escape(location.hash.substr(1)); try { b = a("#" + d + ', a[name="' + d + '"]') } catch (e) { return } b.length && O.find(d) && (0 === R.scrollTop() ? c = setInterval(function () { R.scrollTop() > 0 && (x(b, !0), a(document).scrollTop(R.position().top), clearInterval(c)) }, 50) : (x(b, !0), a(document).scrollTop(R.position().top))) } } function K() { a(document.body).data("jspHijack") || (a(document.body).data("jspHijack", !0), a(document.body).delegate('a[href*="#"]', "click", function (b) { var c, d, e, f, g, h, i = this.href.substr(0, this.href.indexOf("#")), j = location.href; if (-1 !== location.href.indexOf("#") && (j = location.href.substr(0, location.href.indexOf("#"))), i === j) { c = escape(this.href.substr(this.href.indexOf("#") + 1)); try { d = a("#" + c + ', a[name="' + c + '"]') } catch (k) { return } d.length && (e = d.closest(".jspScrollable"), f = e.data("jsp"), f.scrollToElement(d, !0), e[0].scrollIntoView && (g = a(window).scrollTop(), h = d.offset().top, (g > h || h > g + a(window).height()) && e[0].scrollIntoView()), b.preventDefault()) } })) } function L() { var a, b, c, d, e, f = !1; R.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp", function (g) { var h = g.originalEvent.touches[0]; a = y(), b = z(), c = h.pageX, d = h.pageY, e = !1, f = !0 }).bind("touchmove.jsp", function (g) { if (f) { var h = g.originalEvent.touches[0], i = bb, j = $; return tb.scrollTo(a + c - h.pageX, b + d - h.pageY), e = e || Math.abs(c - h.pageX) > 5 || Math.abs(d - h.pageY) > 5, i == bb && j == $ } }).bind("touchend.jsp", function () { f = !1 }).bind("click.jsp-touchclick", function () { return e ? (e = !1, !1) : void 0 }) } function M() { var a = z(), c = y(); b.removeClass("jspScrollable").unbind(".jsp"), O.unbind(".jsp"), b.replaceWith(yb.append(O.children())), yb.scrollTop(a), yb.scrollLeft(c), pb && clearInterval(pb) } var N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, ab, bb, cb, db, eb, fb, gb, hb, ib, jb, kb, lb, mb, nb, ob, pb, qb, rb, sb, tb = this, ub = !0, vb = !0, wb = !1, xb = !1, yb = b.clone(!1, !1).empty(), zb = a.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp"; "border-box" === b.css("box-sizing") ? (qb = 0, rb = 0) : (qb = b.css("paddingTop") + " " + b.css("paddingRight") + " " + b.css("paddingBottom") + " " + b.css("paddingLeft"), rb = (parseInt(b.css("paddingLeft"), 10) || 0) + (parseInt(b.css("paddingRight"), 10) || 0)), a.extend(tb, { reinitialise: function (b) { b = a.extend({}, N, b), d(b) }, scrollToElement: function (a, b, c) { x(a, b, c) }, scrollTo: function (a, b, c) { w(a, c), v(b, c) }, scrollToX: function (a, b) { w(a, b) }, scrollToY: function (a, b) { v(a, b) }, scrollToPercentX: function (a, b) { w(a * (S - P), b) }, scrollToPercentY: function (a, b) { v(a * (T - Q), b) }, scrollBy: function (a, b, c) { tb.scrollByX(a, c), tb.scrollByY(b, c) }, scrollByX: function (a, b) { var c = y() + Math[0 > a ? "floor" : "ceil"](a), d = c / (S - P); r(d * ab, b) }, scrollByY: function (a, b) { var c = z() + Math[0 > a ? "floor" : "ceil"](a), d = c / (T - Q); p(d * Z, b) }, positionDragX: function (a, b) { r(a, b) }, positionDragY: function (a, b) { p(a, b) }, animate: function (a, b, c, d, e) { var f = {}; f[b] = c, a.animate(f, { duration: N.animateDuration, easing: N.animateEase, queue: !1, step: d, complete: e }) }, getContentPositionX: function () { return y() }, getContentPositionY: function () { return z() }, getContentWidth: function () { return S }, getContentHeight: function () { return T }, getPercentScrolledX: function () { return y() / (S - P) }, getPercentScrolledY: function () { return z() / (T - Q) }, getIsScrollableH: function () { return X }, getIsScrollableV: function () { return W }, getContentPane: function () { return O }, scrollToBottom: function (a) { p(Z, a) }, hijackInternalLinks: a.noop, destroy: function () { M() } }), d(c) } return b = a.extend({}, a.fn.jScrollPane.defaults, b), a.each(["arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function () { b[this] = b[this] || b.speed }), this.each(function () { var d = a(this), e = d.data("jsp"); e ? e.reinitialise(b) : (a("script", d).filter('[type="text/javascript"],:not([type])').remove(), e = new c(d, b), d.data("jsp", e)) }) }, a.fn.jScrollPane.defaults = { showArrows: !1, maintainPosition: !0, stickToBottom: !1, stickToRight: !1, clickOnTrack: !0, autoReinitialise: !1, autoReinitialiseDelay: 500, verticalDragMinHeight: 0, verticalDragMaxHeight: 99999, horizontalDragMinWidth: 0, horizontalDragMaxWidth: 99999, contentWidth: void 0, animateScroll: !1, animateDuration: 300, animateEase: "linear", hijackInternalLinks: !1, verticalGutter: 4, horizontalGutter: 4, mouseWheelSpeed: 3, arrowButtonSpeed: 0, arrowRepeatFreq: 50, arrowScrollOnHover: !1, trackClickSpeed: 0, trackClickRepeatFreq: 70, verticalArrowPositions: "split", horizontalArrowPositions: "split", enableKeyboardNavigation: !0, hideFocus: !1, keyboardSpeed: 0, initialDelay: 300, speed: 30, scrollPagePercent: .8 } });;
// http://stackoverflow.com/questions/2655925/how-to-apply-important-using-css

(function ($) {
    if ($.fn.style) {
        return;
    }

    // Escape regex chars with \
    var escape = function (text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    // For those who need them (< IE 9), add support for CSS functions
    var isStyleFuncSupported = !!CSSStyleDeclaration.prototype.getPropertyValue;
    if (!isStyleFuncSupported) {
        CSSStyleDeclaration.prototype.getPropertyValue = function (a) {
            return this.getAttribute(a);
        };
        CSSStyleDeclaration.prototype.setProperty = function (styleName, value, priority) {
            this.setAttribute(styleName, value);
            var priority = typeof priority != 'undefined' ? priority : '';
            if (priority != '') {
                // Add priority manually
                var rule = new RegExp(escape(styleName) + '\\s*:\\s*' + escape(value) +
                    '(\\s*;)?', 'gmi');
                this.cssText =
                    this.cssText.replace(rule, styleName + ': ' + value + ' !' + priority + ';');
            }
        };
        CSSStyleDeclaration.prototype.removeProperty = function (a) {
            return this.removeAttribute(a);
        };
        CSSStyleDeclaration.prototype.getPropertyPriority = function (styleName) {
            var rule = new RegExp(escape(styleName) + '\\s*:\\s*[^\\s]*\\s*!important(\\s*;)?',
                'gmi');
            return rule.test(this.cssText) ? 'important' : '';
        }
    }

    // The style function
    $.fn.style = function (styleName, value, priority) {
        // DOM node
        var node = this.get(0);
        // Ensure we have a DOM node
        if (typeof node == 'undefined') {
            return this;
        }
        // CSSStyleDeclaration
        var style = this.get(0).style;
        // Getter/Setter
        if (typeof styleName != 'undefined') {
            if (typeof value != 'undefined') {
                // Set style property
                priority = typeof priority != 'undefined' ? priority : '';
                style.setProperty(styleName, value, priority);
                return this;
            } else {
                // Get style property
                return style.getPropertyValue(styleName);
            }
        } else {
            // Get CSSStyleDeclaration
            return style;
        }
    };
})(jQuery);;
/*!
 * Materialize v0.97.7 (http://materializecss.com)
 * Copyright 2014-2015 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */
if("undefined"==typeof jQuery){var jQuery;jQuery="function"==typeof require?$=require("jquery"):$}jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return 0==b?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*(2*Math.PI)/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*(2*Math.PI)/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(2==(b/=e/2))return c+d;if(g||(g=e*(.3*1.5)),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return 1>b?-.5*(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*(2*Math.PI)/g))+c:h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*(2*Math.PI)/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),(b/=e/2)<1?d/2*(b*b*(((f*=1.525)+1)*b-f))+c:d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*(7.5625*b*b)+c:2/2.75>b?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:2.5/2.75>b?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(a,b,c,d,e){return e/2>b?.5*jQuery.easing.easeInBounce(a,2*b,0,d,e)+c:.5*jQuery.easing.easeOutBounce(a,2*b-e,0,d,e)+.5*d+c}}),jQuery.extend(jQuery.easing,{easeInOutMaterial:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:d/4*((b-=2)*b*b+2)+c}}),jQuery.Velocity?console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity."):(!function(a){function b(a){var b=a.length,d=c.type(a);return"function"===d||c.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===d||0===b||"number"==typeof b&&b>0&&b-1 in a}if(!a.jQuery){var c=function(a,b){return new c.fn.init(a,b)};c.isWindow=function(a){return null!=a&&a==a.window},c.type=function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?e[g.call(a)]||"object":typeof a},c.isArray=Array.isArray||function(a){return"array"===c.type(a)},c.isPlainObject=function(a){var b;if(!a||"object"!==c.type(a)||a.nodeType||c.isWindow(a))return!1;try{if(a.constructor&&!f.call(a,"constructor")&&!f.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(d){return!1}for(b in a);return void 0===b||f.call(a,b)},c.each=function(a,c,d){var e,f=0,g=a.length,h=b(a);if(d){if(h)for(;g>f&&(e=c.apply(a[f],d),e!==!1);f++);else for(f in a)if(e=c.apply(a[f],d),e===!1)break}else if(h)for(;g>f&&(e=c.call(a[f],f,a[f]),e!==!1);f++);else for(f in a)if(e=c.call(a[f],f,a[f]),e===!1)break;return a},c.data=function(a,b,e){if(void 0===e){var f=a[c.expando],g=f&&d[f];if(void 0===b)return g;if(g&&b in g)return g[b]}else if(void 0!==b){var f=a[c.expando]||(a[c.expando]=++c.uuid);return d[f]=d[f]||{},d[f][b]=e,e}},c.removeData=function(a,b){var e=a[c.expando],f=e&&d[e];f&&c.each(b,function(a,b){delete f[b]})},c.extend=function(){var a,b,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;for("boolean"==typeof h&&(k=h,h=arguments[i]||{},i++),"object"!=typeof h&&"function"!==c.type(h)&&(h={}),i===j&&(h=this,i--);j>i;i++)if(null!=(f=arguments[i]))for(e in f)a=h[e],d=f[e],h!==d&&(k&&d&&(c.isPlainObject(d)||(b=c.isArray(d)))?(b?(b=!1,g=a&&c.isArray(a)?a:[]):g=a&&c.isPlainObject(a)?a:{},h[e]=c.extend(k,g,d)):void 0!==d&&(h[e]=d));return h},c.queue=function(a,d,e){function f(a,c){var d=c||[];return null!=a&&(b(Object(a))?!function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;)a[e++]=b[d++];if(c!==c)for(;void 0!==b[d];)a[e++]=b[d++];return a.length=e,a}(d,"string"==typeof a?[a]:a):[].push.call(d,a)),d}if(a){d=(d||"fx")+"queue";var g=c.data(a,d);return e?(!g||c.isArray(e)?g=c.data(a,d,f(e)):g.push(e),g):g||[]}},c.dequeue=function(a,b){c.each(a.nodeType?[a]:a,function(a,d){b=b||"fx";var e=c.queue(d,b),f=e.shift();"inprogress"===f&&(f=e.shift()),f&&("fx"===b&&e.unshift("inprogress"),f.call(d,function(){c.dequeue(d,b)}))})},c.fn=c.prototype={init:function(a){if(a.nodeType)return this[0]=a,this;throw new Error("Not a DOM node.")},offset:function(){var b=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:b.top+(a.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:b.left+(a.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function a(){for(var a=this.offsetParent||document;a&&"html"===!a.nodeType.toLowerCase&&"static"===a.style.position;)a=a.offsetParent;return a||document}var b=this[0],a=a.apply(b),d=this.offset(),e=/^(?:body|html)$/i.test(a.nodeName)?{top:0,left:0}:c(a).offset();return d.top-=parseFloat(b.style.marginTop)||0,d.left-=parseFloat(b.style.marginLeft)||0,a.style&&(e.top+=parseFloat(a.style.borderTopWidth)||0,e.left+=parseFloat(a.style.borderLeftWidth)||0),{top:d.top-e.top,left:d.left-e.left}}};var d={};c.expando="velocity"+(new Date).getTime(),c.uuid=0;for(var e={},f=e.hasOwnProperty,g=e.toString,h="Boolean Number String Function Array Date RegExp Object Error".split(" "),i=0;i<h.length;i++)e["[object "+h[i]+"]"]=h[i].toLowerCase();c.fn.init.prototype=c.fn,a.Velocity={Utilities:c}}}(window),function(a){"object"==typeof module&&"object"==typeof module.exports?module.exports=a():"function"==typeof define&&define.amd?define(a):a()}(function(){return function(a,b,c,d){function e(a){for(var b=-1,c=a?a.length:0,d=[];++b<c;){var e=a[b];e&&d.push(e)}return d}function f(a){return p.isWrapped(a)?a=[].slice.call(a):p.isNode(a)&&(a=[a]),a}function g(a){var b=m.data(a,"velocity");return null===b?d:b}function h(a){return function(b){return Math.round(b*a)*(1/a)}}function i(a,c,d,e){function f(a,b){return 1-3*b+3*a}function g(a,b){return 3*b-6*a}function h(a){return 3*a}function i(a,b,c){return((f(b,c)*a+g(b,c))*a+h(b))*a}function j(a,b,c){return 3*f(b,c)*a*a+2*g(b,c)*a+h(b)}function k(b,c){for(var e=0;p>e;++e){var f=j(c,a,d);if(0===f)return c;var g=i(c,a,d)-b;c-=g/f}return c}function l(){for(var b=0;t>b;++b)x[b]=i(b*u,a,d)}function m(b,c,e){var f,g,h=0;do g=c+(e-c)/2,f=i(g,a,d)-b,f>0?e=g:c=g;while(Math.abs(f)>r&&++h<s);return g}function n(b){for(var c=0,e=1,f=t-1;e!=f&&x[e]<=b;++e)c+=u;--e;var g=(b-x[e])/(x[e+1]-x[e]),h=c+g*u,i=j(h,a,d);return i>=q?k(b,h):0==i?h:m(b,c,c+u)}function o(){y=!0,(a!=c||d!=e)&&l()}var p=4,q=.001,r=1e-7,s=10,t=11,u=1/(t-1),v="Float32Array"in b;if(4!==arguments.length)return!1;for(var w=0;4>w;++w)if("number"!=typeof arguments[w]||isNaN(arguments[w])||!isFinite(arguments[w]))return!1;a=Math.min(a,1),d=Math.min(d,1),a=Math.max(a,0),d=Math.max(d,0);var x=v?new Float32Array(t):new Array(t),y=!1,z=function(b){return y||o(),a===c&&d===e?b:0===b?0:1===b?1:i(n(b),c,e)};z.getControlPoints=function(){return[{x:a,y:c},{x:d,y:e}]};var A="generateBezier("+[a,c,d,e]+")";return z.toString=function(){return A},z}function j(a,b){var c=a;return p.isString(a)?t.Easings[a]||(c=!1):c=p.isArray(a)&&1===a.length?h.apply(null,a):p.isArray(a)&&2===a.length?u.apply(null,a.concat([b])):p.isArray(a)&&4===a.length?i.apply(null,a):!1,c===!1&&(c=t.Easings[t.defaults.easing]?t.defaults.easing:s),c}function k(a){if(a){var b=(new Date).getTime(),c=t.State.calls.length;c>1e4&&(t.State.calls=e(t.State.calls));for(var f=0;c>f;f++)if(t.State.calls[f]){var h=t.State.calls[f],i=h[0],j=h[2],n=h[3],o=!!n,q=null;n||(n=t.State.calls[f][3]=b-16);for(var r=Math.min((b-n)/j.duration,1),s=0,u=i.length;u>s;s++){var w=i[s],y=w.element;if(g(y)){var z=!1;if(j.display!==d&&null!==j.display&&"none"!==j.display){if("flex"===j.display){var A=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];m.each(A,function(a,b){v.setPropertyValue(y,"display",b)})}v.setPropertyValue(y,"display",j.display)}j.visibility!==d&&"hidden"!==j.visibility&&v.setPropertyValue(y,"visibility",j.visibility);for(var B in w)if("element"!==B){var C,D=w[B],E=p.isString(D.easing)?t.Easings[D.easing]:D.easing;if(1===r)C=D.endValue;else{var F=D.endValue-D.startValue;if(C=D.startValue+F*E(r,j,F),!o&&C===D.currentValue)continue}if(D.currentValue=C,"tween"===B)q=C;else{if(v.Hooks.registered[B]){var G=v.Hooks.getRoot(B),H=g(y).rootPropertyValueCache[G];H&&(D.rootPropertyValue=H)}var I=v.setPropertyValue(y,B,D.currentValue+(0===parseFloat(C)?"":D.unitType),D.rootPropertyValue,D.scrollData);v.Hooks.registered[B]&&(g(y).rootPropertyValueCache[G]=v.Normalizations.registered[G]?v.Normalizations.registered[G]("extract",null,I[1]):I[1]),"transform"===I[0]&&(z=!0)}}j.mobileHA&&g(y).transformCache.translate3d===d&&(g(y).transformCache.translate3d="(0px, 0px, 0px)",z=!0),z&&v.flushTransformCache(y)}}j.display!==d&&"none"!==j.display&&(t.State.calls[f][2].display=!1),j.visibility!==d&&"hidden"!==j.visibility&&(t.State.calls[f][2].visibility=!1),j.progress&&j.progress.call(h[1],h[1],r,Math.max(0,n+j.duration-b),n,q),1===r&&l(f)}}t.State.isTicking&&x(k)}function l(a,b){if(!t.State.calls[a])return!1;for(var c=t.State.calls[a][0],e=t.State.calls[a][1],f=t.State.calls[a][2],h=t.State.calls[a][4],i=!1,j=0,k=c.length;k>j;j++){var l=c[j].element;if(b||f.loop||("none"===f.display&&v.setPropertyValue(l,"display",f.display),"hidden"===f.visibility&&v.setPropertyValue(l,"visibility",f.visibility)),f.loop!==!0&&(m.queue(l)[1]===d||!/\.velocityQueueEntryFlag/i.test(m.queue(l)[1]))&&g(l)){g(l).isAnimating=!1,g(l).rootPropertyValueCache={};var n=!1;m.each(v.Lists.transforms3D,function(a,b){var c=/^scale/.test(b)?1:0,e=g(l).transformCache[b];g(l).transformCache[b]!==d&&new RegExp("^\\("+c+"[^.]").test(e)&&(n=!0,delete g(l).transformCache[b])}),f.mobileHA&&(n=!0,delete g(l).transformCache.translate3d),n&&v.flushTransformCache(l),v.Values.removeClass(l,"velocity-animating")}if(!b&&f.complete&&!f.loop&&j===k-1)try{f.complete.call(e,e)}catch(o){setTimeout(function(){throw o},1)}h&&f.loop!==!0&&h(e),g(l)&&f.loop===!0&&!b&&(m.each(g(l).tweensContainer,function(a,b){/^rotate/.test(a)&&360===parseFloat(b.endValue)&&(b.endValue=0,b.startValue=360),/^backgroundPosition/.test(a)&&100===parseFloat(b.endValue)&&"%"===b.unitType&&(b.endValue=0,b.startValue=100)}),t(l,"reverse",{loop:!0,delay:f.delay})),f.queue!==!1&&m.dequeue(l,f.queue)}t.State.calls[a]=!1;for(var p=0,q=t.State.calls.length;q>p;p++)if(t.State.calls[p]!==!1){i=!0;break}i===!1&&(t.State.isTicking=!1,delete t.State.calls,t.State.calls=[])}var m,n=function(){if(c.documentMode)return c.documentMode;for(var a=7;a>4;a--){var b=c.createElement("div");if(b.innerHTML="<!--[if IE "+a+"]><span></span><![endif]-->",b.getElementsByTagName("span").length)return b=null,a}return d}(),o=function(){var a=0;return b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||function(b){var c,d=(new Date).getTime();return c=Math.max(0,16-(d-a)),a=d+c,setTimeout(function(){b(d+c)},c)}}(),p={isString:function(a){return"string"==typeof a},isArray:Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},isFunction:function(a){return"[object Function]"===Object.prototype.toString.call(a)},isNode:function(a){return a&&a.nodeType},isNodeList:function(a){return"object"==typeof a&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a))&&a.length!==d&&(0===a.length||"object"==typeof a[0]&&a[0].nodeType>0)},isWrapped:function(a){return a&&(a.jquery||b.Zepto&&b.Zepto.zepto.isZ(a))},isSVG:function(a){return b.SVGElement&&a instanceof b.SVGElement},isEmptyObject:function(a){for(var b in a)return!1;return!0}},q=!1;if(a.fn&&a.fn.jquery?(m=a,q=!0):m=b.Velocity.Utilities,8>=n&&!q)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=n)return void(jQuery.fn.velocity=jQuery.fn.animate);var r=400,s="swing",t={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:b.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:c.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:m,Redirects:{},Easings:{},Promise:b.Promise,defaults:{queue:"",duration:r,easing:s,begin:d,complete:d,progress:d,display:d,visibility:d,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(a){m.data(a,"velocity",{isSVG:p.isSVG(a),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};b.pageYOffset!==d?(t.State.scrollAnchor=b,t.State.scrollPropertyLeft="pageXOffset",t.State.scrollPropertyTop="pageYOffset"):(t.State.scrollAnchor=c.documentElement||c.body.parentNode||c.body,t.State.scrollPropertyLeft="scrollLeft",t.State.scrollPropertyTop="scrollTop");var u=function(){function a(a){return-a.tension*a.x-a.friction*a.v}function b(b,c,d){var e={x:b.x+d.dx*c,v:b.v+d.dv*c,tension:b.tension,friction:b.friction};return{dx:e.v,dv:a(e)}}function c(c,d){var e={dx:c.v,dv:a(c)},f=b(c,.5*d,e),g=b(c,.5*d,f),h=b(c,d,g),i=1/6*(e.dx+2*(f.dx+g.dx)+h.dx),j=1/6*(e.dv+2*(f.dv+g.dv)+h.dv);return c.x=c.x+i*d,c.v=c.v+j*d,c}return function d(a,b,e){var f,g,h,i={x:-1,v:0,tension:null,friction:null},j=[0],k=0,l=1e-4,m=.016;for(a=parseFloat(a)||500,b=parseFloat(b)||20,e=e||null,i.tension=a,i.friction=b,f=null!==e,f?(k=d(a,b),g=k/e*m):g=m;h=c(h||i,g),j.push(1+h.x),k+=16,Math.abs(h.x)>l&&Math.abs(h.v)>l;);return f?function(a){return j[a*(j.length-1)|0]}:k}}();t.Easings={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},spring:function(a){return 1-Math.cos(4.5*a*Math.PI)*Math.exp(6*-a)}},m.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(a,b){t.Easings[b[0]]=i.apply(null,b[1])});var v=t.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var a=0;a<v.Lists.colors.length;a++){var b="color"===v.Lists.colors[a]?"0 0 0 1":"255 255 255 1";v.Hooks.templates[v.Lists.colors[a]]=["Red Green Blue Alpha",b]}var c,d,e;if(n)for(c in v.Hooks.templates){d=v.Hooks.templates[c],e=d[0].split(" ");var f=d[1].match(v.RegEx.valueSplit);"Color"===e[0]&&(e.push(e.shift()),f.push(f.shift()),v.Hooks.templates[c]=[e.join(" "),f.join(" ")])}for(c in v.Hooks.templates){d=v.Hooks.templates[c],e=d[0].split(" ");for(var a in e){var g=c+e[a],h=a;v.Hooks.registered[g]=[c,h]}}},getRoot:function(a){var b=v.Hooks.registered[a];return b?b[0]:a},cleanRootPropertyValue:function(a,b){return v.RegEx.valueUnwrap.test(b)&&(b=b.match(v.RegEx.valueUnwrap)[1]),v.Values.isCSSNullValue(b)&&(b=v.Hooks.templates[a][1]),b},extractValue:function(a,b){var c=v.Hooks.registered[a];if(c){var d=c[0],e=c[1];return b=v.Hooks.cleanRootPropertyValue(d,b),b.toString().match(v.RegEx.valueSplit)[e]}return b},injectValue:function(a,b,c){var d=v.Hooks.registered[a];if(d){var e,f,g=d[0],h=d[1];return c=v.Hooks.cleanRootPropertyValue(g,c),e=c.toString().match(v.RegEx.valueSplit),e[h]=b,f=e.join(" ")}return c}},Normalizations:{registered:{clip:function(a,b,c){switch(a){case"name":return"clip";case"extract":var d;return v.RegEx.wrappedValueAlreadyExtracted.test(c)?d=c:(d=c.toString().match(v.RegEx.valueUnwrap),d=d?d[1].replace(/,(\s+)?/g," "):c),d;case"inject":return"rect("+c+")"}},blur:function(a,b,c){switch(a){case"name":return t.State.isFirefox?"filter":"-webkit-filter";case"extract":var d=parseFloat(c);if(!d&&0!==d){var e=c.toString().match(/blur\(([0-9]+[A-z]+)\)/i);d=e?e[1]:0}return d;case"inject":return parseFloat(c)?"blur("+c+")":"none"}},opacity:function(a,b,c){if(8>=n)switch(a){case"name":return"filter";case"extract":var d=c.toString().match(/alpha\(opacity=(.*)\)/i);return c=d?d[1]/100:1;case"inject":return b.style.zoom=1,parseFloat(c)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(c),10)+")"}else switch(a){case"name":return"opacity";case"extract":return c;case"inject":return c}}},register:function(){9>=n||t.State.isGingerbread||(v.Lists.transformsBase=v.Lists.transformsBase.concat(v.Lists.transforms3D));for(var a=0;a<v.Lists.transformsBase.length;a++)!function(){var b=v.Lists.transformsBase[a];v.Normalizations.registered[b]=function(a,c,e){switch(a){case"name":return"transform";case"extract":return g(c)===d||g(c).transformCache[b]===d?/^scale/i.test(b)?1:0:g(c).transformCache[b].replace(/[()]/g,"");case"inject":var f=!1;switch(b.substr(0,b.length-1)){case"translate":f=!/(%|px|em|rem|vw|vh|\d)$/i.test(e);break;case"scal":case"scale":t.State.isAndroid&&g(c).transformCache[b]===d&&1>e&&(e=1),f=!/(\d)$/i.test(e);break;case"skew":f=!/(deg|\d)$/i.test(e);break;case"rotate":f=!/(deg|\d)$/i.test(e)}return f||(g(c).transformCache[b]="("+e+")"),g(c).transformCache[b]}}}();for(var a=0;a<v.Lists.colors.length;a++)!function(){var b=v.Lists.colors[a];v.Normalizations.registered[b]=function(a,c,e){switch(a){case"name":return b;case"extract":var f;if(v.RegEx.wrappedValueAlreadyExtracted.test(e))f=e;else{var g,h={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(e)?g=h[e]!==d?h[e]:h.black:v.RegEx.isHex.test(e)?g="rgb("+v.Values.hexToRgb(e).join(" ")+")":/^rgba?\(/i.test(e)||(g=h.black),f=(g||e).toString().match(v.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=n||3!==f.split(" ").length||(f+=" 1"),f;case"inject":return 8>=n?4===e.split(" ").length&&(e=e.split(/\s+/).slice(0,3).join(" ")):3===e.split(" ").length&&(e+=" 1"),(8>=n?"rgb":"rgba")+"("+e.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(a){return a.replace(/-(\w)/g,function(a,b){return b.toUpperCase()})},SVGAttribute:function(a){var b="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(n||t.State.isAndroid&&!t.State.isChrome)&&(b+="|transform"),new RegExp("^("+b+")$","i").test(a)},prefixCheck:function(a){if(t.State.prefixMatches[a])return[t.State.prefixMatches[a],!0];for(var b=["","Webkit","Moz","ms","O"],c=0,d=b.length;d>c;c++){var e;if(e=0===c?a:b[c]+a.replace(/^\w/,function(a){return a.toUpperCase()}),p.isString(t.State.prefixElement.style[e]))return t.State.prefixMatches[a]=e,[e,!0]}return[a,!1]}},Values:{hexToRgb:function(a){var b,c=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,d=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return a=a.replace(c,function(a,b,c,d){return b+b+c+c+d+d}),b=d.exec(a),b?[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16)]:[0,0,0]},isCSSNullValue:function(a){return 0==a||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a)},getUnitType:function(a){return/^(rotate|skew)/i.test(a)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a)?"":"px"},getDisplayType:function(a){var b=a&&a.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b)?"inline":/^(li)$/i.test(b)?"list-item":/^(tr)$/i.test(b)?"table-row":/^(table)$/i.test(b)?"table":/^(tbody)$/i.test(b)?"table-row-group":"block"},addClass:function(a,b){a.classList?a.classList.add(b):a.className+=(a.className.length?" ":"")+b},removeClass:function(a,b){a.classList?a.classList.remove(b):a.className=a.className.toString().replace(new RegExp("(^|\\s)"+b.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(a,c,e,f){function h(a,c){function e(){j&&v.setPropertyValue(a,"display","none")}var i=0;if(8>=n)i=m.css(a,c);else{var j=!1;if(/^(width|height)$/.test(c)&&0===v.getPropertyValue(a,"display")&&(j=!0,v.setPropertyValue(a,"display",v.Values.getDisplayType(a))),!f){if("height"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var k=a.offsetHeight-(parseFloat(v.getPropertyValue(a,"borderTopWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderBottomWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingTop"))||0)-(parseFloat(v.getPropertyValue(a,"paddingBottom"))||0);return e(),k}if("width"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var l=a.offsetWidth-(parseFloat(v.getPropertyValue(a,"borderLeftWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderRightWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingLeft"))||0)-(parseFloat(v.getPropertyValue(a,"paddingRight"))||0);return e(),l}}var o;o=g(a)===d?b.getComputedStyle(a,null):g(a).computedStyle?g(a).computedStyle:g(a).computedStyle=b.getComputedStyle(a,null),"borderColor"===c&&(c="borderTopColor"),i=9===n&&"filter"===c?o.getPropertyValue(c):o[c],(""===i||null===i)&&(i=a.style[c]),e()}if("auto"===i&&/^(top|right|bottom|left)$/i.test(c)){var p=h(a,"position");("fixed"===p||"absolute"===p&&/top|left/i.test(c))&&(i=m(a).position()[c]+"px")}return i}var i;if(v.Hooks.registered[c]){var j=c,k=v.Hooks.getRoot(j);e===d&&(e=v.getPropertyValue(a,v.Names.prefixCheck(k)[0])),v.Normalizations.registered[k]&&(e=v.Normalizations.registered[k]("extract",a,e)),i=v.Hooks.extractValue(j,e)}else if(v.Normalizations.registered[c]){var l,o;l=v.Normalizations.registered[c]("name",a),"transform"!==l&&(o=h(a,v.Names.prefixCheck(l)[0]),v.Values.isCSSNullValue(o)&&v.Hooks.templates[c]&&(o=v.Hooks.templates[c][1])),i=v.Normalizations.registered[c]("extract",a,o)}if(!/^[\d-]/.test(i))if(g(a)&&g(a).isSVG&&v.Names.SVGAttribute(c))if(/^(height|width)$/i.test(c))try{i=a.getBBox()[c]}catch(p){i=0}else i=a.getAttribute(c);else i=h(a,v.Names.prefixCheck(c)[0]);return v.Values.isCSSNullValue(i)&&(i=0),t.debug>=2&&console.log("Get "+c+": "+i),i},setPropertyValue:function(a,c,d,e,f){var h=c;if("scroll"===c)f.container?f.container["scroll"+f.direction]=d:"Left"===f.direction?b.scrollTo(d,f.alternateValue):b.scrollTo(f.alternateValue,d);else if(v.Normalizations.registered[c]&&"transform"===v.Normalizations.registered[c]("name",a))v.Normalizations.registered[c]("inject",a,d),h="transform",d=g(a).transformCache[c];else{if(v.Hooks.registered[c]){var i=c,j=v.Hooks.getRoot(c);e=e||v.getPropertyValue(a,j),d=v.Hooks.injectValue(i,d,e),c=j}if(v.Normalizations.registered[c]&&(d=v.Normalizations.registered[c]("inject",a,d),c=v.Normalizations.registered[c]("name",a)),h=v.Names.prefixCheck(c)[0],8>=n)try{a.style[h]=d}catch(k){t.debug&&console.log("Browser does not support ["+d+"] for ["+h+"]")}else g(a)&&g(a).isSVG&&v.Names.SVGAttribute(c)?a.setAttribute(c,d):a.style[h]=d;t.debug>=2&&console.log("Set "+c+" ("+h+"): "+d)}return[h,d]},flushTransformCache:function(a){function b(b){return parseFloat(v.getPropertyValue(a,b))}var c="";if((n||t.State.isAndroid&&!t.State.isChrome)&&g(a).isSVG){var d={translate:[b("translateX"),b("translateY")],skewX:[b("skewX")],skewY:[b("skewY")],scale:1!==b("scale")?[b("scale"),b("scale")]:[b("scaleX"),b("scaleY")],rotate:[b("rotateZ"),0,0]};m.each(g(a).transformCache,function(a){/^translate/i.test(a)?a="translate":/^scale/i.test(a)?a="scale":/^rotate/i.test(a)&&(a="rotate"),d[a]&&(c+=a+"("+d[a].join(" ")+") ",delete d[a])})}else{var e,f;m.each(g(a).transformCache,function(b){return e=g(a).transformCache[b],"transformPerspective"===b?(f=e,!0):(9===n&&"rotateZ"===b&&(b="rotate"),void(c+=b+e+" "))}),f&&(c="perspective"+f+" "+c)}v.setPropertyValue(a,"transform",c)}};v.Hooks.register(),v.Normalizations.register(),t.hook=function(a,b,c){var e=d;return a=f(a),m.each(a,function(a,f){if(g(f)===d&&t.init(f),c===d)e===d&&(e=t.CSS.getPropertyValue(f,b));else{var h=t.CSS.setPropertyValue(f,b,c);"transform"===h[0]&&t.CSS.flushTransformCache(f),e=h}}),e};var w=function(){function a(){return h?B.promise||null:i}function e(){function a(a){function l(a,b){var c=d,e=d,g=d;return p.isArray(a)?(c=a[0],!p.isArray(a[1])&&/^[\d-]/.test(a[1])||p.isFunction(a[1])||v.RegEx.isHex.test(a[1])?g=a[1]:(p.isString(a[1])&&!v.RegEx.isHex.test(a[1])||p.isArray(a[1]))&&(e=b?a[1]:j(a[1],h.duration),a[2]!==d&&(g=a[2]))):c=a,b||(e=e||h.easing),p.isFunction(c)&&(c=c.call(f,y,x)),p.isFunction(g)&&(g=g.call(f,y,x)),[c||0,e,g]}function n(a,b){var c,d;return d=(b||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(a){return c=a,""}),c||(c=v.Values.getUnitType(a)),[d,c]}function r(){var a={myParent:f.parentNode||c.body,position:v.getPropertyValue(f,"position"),fontSize:v.getPropertyValue(f,"fontSize")},d=a.position===I.lastPosition&&a.myParent===I.lastParent,e=a.fontSize===I.lastFontSize;I.lastParent=a.myParent,I.lastPosition=a.position,I.lastFontSize=a.fontSize;var h=100,i={};if(e&&d)i.emToPx=I.lastEmToPx,i.percentToPxWidth=I.lastPercentToPxWidth,i.percentToPxHeight=I.lastPercentToPxHeight;else{var j=g(f).isSVG?c.createElementNS("http://www.w3.org/2000/svg","rect"):c.createElement("div");t.init(j),a.myParent.appendChild(j),m.each(["overflow","overflowX","overflowY"],function(a,b){t.CSS.setPropertyValue(j,b,"hidden")}),t.CSS.setPropertyValue(j,"position",a.position),t.CSS.setPropertyValue(j,"fontSize",a.fontSize),t.CSS.setPropertyValue(j,"boxSizing","content-box"),m.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(a,b){t.CSS.setPropertyValue(j,b,h+"%")}),t.CSS.setPropertyValue(j,"paddingLeft",h+"em"),i.percentToPxWidth=I.lastPercentToPxWidth=(parseFloat(v.getPropertyValue(j,"width",null,!0))||1)/h,i.percentToPxHeight=I.lastPercentToPxHeight=(parseFloat(v.getPropertyValue(j,"height",null,!0))||1)/h,i.emToPx=I.lastEmToPx=(parseFloat(v.getPropertyValue(j,"paddingLeft"))||1)/h,a.myParent.removeChild(j)}return null===I.remToPx&&(I.remToPx=parseFloat(v.getPropertyValue(c.body,"fontSize"))||16),null===I.vwToPx&&(I.vwToPx=parseFloat(b.innerWidth)/100,I.vhToPx=parseFloat(b.innerHeight)/100),i.remToPx=I.remToPx,i.vwToPx=I.vwToPx,i.vhToPx=I.vhToPx,t.debug>=1&&console.log("Unit ratios: "+JSON.stringify(i),f),i}if(h.begin&&0===y)try{h.begin.call(o,o)}catch(u){setTimeout(function(){throw u},1)}if("scroll"===C){var w,z,A,D=/^x$/i.test(h.axis)?"Left":"Top",E=parseFloat(h.offset)||0;h.container?p.isWrapped(h.container)||p.isNode(h.container)?(h.container=h.container[0]||h.container,w=h.container["scroll"+D],A=w+m(f).position()[D.toLowerCase()]+E):h.container=null:(w=t.State.scrollAnchor[t.State["scrollProperty"+D]],z=t.State.scrollAnchor[t.State["scrollProperty"+("Left"===D?"Top":"Left")]],A=m(f).offset()[D.toLowerCase()]+E),i={scroll:{rootPropertyValue:!1,startValue:w,currentValue:w,endValue:A,unitType:"",easing:h.easing,scrollData:{container:h.container,direction:D,alternateValue:z}},element:f},t.debug&&console.log("tweensContainer (scroll): ",i.scroll,f)}else if("reverse"===C){if(!g(f).tweensContainer)return void m.dequeue(f,h.queue);"none"===g(f).opts.display&&(g(f).opts.display="auto"),"hidden"===g(f).opts.visibility&&(g(f).opts.visibility="visible"),g(f).opts.loop=!1,g(f).opts.begin=null,g(f).opts.complete=null,s.easing||delete h.easing,s.duration||delete h.duration,h=m.extend({},g(f).opts,h);var F=m.extend(!0,{},g(f).tweensContainer);for(var G in F)if("element"!==G){var H=F[G].startValue;F[G].startValue=F[G].currentValue=F[G].endValue,F[G].endValue=H,p.isEmptyObject(s)||(F[G].easing=h.easing),t.debug&&console.log("reverse tweensContainer ("+G+"): "+JSON.stringify(F[G]),f)}i=F}else if("start"===C){var F;g(f).tweensContainer&&g(f).isAnimating===!0&&(F=g(f).tweensContainer),m.each(q,function(a,b){if(RegExp("^"+v.Lists.colors.join("$|^")+"$").test(a)){var c=l(b,!0),e=c[0],f=c[1],g=c[2];if(v.RegEx.isHex.test(e)){for(var h=["Red","Green","Blue"],i=v.Values.hexToRgb(e),j=g?v.Values.hexToRgb(g):d,k=0;k<h.length;k++){var m=[i[k]];f&&m.push(f),j!==d&&m.push(j[k]),q[a+h[k]]=m}delete q[a]}}});for(var K in q){var L=l(q[K]),M=L[0],N=L[1],O=L[2];K=v.Names.camelCase(K);var P=v.Hooks.getRoot(K),Q=!1;if(g(f).isSVG||"tween"===P||v.Names.prefixCheck(P)[1]!==!1||v.Normalizations.registered[P]!==d){(h.display!==d&&null!==h.display&&"none"!==h.display||h.visibility!==d&&"hidden"!==h.visibility)&&/opacity|filter/.test(K)&&!O&&0!==M&&(O=0),h._cacheValues&&F&&F[K]?(O===d&&(O=F[K].endValue+F[K].unitType),Q=g(f).rootPropertyValueCache[P]):v.Hooks.registered[K]?O===d?(Q=v.getPropertyValue(f,P),O=v.getPropertyValue(f,K,Q)):Q=v.Hooks.templates[P][1]:O===d&&(O=v.getPropertyValue(f,K));var R,S,T,U=!1;if(R=n(K,O),O=R[0],T=R[1],R=n(K,M),M=R[0].replace(/^([+-\/*])=/,function(a,b){return U=b,""}),S=R[1],O=parseFloat(O)||0,M=parseFloat(M)||0,"%"===S&&(/^(fontSize|lineHeight)$/.test(K)?(M/=100,S="em"):/^scale/.test(K)?(M/=100,S=""):/(Red|Green|Blue)$/i.test(K)&&(M=M/100*255,S="")),/[\/*]/.test(U))S=T;else if(T!==S&&0!==O)if(0===M)S=T;else{e=e||r();var V=/margin|padding|left|right|width|text|word|letter/i.test(K)||/X$/.test(K)||"x"===K?"x":"y";
switch(T){case"%":O*="x"===V?e.percentToPxWidth:e.percentToPxHeight;break;case"px":break;default:O*=e[T+"ToPx"]}switch(S){case"%":O*=1/("x"===V?e.percentToPxWidth:e.percentToPxHeight);break;case"px":break;default:O*=1/e[S+"ToPx"]}}switch(U){case"+":M=O+M;break;case"-":M=O-M;break;case"*":M=O*M;break;case"/":M=O/M}i[K]={rootPropertyValue:Q,startValue:O,currentValue:O,endValue:M,unitType:S,easing:N},t.debug&&console.log("tweensContainer ("+K+"): "+JSON.stringify(i[K]),f)}else t.debug&&console.log("Skipping ["+P+"] due to a lack of browser support.")}i.element=f}i.element&&(v.Values.addClass(f,"velocity-animating"),J.push(i),""===h.queue&&(g(f).tweensContainer=i,g(f).opts=h),g(f).isAnimating=!0,y===x-1?(t.State.calls.push([J,o,h,null,B.resolver]),t.State.isTicking===!1&&(t.State.isTicking=!0,k())):y++)}var e,f=this,h=m.extend({},t.defaults,s),i={};switch(g(f)===d&&t.init(f),parseFloat(h.delay)&&h.queue!==!1&&m.queue(f,h.queue,function(a){t.velocityQueueEntryFlag=!0,g(f).delayTimer={setTimeout:setTimeout(a,parseFloat(h.delay)),next:a}}),h.duration.toString().toLowerCase()){case"fast":h.duration=200;break;case"normal":h.duration=r;break;case"slow":h.duration=600;break;default:h.duration=parseFloat(h.duration)||1}t.mock!==!1&&(t.mock===!0?h.duration=h.delay=1:(h.duration*=parseFloat(t.mock)||1,h.delay*=parseFloat(t.mock)||1)),h.easing=j(h.easing,h.duration),h.begin&&!p.isFunction(h.begin)&&(h.begin=null),h.progress&&!p.isFunction(h.progress)&&(h.progress=null),h.complete&&!p.isFunction(h.complete)&&(h.complete=null),h.display!==d&&null!==h.display&&(h.display=h.display.toString().toLowerCase(),"auto"===h.display&&(h.display=t.CSS.Values.getDisplayType(f))),h.visibility!==d&&null!==h.visibility&&(h.visibility=h.visibility.toString().toLowerCase()),h.mobileHA=h.mobileHA&&t.State.isMobile&&!t.State.isGingerbread,h.queue===!1?h.delay?setTimeout(a,h.delay):a():m.queue(f,h.queue,function(b,c){return c===!0?(B.promise&&B.resolver(o),!0):(t.velocityQueueEntryFlag=!0,void a(b))}),""!==h.queue&&"fx"!==h.queue||"inprogress"===m.queue(f)[0]||m.dequeue(f)}var h,i,n,o,q,s,u=arguments[0]&&(arguments[0].p||m.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||p.isString(arguments[0].properties));if(p.isWrapped(this)?(h=!1,n=0,o=this,i=this):(h=!0,n=1,o=u?arguments[0].elements||arguments[0].e:arguments[0]),o=f(o)){u?(q=arguments[0].properties||arguments[0].p,s=arguments[0].options||arguments[0].o):(q=arguments[n],s=arguments[n+1]);var x=o.length,y=0;if(!/^(stop|finish)$/i.test(q)&&!m.isPlainObject(s)){var z=n+1;s={};for(var A=z;A<arguments.length;A++)p.isArray(arguments[A])||!/^(fast|normal|slow)$/i.test(arguments[A])&&!/^\d/.test(arguments[A])?p.isString(arguments[A])||p.isArray(arguments[A])?s.easing=arguments[A]:p.isFunction(arguments[A])&&(s.complete=arguments[A]):s.duration=arguments[A]}var B={promise:null,resolver:null,rejecter:null};h&&t.Promise&&(B.promise=new t.Promise(function(a,b){B.resolver=a,B.rejecter=b}));var C;switch(q){case"scroll":C="scroll";break;case"reverse":C="reverse";break;case"finish":case"stop":m.each(o,function(a,b){g(b)&&g(b).delayTimer&&(clearTimeout(g(b).delayTimer.setTimeout),g(b).delayTimer.next&&g(b).delayTimer.next(),delete g(b).delayTimer)});var D=[];return m.each(t.State.calls,function(a,b){b&&m.each(b[1],function(c,e){var f=s===d?"":s;return f===!0||b[2].queue===f||s===d&&b[2].queue===!1?void m.each(o,function(c,d){d===e&&((s===!0||p.isString(s))&&(m.each(m.queue(d,p.isString(s)?s:""),function(a,b){p.isFunction(b)&&b(null,!0)}),m.queue(d,p.isString(s)?s:"",[])),"stop"===q?(g(d)&&g(d).tweensContainer&&f!==!1&&m.each(g(d).tweensContainer,function(a,b){b.endValue=b.currentValue}),D.push(a)):"finish"===q&&(b[2].duration=1))}):!0})}),"stop"===q&&(m.each(D,function(a,b){l(b,!0)}),B.promise&&B.resolver(o)),a();default:if(!m.isPlainObject(q)||p.isEmptyObject(q)){if(p.isString(q)&&t.Redirects[q]){var E=m.extend({},s),F=E.duration,G=E.delay||0;return E.backwards===!0&&(o=m.extend(!0,[],o).reverse()),m.each(o,function(a,b){parseFloat(E.stagger)?E.delay=G+parseFloat(E.stagger)*a:p.isFunction(E.stagger)&&(E.delay=G+E.stagger.call(b,a,x)),E.drag&&(E.duration=parseFloat(F)||(/^(callout|transition)/.test(q)?1e3:r),E.duration=Math.max(E.duration*(E.backwards?1-a/x:(a+1)/x),.75*E.duration,200)),t.Redirects[q].call(b,b,E||{},a,x,o,B.promise?B:d)}),a()}var H="Velocity: First argument ("+q+") was not a property map, a known action, or a registered redirect. Aborting.";return B.promise?B.rejecter(new Error(H)):console.log(H),a()}C="start"}var I={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},J=[];m.each(o,function(a,b){p.isNode(b)&&e.call(b)});var K,E=m.extend({},t.defaults,s);if(E.loop=parseInt(E.loop),K=2*E.loop-1,E.loop)for(var L=0;K>L;L++){var M={delay:E.delay,progress:E.progress};L===K-1&&(M.display=E.display,M.visibility=E.visibility,M.complete=E.complete),w(o,"reverse",M)}return a()}};t=m.extend(w,t),t.animate=w;var x=b.requestAnimationFrame||o;return t.State.isMobile||c.hidden===d||c.addEventListener("visibilitychange",function(){c.hidden?(x=function(a){return setTimeout(function(){a(!0)},16)},k()):x=b.requestAnimationFrame||o}),a.Velocity=t,a!==b&&(a.fn.velocity=w,a.fn.velocity.defaults=t.defaults),m.each(["Down","Up"],function(a,b){t.Redirects["slide"+b]=function(a,c,e,f,g,h){var i=m.extend({},c),j=i.begin,k=i.complete,l={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},n={};i.display===d&&(i.display="Down"===b?"inline"===t.CSS.Values.getDisplayType(a)?"inline-block":"block":"none"),i.begin=function(){j&&j.call(g,g);for(var c in l){n[c]=a.style[c];var d=t.CSS.getPropertyValue(a,c);l[c]="Down"===b?[d,0]:[0,d]}n.overflow=a.style.overflow,a.style.overflow="hidden"},i.complete=function(){for(var b in n)a.style[b]=n[b];k&&k.call(g,g),h&&h.resolver(g)},t(a,l,i)}}),m.each(["In","Out"],function(a,b){t.Redirects["fade"+b]=function(a,c,e,f,g,h){var i=m.extend({},c),j={opacity:"In"===b?1:0},k=i.complete;i.complete=e!==f-1?i.begin=null:function(){k&&k.call(g,g),h&&h.resolver(g)},i.display===d&&(i.display="In"===b?"auto":"none"),t(this,j,i)}}),t}(window.jQuery||window.Zepto||window,window,document)})),!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==ka?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ia.length;){if(c=ia[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return oa++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:ra?N:sa?Q:qa?S:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&ya&&0===d-e,g=b&(Aa|Ba)&&0===d-e;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=na(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===ya||f.eventType===Aa)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ba&&(i>xa||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=ma(l.x)>ma(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:la(a.pointers[c].clientX),clientY:la(a.pointers[c].clientY)},c++;return{timeStamp:na(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:la(a[0].clientX),y:la(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:la(c/b),y:la(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Ca:ma(a)>=ma(b)?a>0?Da:Ea:b>0?Fa:Ga}function I(a,b,c){c||(c=Ka);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Ka);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],La)-J(a[1],a[0],La)}function L(a,b){return I(b[0],b[1],La)/I(a[0],a[1],La)}function M(){this.evEl=Na,this.evWin=Oa,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Ra,this.evWin=Sa,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Ua,this.evWin=Va,this.started=!1,y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Aa|Ba)&&(c=u(c.concat(d),"identifier",!0)),[c,d]}function Q(){this.evTarget=Xa,this.targetIds={},y.apply(this,arguments)}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(ya|za)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i)}),b===ya)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Aa|Ba)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a)}function T(a,b){this.manager=a,this.set(b)}function U(a){if(q(a,bb))return bb;var b=q(a,cb),c=q(a,db);return b&&c?cb+" "+db:b||c?b?cb:db:q(a,ab)?ab:_a}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=eb,this.simultaneous={},this.requireFail=[]}function W(a){return a&jb?"cancel":a&hb?"end":a&gb?"move":a&fb?"start":""}function X(a){return a==Ga?"down":a==Fa?"up":a==Da?"left":a==Ea?"right":""}function Y(a,b){var c=b.manager;return c?c.get(a):a}function Z(){V.apply(this,arguments)}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null}function _(){Z.apply(this,arguments)}function aa(){V.apply(this,arguments),this._timer=null,this._input=null}function ba(){Z.apply(this,arguments)}function ca(){Z.apply(this,arguments)}function da(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ea(a,b){return b=b||{},b.recognizers=m(b.recognizers,ea.defaults.preset),new fa(a,b)}function fa(a,b){b=b||{},this.options=i(b,ea.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),ga(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ga(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function ha(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ia=["","webkit","moz","MS","ms","o"],ja=b.createElement("div"),ka="function",la=Math.round,ma=Math.abs,na=Date.now,oa=1,pa=/mobile|tablet|ip(ad|hone|od)|android/i,qa="ontouchstart"in a,ra=v(a,"PointerEvent")!==d,sa=qa&&pa.test(navigator.userAgent),ta="touch",ua="pen",va="mouse",wa="kinect",xa=25,ya=1,za=2,Aa=4,Ba=8,Ca=1,Da=2,Ea=4,Fa=8,Ga=16,Ha=Da|Ea,Ia=Fa|Ga,Ja=Ha|Ia,Ka=["x","y"],La=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Ma={mousedown:ya,mousemove:za,mouseup:Aa},Na="mousedown",Oa="mousemove mouseup";j(M,y,{handler:function(a){var b=Ma[a.type];b&ya&&0===a.button&&(this.pressed=!0),b&za&&1!==a.which&&(b=Aa),this.pressed&&this.allow&&(b&Aa&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:va,srcEvent:a}))}});var Pa={pointerdown:ya,pointermove:za,pointerup:Aa,pointercancel:Ba,pointerout:Ba},Qa={2:ta,3:ua,4:va,5:wa},Ra="pointerdown",Sa="pointermove pointerup pointercancel";a.MSPointerEvent&&(Ra="MSPointerDown",Sa="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pa[d],f=Qa[a.pointerType]||a.pointerType,g=f==ta,h=s(b,a.pointerId,"pointerId");e&ya&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Aa|Ba)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Ta={touchstart:ya,touchmove:za,touchend:Aa,touchcancel:Ba},Ua="touchstart",Va="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Ta[a.type];if(b===ya&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Aa|Ba)&&0===c[0].length-c[1].length&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:ta,srcEvent:a})}}});var Wa={touchstart:ya,touchmove:za,touchend:Aa,touchcancel:Ba},Xa="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function(a){var b=Wa[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:ta,srcEvent:a})}}),j(S,y,{handler:function(a,b,c){var d=c.pointerType==ta,e=c.pointerType==va;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Aa|Ba)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Ya=v(ja.style,"touchAction"),Za=Ya!==d,$a="compute",_a="auto",ab="manipulation",bb="none",cb="pan-x",db="pan-y";T.prototype={set:function(a){a==$a&&(a=this.compute()),Za&&(this.manager.element.style[Ya]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),U(a.join(" "))},preventDefaults:function(a){if(!Za){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bb),f=q(d,db),g=q(d,cb);return e||f&&c&Ha||g&&c&Ia?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var eb=1,fb=2,gb=4,hb=8,ib=hb,jb=16,kb=32;V.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a)}var c=this,d=this.state;hb>d&&b(!0),b(),d>=hb&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=kb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kb|eb)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ib|jb|kb)&&(this.state=eb),this.state=this.process(b),void(this.state&(fb|gb|hb|jb)&&this.tryEmit(b))):(this.reset(),void(this.state=kb))},process:function(){},getTouchAction:function(){},reset:function(){}},j(Z,V,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(fb|gb),e=this.attrTest(a);return d&&(c&Ba||!e)?b|jb:d||e?c&Aa?b|hb:b&fb?b|gb:fb:kb}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Ja},getTouchAction:function(){var a=this.options.direction,b=[];return a&Ha&&b.push(db),a&Ia&&b.push(cb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Ha?(e=0===f?Ca:0>f?Da:Ea,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ca:0>g?Fa:Ga,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fb||!(this.state&fb)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[bb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fb)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(aa,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[_a]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Aa|Ba)&&!f)this.reset();else if(a.eventType&ya)this.reset(),this._timer=e(function(){this.state=ib,this.tryEmit()},b.time,this);else if(a.eventType&Aa)return ib;return kb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===ib&&(a&&a.eventType&Aa?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=na(),this.manager.emit(this.options.event,this._input)))}}),j(ba,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[bb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fb)}}),j(ca,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Ha|Ia,pointers:1},getTouchAction:function(){return $.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Ha|Ia)?b=a.velocity:c&Ha?b=a.velocityX:c&Ia&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&ma(b)>this.options.velocity&&a.eventType&Aa},emit:function(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(da,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[ab]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&ya&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Aa)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ib,this.tryEmit()},b.interval,this),fb):ib}return kb},failTimeout:function(){return this._timer=e(function(){this.state=kb},this.options.interval,this),kb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ib&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ea.VERSION="2.0.4",ea.defaults={domEvents:!1,touchAction:$a,enable:!0,inputTarget:null,inputClass:null,preset:[[ba,{enable:!1}],[_,{enable:!1},["rotate"]],[ca,{direction:Ha}],[$,{direction:Ha},["swipe"]],[da],[da,{event:"doubletap",taps:2},["tap"]],[aa]],cssProps:{userSelect:"default",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lb=1,mb=2;fa.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?mb:lb},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ib)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===mb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fb|gb|hb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&ha(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ga(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(ea,{INPUT_START:ya,INPUT_MOVE:za,INPUT_END:Aa,INPUT_CANCEL:Ba,STATE_POSSIBLE:eb,STATE_BEGAN:fb,STATE_CHANGED:gb,STATE_ENDED:hb,STATE_RECOGNIZED:ib,STATE_CANCELLED:jb,STATE_FAILED:kb,DIRECTION_NONE:Ca,DIRECTION_LEFT:Da,DIRECTION_RIGHT:Ea,DIRECTION_UP:Fa,DIRECTION_DOWN:Ga,DIRECTION_HORIZONTAL:Ha,DIRECTION_VERTICAL:Ia,DIRECTION_ALL:Ja,Manager:fa,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:da,Pan:$,Swipe:ca,Pinch:_,Rotate:ba,Press:aa,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==ka&&define.amd?define(function(){return ea}):"undefined"!=typeof module&&module.exports?module.exports=ea:a[c]=ea}(window,document,"Hammer"),function(a){"function"==typeof define&&define.amd?define(["jquery","hammerjs"],a):"object"==typeof exports?a(require("jquery"),require("hammerjs")):a(jQuery,Hammer)}(function(a,b){function c(c,d){var e=a(c);e.data("hammer")||e.data("hammer",new b(e[0],d))}a.fn.hammer=function(a){return this.each(function(){c(this,a)})},b.Manager.prototype.emit=function(b){return function(c,d){b.call(this,c,d),a(this.element).trigger({type:c,gesture:d})}}(b.Manager.prototype.emit)}),function(a){a.Package?Materialize={}:a.Materialize={}}(window),Materialize.guid=function(){function a(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}}(),Materialize.elementOrParentIsFixed=function(a){var b=$(a),c=b.add(b.parents()),d=!1;return c.each(function(){return"fixed"===$(this).css("position")?(d=!0,!1):void 0}),d};var Vel;Vel=$?$.Velocity:jQuery?jQuery.Velocity:Velocity,function(a){a.fn.collapsible=function(b){var c={accordion:void 0};return b=a.extend(c,b),this.each(function(){function c(b){h=g.find("> li > .collapsible-header"),b.hasClass("active")?b.parent().addClass("active"):b.parent().removeClass("active"),b.parent().hasClass("active")?b.siblings(".collapsible-body").stop(!0,!1).slideDown({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){a(this).css("height","")}}):b.siblings(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){a(this).css("height","")}}),h.not(b).removeClass("active").parent().removeClass("active"),h.not(b).parent().children(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){a(this).css("height","")}})}function d(b){b.hasClass("active")?b.parent().addClass("active"):b.parent().removeClass("active"),b.parent().hasClass("active")?b.siblings(".collapsible-body").stop(!0,!1).slideDown({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){a(this).css("height","")}}):b.siblings(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){a(this).css("height","")}})}function e(a){var b=f(a);return b.length>0}function f(a){return a.closest("li > .collapsible-header")}var g=a(this),h=a(this).find("> li > .collapsible-header"),i=g.data("collapsible");g.off("click.collapse","> li > .collapsible-header"),h.off("click.collapse"),g.on("click.collapse","> li > .collapsible-header",function(g){var h=a(this),j=a(g.target);e(j)&&(j=f(j)),j.toggleClass("active"),b.accordion||"accordion"===i||void 0===i?c(j):(d(j),h.hasClass("active")&&d(h))});var h=g.find("> li > .collapsible-header");b.accordion||"accordion"===i||void 0===i?c(h.filter(".active").first()):h.filter(".active").each(function(){d(a(this))})})},a(document).ready(function(){a(".collapsible").collapsible()})}(jQuery),function(a){a.fn.scrollTo=function(b){return a(this).scrollTop(a(this).scrollTop()-a(this).offset().top+a(b).offset().top),this},a.fn.dropdown=function(b){var c={inDuration:300,outDuration:225,constrain_width:!0,hover:!1,gutter:0,belowOrigin:!1,alignment:"left",stopPropagation:!1};return"open"===b?(this.each(function(){a(this).trigger("open")}),!1):"close"===b?(this.each(function(){a(this).trigger("close")}),!1):void this.each(function(){function b(){void 0!==f.data("induration")&&(g.inDuration=f.data("induration")),void 0!==f.data("outduration")&&(g.outDuration=f.data("outduration")),void 0!==f.data("constrainwidth")&&(g.constrain_width=f.data("constrainwidth")),void 0!==f.data("hover")&&(g.hover=f.data("hover")),void 0!==f.data("gutter")&&(g.gutter=f.data("gutter")),void 0!==f.data("beloworigin")&&(g.belowOrigin=f.data("beloworigin")),void 0!==f.data("alignment")&&(g.alignment=f.data("alignment")),void 0!==f.data("stoppropagation")&&(g.stopPropagation=f.data("stoppropagation"))}function d(c){"focus"===c&&(h=!0),b(),i.addClass("active"),f.addClass("active"),g.constrain_width===!0?i.css("width",f.outerWidth()):i.css("white-space","nowrap");var d=window.innerHeight,e=f.innerHeight(),j=f.offset().left,k=f.offset().top-a(window).scrollTop(),l=g.alignment,m=0,n=0,o=0;g.belowOrigin===!0&&(o=e);var p=0,q=0,r=f.parent();if(r.is("body")||(r[0].scrollHeight>r[0].clientHeight&&(p=r[0].scrollTop),r[0].scrollWidth>r[0].clientWidth&&(q=r[0].scrollLeft)),j+i.innerWidth()>a(window).width()?l="right":j-i.innerWidth()+f.innerWidth()<0&&(l="left"),k+i.innerHeight()>d)if(k+e-i.innerHeight()<0){var s=d-k-o;i.css("max-height",s)}else o||(o+=e),o-=i.innerHeight();if("left"===l)m=g.gutter,n=f.position().left+m;else if("right"===l){var t=f.position().left+f.outerWidth()-i.outerWidth();m=-g.gutter,n=t+m}i.css({position:"absolute",top:f.position().top+o+p,left:n+q}),i.stop(!0,!0).css("opacity",0).slideDown({queue:!1,duration:g.inDuration,easing:"easeOutCubic",complete:function(){a(this).css("height","")}}).animate({opacity:1},{queue:!1,duration:g.inDuration,easing:"easeOutSine"})}function e(){h=!1,i.fadeOut(g.outDuration),i.removeClass("active"),f.removeClass("active"),setTimeout(function(){i.css("max-height","")},g.outDuration)}var f=a(this),g=a.extend({},c,g),h=!1,i=a("#"+f.attr("data-activates"));if(b(),f.after(i),g.hover){var j=!1;f.unbind("click."+f.attr("id")),f.on("mouseenter",function(a){j===!1&&(d(),j=!0)}),f.on("mouseleave",function(b){var c=b.toElement||b.relatedTarget;a(c).closest(".dropdown-content").is(i)||(i.stop(!0,!0),e(),j=!1)}),i.on("mouseleave",function(b){var c=b.toElement||b.relatedTarget;a(c).closest(".dropdown-button").is(f)||(i.stop(!0,!0),e(),j=!1)})}else f.unbind("click."+f.attr("id")),f.bind("click."+f.attr("id"),function(b){h||(f[0]!=b.currentTarget||f.hasClass("active")||0!==a(b.target).closest(".dropdown-content").length?f.hasClass("active")&&(e(),a(document).unbind("click."+i.attr("id")+" touchstart."+i.attr("id"))):(b.preventDefault(),g.stopPropagation&&b.stopPropagation(),d("click")),i.hasClass("active")&&a(document).bind("click."+i.attr("id")+" touchstart."+i.attr("id"),function(b){i.is(b.target)||f.is(b.target)||f.find(b.target).length||(e(),a(document).unbind("click."+i.attr("id")+" touchstart."+i.attr("id")))}))});f.on("open",function(a,b){d(b)}),f.on("close",e)})},a(document).ready(function(){a(".dropdown-button").dropdown()})}(jQuery),function(a){var b=0,c=0,d=function(){return c++,"materialize-lean-overlay-"+c};a.fn.extend({openModal:function(c){var e=a("body"),f=e.innerWidth();e.css("overflow","hidden"),e.width(f);var g={opacity:.5,in_duration:350,out_duration:250,ready:void 0,complete:void 0,dismissible:!0,starting_top:"4%",ending_top:"10%"},h=a(this);if(!h.hasClass("open")){var i=d(),j=a('<div class="lean-overlay"></div>');lStack=++b,j.attr("id",i).css("z-index",1e3+2*lStack),h.data("overlay-id",i).css("z-index",1e3+2*lStack+1),h.addClass("open"),a("body").append(j),c=a.extend(g,c),c.dismissible&&(j.click(function(){h.closeModal(c)}),a(document).on("keyup.leanModal"+i,function(a){27===a.keyCode&&h.closeModal(c)})),h.find(".modal-close").on("click.close",function(a){h.closeModal(c)}),j.css({display:"block",opacity:0}),h.css({display:"block",opacity:0}),j.velocity({opacity:c.opacity},{duration:c.in_duration,queue:!1,ease:"easeOutCubic"}),h.data("associated-overlay",j[0]),h.hasClass("bottom-sheet")?h.velocity({bottom:"0",opacity:1},{duration:c.in_duration,queue:!1,ease:"easeOutCubic",complete:function(){"function"==typeof c.ready&&c.ready()}}):(a.Velocity.hook(h,"scaleX",.7),h.css({top:c.starting_top}),h.velocity({top:c.ending_top,opacity:1,scaleX:"1"},{duration:c.in_duration,queue:!1,ease:"easeOutCubic",
complete:function(){"function"==typeof c.ready&&c.ready()}}))}}}),a.fn.extend({closeModal:function(c){var d={out_duration:250,complete:void 0},e=a(this),f=e.data("overlay-id"),g=a("#"+f);e.removeClass("open"),c=a.extend(d,c),a("body").css({overflow:"",width:""}),e.find(".modal-close").off("click.close"),a(document).off("keyup.leanModal"+f),g.velocity({opacity:0},{duration:c.out_duration,queue:!1,ease:"easeOutQuart"}),e.hasClass("bottom-sheet")?e.velocity({bottom:"-100%",opacity:0},{duration:c.out_duration,queue:!1,ease:"easeOutCubic",complete:function(){g.css({display:"none"}),"function"==typeof c.complete&&c.complete(),g.remove(),b--}}):e.velocity({top:c.starting_top,opacity:0,scaleX:.7},{duration:c.out_duration,complete:function(){a(this).css("display","none"),"function"==typeof c.complete&&c.complete(),g.remove(),b--}})}}),a.fn.extend({leanModal:function(b){return this.each(function(){var c={starting_top:"4%"},d=a.extend(c,b);a(this).click(function(b){d.starting_top=(a(this).offset().top-a(window).scrollTop())/1.15;var c=a(this).attr("href")||"#"+a(this).data("target");a(c).openModal(d),b.preventDefault()})})}})}(jQuery),function(a){a.fn.materialbox=function(){return this.each(function(){function b(){f=!1;var b=i.parent(".material-placeholder"),d=(window.innerWidth,window.innerHeight,i.data("width")),g=i.data("height");i.velocity("stop",!0),a("#materialbox-overlay").velocity("stop",!0),a(".materialbox-caption").velocity("stop",!0),a("#materialbox-overlay").velocity({opacity:0},{duration:h,queue:!1,easing:"easeOutQuad",complete:function(){e=!1,a(this).remove()}}),i.velocity({width:d,height:g,left:0,top:0},{duration:h,queue:!1,easing:"easeOutQuad"}),a(".materialbox-caption").velocity({opacity:0},{duration:h,queue:!1,easing:"easeOutQuad",complete:function(){b.css({height:"",width:"",position:"",top:"",left:""}),i.css({height:"",top:"",left:"",width:"","max-width":"",position:"","z-index":""}),i.removeClass("active"),f=!0,a(this).remove(),c&&c.css("overflow","")}})}if(!a(this).hasClass("initialized")){a(this).addClass("initialized");var c,d,e=!1,f=!0,g=275,h=200,i=a(this),j=a("<div></div>").addClass("material-placeholder");i.wrap(j),i.on("click",function(){var h=i.parent(".material-placeholder"),j=window.innerWidth,k=window.innerHeight,l=i.width(),m=i.height();if(f===!1)return b(),!1;if(e&&f===!0)return b(),!1;f=!1,i.addClass("active"),e=!0,h.css({width:h[0].getBoundingClientRect().width,height:h[0].getBoundingClientRect().height,position:"relative",top:0,left:0}),c=void 0,d=h[0].parentNode;for(;null!==d&&!a(d).is(document);){var n=a(d);"visible"!==n.css("overflow")&&(n.css("overflow","visible"),c=void 0===c?n:c.add(n)),d=d.parentNode}i.css({position:"absolute","z-index":1e3}).data("width",l).data("height",m);var o=a('<div id="materialbox-overlay"></div>').css({opacity:0}).click(function(){f===!0&&b()});if(i.before(o),o.velocity({opacity:1},{duration:g,queue:!1,easing:"easeOutQuad"}),""!==i.data("caption")){var p=a('<div class="materialbox-caption"></div>');p.text(i.data("caption")),a("body").append(p),p.css({display:"inline"}),p.velocity({opacity:1},{duration:g,queue:!1,easing:"easeOutQuad"})}var q=0,r=l/j,s=m/k,t=0,u=0;r>s?(q=m/l,t=.9*j,u=.9*j*q):(q=l/m,t=.9*k*q,u=.9*k),i.hasClass("responsive-img")?i.velocity({"max-width":t,width:l},{duration:0,queue:!1,complete:function(){i.css({left:0,top:0}).velocity({height:u,width:t,left:a(document).scrollLeft()+j/2-i.parent(".material-placeholder").offset().left-t/2,top:a(document).scrollTop()+k/2-i.parent(".material-placeholder").offset().top-u/2},{duration:g,queue:!1,easing:"easeOutQuad",complete:function(){f=!0}})}}):i.css("left",0).css("top",0).velocity({height:u,width:t,left:a(document).scrollLeft()+j/2-i.parent(".material-placeholder").offset().left-t/2,top:a(document).scrollTop()+k/2-i.parent(".material-placeholder").offset().top-u/2},{duration:g,queue:!1,easing:"easeOutQuad",complete:function(){f=!0}})}),a(window).scroll(function(){e&&b()}),a(document).keyup(function(a){27===a.keyCode&&f===!0&&e&&b()})}})},a(document).ready(function(){a(".materialboxed").materialbox()})}(jQuery),function(a){a.fn.parallax=function(){var b=a(window).width();return this.each(function(c){function d(c){var d;d=601>b?e.height()>0?e.height():e.children("img").height():e.height()>0?e.height():500;var f=e.children("img").first(),g=f.height(),h=g-d,i=e.offset().top+d,j=e.offset().top,k=a(window).scrollTop(),l=window.innerHeight,m=k+l,n=(m-j)/(d+l),o=Math.round(h*n);c&&f.css("display","block"),i>k&&k+l>j&&f.css("transform","translate3D(-50%,"+o+"px, 0)")}var e=a(this);e.addClass("parallax"),e.children("img").one("load",function(){d(!0)}).each(function(){this.complete&&a(this).load()}),a(window).scroll(function(){b=a(window).width(),d(!1)}),a(window).resize(function(){b=a(window).width(),d(!1)})})}}(jQuery),function(a){var b={init:function(b){var c={onShow:null};return b=a.extend(c,b),this.each(function(){var c=a(this);a(window).width();c.width("100%");var d,e,f=c.find("li.tab a"),g=c.width(),h=Math.max(g,c[0].scrollWidth)/f.length,i=0;d=a(f.filter('[href="'+location.hash+'"]')),0===d.length&&(d=a(this).find("li.tab a.active").first()),0===d.length&&(d=a(this).find("li.tab a").first()),d.addClass("active"),i=f.index(d),0>i&&(i=0),void 0!==d[0]&&(e=a(d[0].hash)),c.append('<div class="indicator"></div>');var j=c.find(".indicator");c.is(":visible")&&(j.css({right:g-(i+1)*h}),j.css({left:i*h})),a(window).resize(function(){g=c.width(),h=Math.max(g,c[0].scrollWidth)/f.length,0>i&&(i=0),0!==h&&0!==g&&(j.css({right:g-(i+1)*h}),j.css({left:i*h}))}),f.not(d).each(function(){a(this.hash).hide()}),c.on("click","a",function(k){if(a(this).parent().hasClass("disabled"))return void k.preventDefault();if(!a(this).attr("target")){g=c.width(),h=Math.max(g,c[0].scrollWidth)/f.length,d.removeClass("active"),void 0!==e&&e.hide(),d=a(this),e=a(this.hash),f=c.find("li.tab a"),d.addClass("active");var l=i;i=f.index(a(this)),0>i&&(i=0),void 0!==e&&(e.show(),"function"==typeof b.onShow&&b.onShow.call(this,e)),i-l>=0?(j.velocity({right:g-(i+1)*h},{duration:300,queue:!1,easing:"easeOutQuad"}),j.velocity({left:i*h},{duration:300,queue:!1,easing:"easeOutQuad",delay:90})):(j.velocity({left:i*h},{duration:300,queue:!1,easing:"easeOutQuad"}),j.velocity({right:g-(i+1)*h},{duration:300,queue:!1,easing:"easeOutQuad",delay:90})),k.preventDefault()}})})},select_tab:function(a){this.find('a[href="#'+a+'"]').trigger("click")}};a.fn.tabs=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.tooltip"):b.init.apply(this,arguments)},a(document).ready(function(){a("ul.tabs").tabs()})}(jQuery),function(a){a.fn.tooltip=function(c){var d=5,e={delay:350,tooltip:"",position:"bottom",html:!1};return"remove"===c?(this.each(function(){a("#"+a(this).attr("data-tooltip-id")).remove(),a(this).off("mouseenter.tooltip mouseleave.tooltip")}),!1):(c=a.extend(e,c),this.each(function(){var e=Materialize.guid(),f=a(this);f.attr("data-tooltip-id",e);var g,h,i,j,k,l,m=function(){g=f.attr("data-html")?"true"===f.attr("data-html"):c.html,h=f.attr("data-delay"),h=void 0===h||""===h?c.delay:h,i=f.attr("data-position"),i=void 0===i||""===i?c.position:i,j=f.attr("data-tooltip"),j=void 0===j||""===j?c.tooltip:j};m();var n=function(){var b=a('<div class="material-tooltip"></div>');return j=g?a("<span></span>").html(j):a("<span></span>").text(j),b.append(j).appendTo(a("body")).attr("id",e),l=a('<div class="backdrop"></div>'),l.appendTo(b),b};k=n(),f.off("mouseenter.tooltip mouseleave.tooltip");var o,p=!1;f.on({"mouseenter.tooltip":function(a){var c=function(){m(),p=!0,k.velocity("stop"),l.velocity("stop"),k.css({display:"block",left:"0px",top:"0px"});var a,c,e,g=f.outerWidth(),h=f.outerHeight(),j=k.outerHeight(),n=k.outerWidth(),o="0px",q="0px",r=8,s=8;"top"===i?(a=f.offset().top-j-d,c=f.offset().left+g/2-n/2,e=b(c,a,n,j),o="-10px",l.css({bottom:0,left:0,borderRadius:"14px 14px 0 0",transformOrigin:"50% 100%",marginTop:j,marginLeft:n/2-l.width()/2})):"left"===i?(a=f.offset().top+h/2-j/2,c=f.offset().left-n-d,e=b(c,a,n,j),q="-10px",l.css({top:"-7px",right:0,width:"14px",height:"14px",borderRadius:"14px 0 0 14px",transformOrigin:"95% 50%",marginTop:j/2,marginLeft:n})):"right"===i?(a=f.offset().top+h/2-j/2,c=f.offset().left+g+d,e=b(c,a,n,j),q="+10px",l.css({top:"-7px",left:0,width:"14px",height:"14px",borderRadius:"0 14px 14px 0",transformOrigin:"5% 50%",marginTop:j/2,marginLeft:"0px"})):(a=f.offset().top+f.outerHeight()+d,c=f.offset().left+g/2-n/2,e=b(c,a,n,j),o="+10px",l.css({top:0,left:0,marginLeft:n/2-l.width()/2})),k.css({top:e.y,left:e.x}),r=Math.SQRT2*n/parseInt(l.css("width")),s=Math.SQRT2*j/parseInt(l.css("height")),k.velocity({marginTop:o,marginLeft:q},{duration:350,queue:!1}).velocity({opacity:1},{duration:300,delay:50,queue:!1}),l.css({display:"block"}).velocity({opacity:1},{duration:55,delay:0,queue:!1}).velocity({scaleX:r,scaleY:s},{duration:300,delay:0,queue:!1,easing:"easeInOutQuad"})};o=setTimeout(c,h)},"mouseleave.tooltip":function(){p=!1,clearTimeout(o),setTimeout(function(){p!==!0&&(k.velocity({opacity:0,marginTop:0,marginLeft:0},{duration:225,queue:!1}),l.velocity({opacity:0,scaleX:1,scaleY:1},{duration:225,queue:!1,complete:function(){l.css("display","none"),k.css("display","none"),p=!1}}))},225)}})}))};var b=function(b,c,d,e){var f=b,g=c;return 0>f?f=4:f+d>window.innerWidth&&(f-=f+d-window.innerWidth),0>g?g=4:g+e>window.innerHeight+a(window).scrollTop&&(g-=g+e-window.innerHeight),{x:f,y:g}};a(document).ready(function(){a(".tooltipped").tooltip()})}(jQuery),function(a){"use strict";function b(a){return null!==a&&a===a.window}function c(a){return b(a)?a:9===a.nodeType&&a.defaultView}function d(a){var b,d,e={top:0,left:0},f=a&&a.ownerDocument;return b=f.documentElement,"undefined"!=typeof a.getBoundingClientRect&&(e=a.getBoundingClientRect()),d=c(f),{top:e.top+d.pageYOffset-b.clientTop,left:e.left+d.pageXOffset-b.clientLeft}}function e(a){var b="";for(var c in a)a.hasOwnProperty(c)&&(b+=c+":"+a[c]+";");return b}function f(a){if(k.allowEvent(a)===!1)return null;for(var b=null,c=a.target||a.srcElement;null!==c.parentElement;){if(!(c instanceof SVGElement||-1===c.className.indexOf("waves-effect"))){b=c;break}if(c.classList.contains("waves-effect")){b=c;break}c=c.parentElement}return b}function g(b){var c=f(b);null!==c&&(j.show(b,c),"ontouchstart"in a&&(c.addEventListener("touchend",j.hide,!1),c.addEventListener("touchcancel",j.hide,!1)),c.addEventListener("mouseup",j.hide,!1),c.addEventListener("mouseleave",j.hide,!1))}var h=h||{},i=document.querySelectorAll.bind(document),j={duration:750,show:function(a,b){if(2===a.button)return!1;var c=b||this,f=document.createElement("div");f.className="waves-ripple",c.appendChild(f);var g=d(c),h=a.pageY-g.top,i=a.pageX-g.left,k="scale("+c.clientWidth/100*10+")";"touches"in a&&(h=a.touches[0].pageY-g.top,i=a.touches[0].pageX-g.left),f.setAttribute("data-hold",Date.now()),f.setAttribute("data-scale",k),f.setAttribute("data-x",i),f.setAttribute("data-y",h);var l={top:h+"px",left:i+"px"};f.className=f.className+" waves-notransition",f.setAttribute("style",e(l)),f.className=f.className.replace("waves-notransition",""),l["-webkit-transform"]=k,l["-moz-transform"]=k,l["-ms-transform"]=k,l["-o-transform"]=k,l.transform=k,l.opacity="1",l["-webkit-transition-duration"]=j.duration+"ms",l["-moz-transition-duration"]=j.duration+"ms",l["-o-transition-duration"]=j.duration+"ms",l["transition-duration"]=j.duration+"ms",l["-webkit-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["-moz-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["-o-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",f.setAttribute("style",e(l))},hide:function(a){k.touchup(a);var b=this,c=(1.4*b.clientWidth,null),d=b.getElementsByClassName("waves-ripple");if(!(d.length>0))return!1;c=d[d.length-1];var f=c.getAttribute("data-x"),g=c.getAttribute("data-y"),h=c.getAttribute("data-scale"),i=Date.now()-Number(c.getAttribute("data-hold")),l=350-i;0>l&&(l=0),setTimeout(function(){var a={top:g+"px",left:f+"px",opacity:"0","-webkit-transition-duration":j.duration+"ms","-moz-transition-duration":j.duration+"ms","-o-transition-duration":j.duration+"ms","transition-duration":j.duration+"ms","-webkit-transform":h,"-moz-transform":h,"-ms-transform":h,"-o-transform":h,transform:h};c.setAttribute("style",e(a)),setTimeout(function(){try{b.removeChild(c)}catch(a){return!1}},j.duration)},l)},wrapInput:function(a){for(var b=0;b<a.length;b++){var c=a[b];if("input"===c.tagName.toLowerCase()){var d=c.parentNode;if("i"===d.tagName.toLowerCase()&&-1!==d.className.indexOf("waves-effect"))continue;var e=document.createElement("i");e.className=c.className+" waves-input-wrapper";var f=c.getAttribute("style");f||(f=""),e.setAttribute("style",f),c.className="waves-button-input",c.removeAttribute("style"),d.replaceChild(e,c),e.appendChild(c)}}}},k={touches:0,allowEvent:function(a){var b=!0;return"touchstart"===a.type?k.touches+=1:"touchend"===a.type||"touchcancel"===a.type?setTimeout(function(){k.touches>0&&(k.touches-=1)},500):"mousedown"===a.type&&k.touches>0&&(b=!1),b},touchup:function(a){k.allowEvent(a)}};h.displayEffect=function(b){b=b||{},"duration"in b&&(j.duration=b.duration),j.wrapInput(i(".waves-effect")),"ontouchstart"in a&&document.body.addEventListener("touchstart",g,!1),document.body.addEventListener("mousedown",g,!1)},h.attach=function(b){"input"===b.tagName.toLowerCase()&&(j.wrapInput([b]),b=b.parentElement),"ontouchstart"in a&&b.addEventListener("touchstart",g,!1),b.addEventListener("mousedown",g,!1)},a.Waves=h,document.addEventListener("DOMContentLoaded",function(){h.displayEffect()},!1)}(window),Materialize.toast=function(a,b,c,d){function e(a){var b=document.createElement("div");if(b.classList.add("toast"),c)for(var e=c.split(" "),f=0,g=e.length;g>f;f++)b.classList.add(e[f]);("object"==typeof HTMLElement?a instanceof HTMLElement:a&&"object"==typeof a&&null!==a&&1===a.nodeType&&"string"==typeof a.nodeName)?b.appendChild(a):a instanceof jQuery?b.appendChild(a[0]):b.innerHTML=a;var h=new Hammer(b,{prevent_default:!1});return h.on("pan",function(a){var c=a.deltaX,d=80;b.classList.contains("panning")||b.classList.add("panning");var e=1-Math.abs(c/d);0>e&&(e=0),Vel(b,{left:c,opacity:e},{duration:50,queue:!1,easing:"easeOutQuad"})}),h.on("panend",function(a){var c=a.deltaX,e=80;Math.abs(c)>e?Vel(b,{marginTop:"-40px"},{duration:375,easing:"easeOutExpo",queue:!1,complete:function(){"function"==typeof d&&d(),b.parentNode.removeChild(b)}}):(b.classList.remove("panning"),Vel(b,{left:0,opacity:1},{duration:300,easing:"easeOutExpo",queue:!1}))}),b}c=c||"";var f=document.getElementById("toast-container");null===f&&(f=document.createElement("div"),f.id="toast-container",document.body.appendChild(f));var g=e(a);a&&f.appendChild(g),g.style.top="35px",g.style.opacity=0,Vel(g,{top:"0px",opacity:1},{duration:300,easing:"easeOutCubic",queue:!1});var h=b,i=setInterval(function(){null===g.parentNode&&window.clearInterval(i),g.classList.contains("panning")||(h-=20),0>=h&&(Vel(g,{opacity:0,marginTop:"-40px"},{duration:375,easing:"easeOutExpo",queue:!1,complete:function(){"function"==typeof d&&d(),this[0].parentNode.removeChild(this[0])}}),window.clearInterval(i))},20)},function(a){var b={init:function(b){var c={menuWidth:300,edge:"left",closeOnClick:!1};b=a.extend(c,b),a(this).each(function(){function c(c){g=!1,h=!1,a("body").css({overflow:"",width:""}),a("#sidenav-overlay").velocity({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}}),"left"===b.edge?(f.css({width:"",right:"",left:"0"}),e.velocity({translateX:"-100%"},{duration:200,queue:!1,easing:"easeOutCubic",complete:function(){c===!0&&(e.removeAttr("style"),e.css("width",b.menuWidth))}})):(f.css({width:"",right:"0",left:""}),e.velocity({translateX:"100%"},{duration:200,queue:!1,easing:"easeOutCubic",complete:function(){c===!0&&(e.removeAttr("style"),e.css("width",b.menuWidth))}}))}var d=a(this),e=a("#"+d.attr("data-activates"));300!=b.menuWidth&&e.css("width",b.menuWidth);var f=a('<div class="drag-target"></div>');a("body").append(f),"left"==b.edge?(e.css("transform","translateX(-100%)"),f.css({left:0})):(e.addClass("right-aligned").css("transform","translateX(100%)"),f.css({right:0})),e.hasClass("fixed")&&window.innerWidth>992&&e.css("transform","translateX(0)"),e.hasClass("fixed")&&a(window).resize(function(){window.innerWidth>992?0!==a("#sidenav-overlay").length&&h?c(!0):e.css("transform","translateX(0%)"):h===!1&&("left"===b.edge?e.css("transform","translateX(-100%)"):e.css("transform","translateX(100%)"))}),b.closeOnClick===!0&&e.on("click.itemclick","a:not(.collapsible-header)",function(){c()});var g=!1,h=!1;f.on("click",function(){h&&c()}),f.hammer({prevent_default:!1}).bind("pan",function(d){if("touch"==d.gesture.pointerType){var f=(d.gesture.direction,d.gesture.center.x),g=(d.gesture.center.y,d.gesture.velocityX,a("body")),i=g.innerWidth();if(g.css("overflow","hidden"),g.width(i),0===a("#sidenav-overlay").length){var j=a('<div id="sidenav-overlay"></div>');j.css("opacity",0).click(function(){c()}),a("body").append(j)}if("left"===b.edge&&(f>b.menuWidth?f=b.menuWidth:0>f&&(f=0)),"left"===b.edge)f<b.menuWidth/2?h=!1:f>=b.menuWidth/2&&(h=!0),e.css("transform","translateX("+(f-b.menuWidth)+"px)");else{f<window.innerWidth-b.menuWidth/2?h=!0:f>=window.innerWidth-b.menuWidth/2&&(h=!1);var k=f-b.menuWidth/2;0>k&&(k=0),e.css("transform","translateX("+k+"px)")}var l;"left"===b.edge?(l=f/b.menuWidth,a("#sidenav-overlay").velocity({opacity:l},{duration:10,queue:!1,easing:"easeOutQuad"})):(l=Math.abs((f-window.innerWidth)/b.menuWidth),a("#sidenav-overlay").velocity({opacity:l},{duration:10,queue:!1,easing:"easeOutQuad"}))}}).bind("panend",function(c){if("touch"==c.gesture.pointerType){var d=c.gesture.velocityX,i=c.gesture.center.x,j=i-b.menuWidth,k=i-b.menuWidth/2;j>0&&(j=0),0>k&&(k=0),g=!1,"left"===b.edge?h&&.3>=d||-.5>d?(0!==j&&e.velocity({translateX:[0,j]},{duration:300,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:1},{duration:50,queue:!1,easing:"easeOutQuad"}),f.css({width:"50%",right:0,left:""}),h=!0):(!h||d>.3)&&(a("body").css({overflow:"",width:""}),e.velocity({translateX:[-1*b.menuWidth-10,j]},{duration:200,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}}),f.css({width:"10px",right:"",left:0})):h&&d>=-.3||d>.5?(0!==k&&e.velocity({translateX:[0,k]},{duration:300,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:1},{duration:50,queue:!1,easing:"easeOutQuad"}),f.css({width:"50%",right:"",left:0}),h=!0):(!h||-.3>d)&&(a("body").css({overflow:"",width:""}),e.velocity({translateX:[b.menuWidth+10,k]},{duration:200,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}}),f.css({width:"10px",right:0,left:""}))}}),d.click(function(){if(h===!0)h=!1,g=!1,c();else{var d=a("body"),i=d.innerWidth();d.css("overflow","hidden"),d.width(i),a("body").append(f),"left"===b.edge?(f.css({width:"50%",right:0,left:""}),e.velocity({translateX:[0,-1*b.menuWidth]},{duration:300,queue:!1,easing:"easeOutQuad"})):(f.css({width:"50%",right:"",left:0}),e.velocity({translateX:[0,b.menuWidth]},{duration:300,queue:!1,easing:"easeOutQuad"}));var j=a('<div id="sidenav-overlay"></div>');j.css("opacity",0).click(function(){h=!1,g=!1,c(),j.velocity({opacity:0},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}})}),a("body").append(j),j.velocity({opacity:1},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){h=!0,g=!1}})}return!1})})},show:function(){this.trigger("click")},hide:function(){a("#sidenav-overlay").trigger("click")}};a.fn.sideNav=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.sideNav"):b.init.apply(this,arguments)}}(jQuery),function(a){function b(b,c,d,e){var f=a();return a.each(g,function(a,g){if(g.height()>0){var h=g.offset().top,i=g.offset().left,j=i+g.width(),k=h+g.height(),l=!(i>c||e>j||h>d||b>k);l&&f.push(g)}}),f}function c(){++j;var c=f.scrollTop(),d=f.scrollLeft(),e=d+f.width(),g=c+f.height(),i=b(c+k.top+200,e+k.right,g+k.bottom,d+k.left);a.each(i,function(a,b){var c=b.data("scrollSpy:ticks");"number"!=typeof c&&b.triggerHandler("scrollSpy:enter"),b.data("scrollSpy:ticks",j)}),a.each(h,function(a,b){var c=b.data("scrollSpy:ticks");"number"==typeof c&&c!==j&&(b.triggerHandler("scrollSpy:exit"),b.data("scrollSpy:ticks",null))}),h=i}function d(){f.trigger("scrollSpy:winSize")}function e(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function(){h=c.leading===!1?0:l(),g=null,f=a.apply(d,e),d=e=null};return function(){var j=l();h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,0>=k?(clearTimeout(g),g=null,h=j,f=a.apply(d,e),d=e=null):g||c.trailing===!1||(g=setTimeout(i,k)),f}}var f=a(window),g=[],h=[],i=!1,j=0,k={top:0,right:0,bottom:0,left:0},l=Date.now||function(){return(new Date).getTime()};a.scrollSpy=function(b,d){var h={throttle:100,scrollOffset:200};d=a.extend(h,d);var j=[];b=a(b),b.each(function(b,c){g.push(a(c)),a(c).data("scrollSpy:id",b),a('a[href="#'+a(c).attr("id")+'"]').click(function(b){b.preventDefault();var c=a(this.hash).offset().top+1;a("html, body").animate({scrollTop:c-d.scrollOffset},{duration:400,queue:!1,easing:"easeOutCubic"})})}),k.top=d.offsetTop||0,k.right=d.offsetRight||0,k.bottom=d.offsetBottom||0,k.left=d.offsetLeft||0;var l=e(c,d.throttle||100),m=function(){a(document).ready(l)};return i||(f.on("scroll",m),f.on("resize",m),i=!0),setTimeout(m,0),b.on("scrollSpy:enter",function(){j=a.grep(j,function(a){return 0!=a.height()});var b=a(this);j[0]?(a('a[href="#'+j[0].attr("id")+'"]').removeClass("active"),b.data("scrollSpy:id")<j[0].data("scrollSpy:id")?j.unshift(a(this)):j.push(a(this))):j.push(a(this)),a('a[href="#'+j[0].attr("id")+'"]').addClass("active")}),b.on("scrollSpy:exit",function(){if(j=a.grep(j,function(a){return 0!=a.height()}),j[0]){a('a[href="#'+j[0].attr("id")+'"]').removeClass("active");var b=a(this);j=a.grep(j,function(a){return a.attr("id")!=b.attr("id")}),j[0]&&a('a[href="#'+j[0].attr("id")+'"]').addClass("active")}}),b},a.winSizeSpy=function(b){return a.winSizeSpy=function(){return f},b=b||{throttle:100},f.on("resize",e(d,b.throttle||100))},a.fn.scrollSpy=function(b){return a.scrollSpy(a(this),b)}}(jQuery),function(a){a(document).ready(function(){function b(b){var c=b.css("font-family"),d=b.css("font-size"),f=b.css("line-height");d&&e.css("font-size",d),c&&e.css("font-family",c),f&&e.css("line-height",f),"off"===b.attr("wrap")&&e.css("overflow-wrap","normal").css("white-space","pre"),e.text(b.val()+"\n");var g=e.html().replace(/\n/g,"<br>");e.html(g),b.is(":visible")?e.css("width",b.width()):e.css("width",a(window).width()/2),b.css("height",e.height())}Materialize.updateTextFields=function(){var b="input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";a(b).each(function(b,c){a(c).val().length>0||c.autofocus||void 0!==a(this).attr("placeholder")||a(c)[0].validity.badInput===!0?a(this).siblings("label").addClass("active"):a(this).siblings("label").removeClass("active")})};var c="input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";a(document).on("change",c,function(){(0!==a(this).val().length||void 0!==a(this).attr("placeholder"))&&a(this).siblings("label").addClass("active"),validate_field(a(this))}),a(document).ready(function(){Materialize.updateTextFields()}),a(document).on("reset",function(b){var d=a(b.target);d.is("form")&&(d.find(c).removeClass("valid").removeClass("invalid"),d.find(c).each(function(){""===a(this).attr("value")&&a(this).siblings("label").removeClass("active")}),d.find("select.initialized").each(function(){var a=d.find("option[selected]").text();d.siblings("input.select-dropdown").val(a)}))}),a(document).on("focus",c,function(){a(this).siblings("label, .prefix").addClass("active")}),a(document).on("blur",c,function(){var b=a(this),c=".prefix";0===b.val().length&&b[0].validity.badInput!==!0&&void 0===b.attr("placeholder")&&(c+=", label"),b.siblings(c).removeClass("active"),validate_field(b)}),window.validate_field=function(a){var b=void 0!==a.attr("length"),c=parseInt(a.attr("length")),d=a.val().length;0===a.val().length&&a[0].validity.badInput===!1?a.hasClass("validate")&&(a.removeClass("valid"),a.removeClass("invalid")):a.hasClass("validate")&&(a.is(":valid")&&b&&c>=d||a.is(":valid")&&!b?(a.removeClass("invalid"),a.addClass("valid")):(a.removeClass("valid"),a.addClass("invalid")))};var d="input[type=radio], input[type=checkbox]";a(document).on("keyup.radio",d,function(b){if(9===b.which){a(this).addClass("tabbed");var c=a(this);return void c.one("blur",function(b){a(this).removeClass("tabbed")})}});var e=a(".hiddendiv").first();e.length||(e=a('<div class="hiddendiv common"></div>'),a("body").append(e));var f=".materialize-textarea";a(f).each(function(){var c=a(this);c.val().length&&b(c)}),a("body").on("keyup keydown autoresize",f,function(){b(a(this))}),a(document).on("change",'.file-field input[type="file"]',function(){for(var b=a(this).closest(".file-field"),c=b.find("input.file-path"),d=a(this)[0].files,e=[],f=0;f<d.length;f++)e.push(d[f].name);c.val(e.join(", ")),c.trigger("change")});var g,h="input[type=range]",i=!1;a(h).each(function(){var b=a('<span class="thumb"><span class="value"></span></span>');a(this).after(b)});var j=".range-field";a(document).on("change",h,function(b){var c=a(this).siblings(".thumb");c.find(".value").html(a(this).val())}),a(document).on("input mousedown touchstart",h,function(b){var c=a(this).siblings(".thumb"),d=a(this).outerWidth();c.length<=0&&(c=a('<span class="thumb"><span class="value"></span></span>'),a(this).after(c)),c.find(".value").html(a(this).val()),i=!0,a(this).addClass("active"),c.hasClass("active")||c.velocity({height:"30px",width:"30px",top:"-20px",marginLeft:"-15px"},{duration:300,easing:"easeOutExpo"}),"input"!==b.type&&(g=void 0===b.pageX||null===b.pageX?b.originalEvent.touches[0].pageX-a(this).offset().left:b.pageX-a(this).offset().left,0>g?g=0:g>d&&(g=d),c.addClass("active").css("left",g)),c.find(".value").html(a(this).val())}),a(document).on("mouseup touchend",j,function(){i=!1,a(this).removeClass("active")}),a(document).on("mousemove touchmove",j,function(b){var c,d=a(this).children(".thumb");if(i){d.hasClass("active")||d.velocity({height:"30px",width:"30px",top:"-20px",marginLeft:"-15px"},{duration:300,easing:"easeOutExpo"}),c=void 0===b.pageX||null===b.pageX?b.originalEvent.touches[0].pageX-a(this).offset().left:b.pageX-a(this).offset().left;var e=a(this).outerWidth();0>c?c=0:c>e&&(c=e),d.addClass("active").css("left",c),d.find(".value").html(d.siblings(h).val())}}),a(document).on("mouseout touchleave",j,function(){if(!i){var b=a(this).children(".thumb");b.hasClass("active")&&b.velocity({height:"0",width:"0",top:"10px",marginLeft:"-6px"},{duration:100}),b.removeClass("active")}}),a.fn.autocomplete=function(b){var c={data:{}};return b=a.extend(c,b),this.each(function(){var c=a(this),d=b.data,e=c.closest(".input-field");if(!a.isEmptyObject(d)){var f=a('<ul class="autocomplete-content dropdown-content"></ul>');e.length?e.append(f):c.after(f);var g=function(a,b){var c=b.find("img"),d=b.text().toLowerCase().indexOf(""+a.toLowerCase()),e=d+a.length-1,f=b.text().slice(0,d),g=b.text().slice(d,e+1),h=b.text().slice(e+1);b.html("<span>"+f+"<span class='highlight'>"+g+"</span>"+h+"</span>"),c.length&&b.prepend(c)};c.on("keyup",function(b){if(13===b.which)return void f.find("li").first().click();var e=c.val().toLowerCase();if(f.empty(),""!==e)for(var h in d)if(d.hasOwnProperty(h)&&-1!==h.toLowerCase().indexOf(e)&&h.toLowerCase()!==e){var i=a("<li></li>");d[h]?i.append('<img src="'+d[h]+'" class="right circle"><span>'+h+"</span>"):i.append("<span>"+h+"</span>"),f.append(i),g(e,i)}}),f.on("click","li",function(){c.val(a(this).text().trim()),f.empty()})}})}}),a.fn.material_select=function(b){function c(a,b,c){var e=a.indexOf(b),f=-1===e;return f?a.push(b):a.splice(e,1),c.siblings("ul.dropdown-content").find("li").eq(b).toggleClass("active"),c.find("option").eq(b).prop("selected",f),d(a,c),f}function d(a,b){for(var c="",d=0,e=a.length;e>d;d++){var f=b.find("option").eq(a[d]).text();c+=0===d?f:", "+f}""===c&&(c=b.find("option:disabled").eq(0).text()),b.siblings("input.select-dropdown").val(c)}a(this).each(function(){var d=a(this);if(!d.hasClass("browser-default")){var e=d.attr("multiple")?!0:!1,f=d.data("select-id");if(f&&(d.parent().find("span.caret").remove(),d.parent().find("input").remove(),d.unwrap(),a("ul#select-options-"+f).remove()),"destroy"===b)return void d.data("select-id",null).removeClass("initialized");var g=Materialize.guid();d.data("select-id",g);var h=a('<div class="select-wrapper"></div>');h.addClass(d.attr("class"));var i=a('<ul id="select-options-'+g+'" class="dropdown-content select-dropdown '+(e?"multiple-select-dropdown":"")+'"></ul>'),j=d.children("option, optgroup"),k=[],l=!1,m=d.find("option:selected").html()||d.find("option:first").html()||"",n=function(b,c,d){var e=c.is(":disabled")?"disabled ":"",f="optgroup-option"===d?"optgroup-option ":"",g=c.data("icon"),h=c.attr("class");if(g){var j="";return h&&(j=' class="'+h+'"'),"multiple"===d?i.append(a('<li class="'+e+'"><img src="'+g+'"'+j+'><span><input type="checkbox"'+e+"/><label></label>"+c.html()+"</span></li>")):i.append(a('<li class="'+e+f+'"><img src="'+g+'"'+j+"><span>"+c.html()+"</span></li>")),!0}"multiple"===d?i.append(a('<li class="'+e+'"><span><input type="checkbox"'+e+"/><label></label>"+c.html()+"</span></li>")):i.append(a('<li class="'+e+f+'"><span>'+c.html()+"</span></li>"))};j.length&&j.each(function(){if(a(this).is("option"))e?n(d,a(this),"multiple"):n(d,a(this));else if(a(this).is("optgroup")){var b=a(this).children("option");i.append(a('<li class="optgroup"><span>'+a(this).attr("label")+"</span></li>")),b.each(function(){n(d,a(this),"optgroup-option")})}}),i.find("li:not(.optgroup)").each(function(f){a(this).click(function(g){if(!a(this).hasClass("disabled")&&!a(this).hasClass("optgroup")){var h=!0;e?(a('input[type="checkbox"]',this).prop("checked",function(a,b){return!b}),h=c(k,a(this).index(),d),q.trigger("focus")):(i.find("li").removeClass("active"),a(this).toggleClass("active"),q.val(a(this).text())),r(i,a(this)),d.find("option").eq(f).prop("selected",h),d.trigger("change"),"undefined"!=typeof b&&b()}g.stopPropagation()})}),d.wrap(h);var o=a('<span class="caret">&#9660;</span>');d.is(":disabled")&&o.addClass("disabled");var p=m.replace(/"/g,"&quot;"),q=a('<input type="text" class="select-dropdown" readonly="true" '+(d.is(":disabled")?"disabled":"")+' data-activates="select-options-'+g+'" value="'+p+'"/>');d.before(q),q.before(o),q.after(i),d.is(":disabled")||q.dropdown({hover:!1,closeOnClick:!1}),d.attr("tabindex")&&a(q[0]).attr("tabindex",d.attr("tabindex")),d.addClass("initialized"),q.on({focus:function(){if(a("ul.select-dropdown").not(i[0]).is(":visible")&&a("input.select-dropdown").trigger("close"),!i.is(":visible")){a(this).trigger("open",["focus"]);var b=a(this).val(),c=i.find("li").filter(function(){return a(this).text().toLowerCase()===b.toLowerCase()})[0];r(i,c)}},click:function(a){a.stopPropagation()}}),q.on("blur",function(){e||a(this).trigger("close"),i.find("li.selected").removeClass("selected")}),i.hover(function(){l=!0},function(){l=!1}),a(window).on({click:function(){e&&(l||q.trigger("close"))}}),e&&d.find("option:selected:not(:disabled)").each(function(){
var b=a(this).index();c(k,b,d),i.find("li").eq(b).find(":checkbox").prop("checked",!0)});var r=function(b,c){if(c){b.find("li.selected").removeClass("selected");var d=a(c);d.addClass("selected"),i.scrollTo(d)}},s=[],t=function(b){if(9==b.which)return void q.trigger("close");if(40==b.which&&!i.is(":visible"))return void q.trigger("open");if(13!=b.which||i.is(":visible")){b.preventDefault();var c=String.fromCharCode(b.which).toLowerCase(),d=[9,13,27,38,40];if(c&&-1===d.indexOf(b.which)){s.push(c);var f=s.join(""),g=i.find("li").filter(function(){return 0===a(this).text().toLowerCase().indexOf(f)})[0];g&&r(i,g)}if(13==b.which){var h=i.find("li.selected:not(.disabled)")[0];h&&(a(h).trigger("click"),e||q.trigger("close"))}40==b.which&&(g=i.find("li.selected").length?i.find("li.selected").next("li:not(.disabled)")[0]:i.find("li:not(.disabled)")[0],r(i,g)),27==b.which&&q.trigger("close"),38==b.which&&(g=i.find("li.selected").prev("li:not(.disabled)")[0],g&&r(i,g)),setTimeout(function(){s=[]},1e3)}};q.on("keydown",t)}})}}(jQuery),function(a){var b={init:function(b){var c={indicators:!0,height:400,transition:500,interval:6e3};return b=a.extend(c,b),this.each(function(){function c(a,b){a.hasClass("center-align")?a.velocity({opacity:0,translateY:-100},{duration:b,queue:!1}):a.hasClass("right-align")?a.velocity({opacity:0,translateX:100},{duration:b,queue:!1}):a.hasClass("left-align")&&a.velocity({opacity:0,translateX:-100},{duration:b,queue:!1})}function d(a){a>=j.length?a=0:0>a&&(a=j.length-1),k=i.find(".active").index(),k!=a&&(e=j.eq(k),$caption=e.find(".caption"),e.removeClass("active"),e.velocity({opacity:0},{duration:b.transition,queue:!1,easing:"easeOutQuad",complete:function(){j.not(".active").velocity({opacity:0,translateX:0,translateY:0},{duration:0,queue:!1})}}),c($caption,b.transition),b.indicators&&f.eq(k).removeClass("active"),j.eq(a).velocity({opacity:1},{duration:b.transition,queue:!1,easing:"easeOutQuad"}),j.eq(a).find(".caption").velocity({opacity:1,translateX:0,translateY:0},{duration:b.transition,delay:b.transition,queue:!1,easing:"easeOutQuad"}),j.eq(a).addClass("active"),b.indicators&&f.eq(a).addClass("active"))}var e,f,g,h=a(this),i=h.find("ul.slides").first(),j=i.find("> li"),k=i.find(".active").index();-1!=k&&(e=j.eq(k)),h.hasClass("fullscreen")||(b.indicators?h.height(b.height+40):h.height(b.height),i.height(b.height)),j.find(".caption").each(function(){c(a(this),0)}),j.find("img").each(function(){var b="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";a(this).attr("src")!==b&&(a(this).css("background-image","url("+a(this).attr("src")+")"),a(this).attr("src",b))}),b.indicators&&(f=a('<ul class="indicators"></ul>'),j.each(function(c){var e=a('<li class="indicator-item"></li>');e.click(function(){var c=i.parent(),e=c.find(a(this)).index();d(e),clearInterval(g),g=setInterval(function(){k=i.find(".active").index(),j.length==k+1?k=0:k+=1,d(k)},b.transition+b.interval)}),f.append(e)}),h.append(f),f=h.find("ul.indicators").find("li.indicator-item")),e?e.show():(j.first().addClass("active").velocity({opacity:1},{duration:b.transition,queue:!1,easing:"easeOutQuad"}),k=0,e=j.eq(k),b.indicators&&f.eq(k).addClass("active")),e.find("img").each(function(){e.find(".caption").velocity({opacity:1,translateX:0,translateY:0},{duration:b.transition,queue:!1,easing:"easeOutQuad"})}),g=setInterval(function(){k=i.find(".active").index(),d(k+1)},b.transition+b.interval);var l=!1,m=!1,n=!1;h.hammer({prevent_default:!1}).bind("pan",function(a){if("touch"===a.gesture.pointerType){clearInterval(g);var b=a.gesture.direction,c=a.gesture.deltaX,d=a.gesture.velocityX;$curr_slide=i.find(".active"),$curr_slide.velocity({translateX:c},{duration:50,queue:!1,easing:"easeOutQuad"}),4===b&&(c>h.innerWidth()/2||-.65>d)?n=!0:2===b&&(c<-1*h.innerWidth()/2||d>.65)&&(m=!0);var e;m&&(e=$curr_slide.next(),0===e.length&&(e=j.first()),e.velocity({opacity:1},{duration:300,queue:!1,easing:"easeOutQuad"})),n&&(e=$curr_slide.prev(),0===e.length&&(e=j.last()),e.velocity({opacity:1},{duration:300,queue:!1,easing:"easeOutQuad"}))}}).bind("panend",function(a){"touch"===a.gesture.pointerType&&($curr_slide=i.find(".active"),l=!1,curr_index=i.find(".active").index(),!n&&!m||j.length<=1?$curr_slide.velocity({translateX:0},{duration:300,queue:!1,easing:"easeOutQuad"}):m?(d(curr_index+1),$curr_slide.velocity({translateX:-1*h.innerWidth()},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){$curr_slide.velocity({opacity:0,translateX:0},{duration:0,queue:!1})}})):n&&(d(curr_index-1),$curr_slide.velocity({translateX:h.innerWidth()},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){$curr_slide.velocity({opacity:0,translateX:0},{duration:0,queue:!1})}})),m=!1,n=!1,clearInterval(g),g=setInterval(function(){k=i.find(".active").index(),j.length==k+1?k=0:k+=1,d(k)},b.transition+b.interval))}),h.on("sliderPause",function(){clearInterval(g)}),h.on("sliderStart",function(){clearInterval(g),g=setInterval(function(){k=i.find(".active").index(),j.length==k+1?k=0:k+=1,d(k)},b.transition+b.interval)}),h.on("sliderNext",function(){k=i.find(".active").index(),d(k+1)}),h.on("sliderPrev",function(){k=i.find(".active").index(),d(k-1)})})},pause:function(){a(this).trigger("sliderPause")},start:function(){a(this).trigger("sliderStart")},next:function(){a(this).trigger("sliderNext")},prev:function(){a(this).trigger("sliderPrev")}};a.fn.slider=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.tooltip"):b.init.apply(this,arguments)}}(jQuery),function(a){a(document).ready(function(){a(document).on("click.card",".card",function(b){a(this).find("> .card-reveal").length&&(a(b.target).is(a(".card-reveal .card-title"))||a(b.target).is(a(".card-reveal .card-title i"))?a(this).find(".card-reveal").velocity({translateY:0},{duration:225,queue:!1,easing:"easeInOutQuad",complete:function(){a(this).css({display:"none"})}}):(a(b.target).is(a(".card .activator"))||a(b.target).is(a(".card .activator i")))&&(a(b.target).closest(".card").css("overflow","hidden"),a(this).find(".card-reveal").css({display:"block"}).velocity("stop",!1).velocity({translateY:"-100%"},{duration:300,queue:!1,easing:"easeInOutQuad"})))})})}(jQuery),function(a){var b=!1,c={data:[],placeholder:"",secondaryPlaceholder:""};a(document).ready(function(){a(document).on("click",".chip .close",function(b){var c=a(this).closest(".chips");c.data("initialized")||a(this).closest(".chip").remove()})}),a.fn.material_chip=function(d){var e=this;return this.$el=a(this),this.$document=a(document),this.SELS={CHIPS:".chips",CHIP:".chip",INPUT:"input",DELETE:".material-icons",SELECTED_CHIP:".selected"},"data"===d?this.$el.data("chips"):"options"===d?this.$el.data("options"):(this.$el.data("options",a.extend({},c,d)),this.init=function(){var b=0;e.$el.each(function(){var c=a(this);if(!c.data("initialized")){var d=c.data("options");(!d.data||!d.data instanceof Array)&&(d.data=[]),c.data("chips",d.data),c.data("index",b),c.data("initialized",!0),c.hasClass(e.SELS.CHIPS)||c.addClass("chips"),e.chips(c),b++}})},this.handleEvents=function(){var b=e.SELS;e.$document.on("click",b.CHIPS,function(c){a(c.target).find(b.INPUT).focus()}),e.$document.on("click",b.CHIP,function(c){a(b.CHIP).removeClass("selected"),a(this).toggleClass("selected")}),e.$document.on("keydown",function(c){if(!a(c.target).is("input, textarea")){var d,f=e.$document.find(b.CHIP+b.SELECTED_CHIP),g=f.closest(b.CHIPS),h=f.siblings(b.CHIP).length;if(f.length)if(8===c.which||46===c.which){c.preventDefault();var i=g.data("index");d=f.index(),e.deleteChip(i,d,g);var j=null;h>d+1?j=d:(d===h||d+1===h)&&(j=h-1),0>j&&(j=null),null!==j&&e.selectChip(i,j,g),h||g.find("input").focus()}else if(37===c.which){if(d=f.index()-1,0>d)return;a(b.CHIP).removeClass("selected"),e.selectChip(g.data("index"),d,g)}else if(39===c.which){if(d=f.index()+1,a(b.CHIP).removeClass("selected"),d>h)return void g.find("input").focus();e.selectChip(g.data("index"),d,g)}}}),e.$document.on("focusin",b.CHIPS+" "+b.INPUT,function(c){a(c.target).closest(b.CHIPS).addClass("focus"),a(b.CHIP).removeClass("selected")}),e.$document.on("focusout",b.CHIPS+" "+b.INPUT,function(c){a(c.target).closest(b.CHIPS).removeClass("focus")}),e.$document.on("keydown",b.CHIPS+" "+b.INPUT,function(c){var d=a(c.target),f=d.closest(b.CHIPS),g=f.data("index"),h=f.children(b.CHIP).length;return 13===c.which?(c.preventDefault(),e.addChip(g,{tag:d.val()},f),void d.val("")):8!==c.keyCode&&37!==c.keyCode||""!==d.val()||!h?void 0:(e.selectChip(g,h-1,f),void d.blur())}),e.$document.on("click",b.CHIPS+" "+b.DELETE,function(c){var d=a(c.target),f=d.closest(b.CHIPS),g=d.closest(b.CHIP);c.stopPropagation(),e.deleteChip(f.data("index"),g.index(),f),f.find("input").focus()})},this.chips=function(a){var b="";a.data("options");a.data("chips").forEach(function(a){b+=e.renderChip(a)}),b+='<input class="input" placeholder="">',a.html(b),e.setPlaceholder(a)},this.renderChip=function(a){if(a.tag){var b='<div class="chip">'+a.tag;return a.image&&(b+=' <img src="'+a.image+'"> '),b+='<i class="material-icons close">close</i>',b+="</div>"}},this.setPlaceholder=function(a){var b=a.data("options");a.data("chips").length&&b.placeholder?a.find("input").prop("placeholder",b.placeholder):!a.data("chips").length&&b.secondaryPlaceholder&&a.find("input").prop("placeholder",b.secondaryPlaceholder)},this.isValid=function(a,b){for(var c=a.data("chips"),d=!1,e=0;e<c.length;e++)if(c[e].tag===b.tag)return void(d=!0);return""!==b.tag&&!d},this.addChip=function(b,c,d){if(e.isValid(d,c)){var f=(d.data("options"),e.renderChip(c));d.data("chips").push(c),a(f).insertBefore(d.find("input")),d.trigger("chip.add",c),e.setPlaceholder(d)}},this.deleteChip=function(a,b,c){var d=c.data("chips")[b];c.find(".chip").eq(b).remove(),c.data("chips").splice(b,1),c.trigger("chip.delete",d),e.setPlaceholder(c)},this.selectChip=function(a,b,c){var d=c.find(".chip").eq(b);d&&!1===d.hasClass("selected")&&(d.addClass("selected"),c.trigger("chip.select",c.data("chips")[b]))},this.getChipsElement=function(a,b){return b.eq(a)},this.init(),void(b||(this.handleEvents(),b=!0)))}}(jQuery),function(a){a.fn.pushpin=function(b){var c={top:0,bottom:1/0,offset:0};return"remove"===b?(this.each(function(){(id=a(this).data("pushpin-id"))&&(a(window).off("scroll."+id),a(this).removeData("pushpin-id").removeClass("pin-top pinned pin-bottom").removeAttr("style"))}),!1):(b=a.extend(c,b),$index=0,this.each(function(){function c(a){a.removeClass("pin-top"),a.removeClass("pinned"),a.removeClass("pin-bottom")}function d(d,e){d.each(function(){b.top<=e&&b.bottom>=e&&!a(this).hasClass("pinned")&&(c(a(this)),a(this).css("top",b.offset),a(this).addClass("pinned")),e<b.top&&!a(this).hasClass("pin-top")&&(c(a(this)),a(this).css("top",0),a(this).addClass("pin-top")),e>b.bottom&&!a(this).hasClass("pin-bottom")&&(c(a(this)),a(this).addClass("pin-bottom"),a(this).css("top",b.bottom-g))})}var e=Materialize.guid(),f=a(this),g=a(this).offset().top;a(this).data("pushpin-id",e),d(f,a(window).scrollTop()),a(window).on("scroll."+e,function(){var c=a(window).scrollTop()+b.offset;d(f,c)})}))}}(jQuery),function(a){a(document).ready(function(){a.fn.reverse=[].reverse,a(document).on("mouseenter.fixedActionBtn",".fixed-action-btn:not(.click-to-toggle)",function(c){var d=a(this);b(d)}),a(document).on("mouseleave.fixedActionBtn",".fixed-action-btn:not(.click-to-toggle)",function(b){var d=a(this);c(d)}),a(document).on("click.fixedActionBtn",".fixed-action-btn.click-to-toggle > a",function(d){var e=a(this),f=e.parent();f.hasClass("active")?c(f):b(f)})}),a.fn.extend({openFAB:function(){b(a(this))},closeFAB:function(){c(a(this))}});var b=function(b){if($this=b,$this.hasClass("active")===!1){var c,d,e=$this.hasClass("horizontal");e===!0?d=40:c=40,$this.addClass("active"),$this.find("ul .btn-floating").velocity({scaleY:".4",scaleX:".4",translateY:c+"px",translateX:d+"px"},{duration:0});var f=0;$this.find("ul .btn-floating").reverse().each(function(){a(this).velocity({opacity:"1",scaleX:"1",scaleY:"1",translateY:"0",translateX:"0"},{duration:80,delay:f}),f+=40})}},c=function(a){$this=a;var b,c,d=$this.hasClass("horizontal");d===!0?c=40:b=40,$this.removeClass("active");$this.find("ul .btn-floating").velocity("stop",!0),$this.find("ul .btn-floating").velocity({opacity:"0",scaleX:".4",scaleY:".4",translateY:b+"px",translateX:c+"px"},{duration:80})}}(jQuery),function(a){Materialize.fadeInImage=function(b){var c;if("string"==typeof b)c=a(b);else{if("object"!=typeof b)return;c=b}c.css({opacity:0}),a(c).velocity({opacity:1},{duration:650,queue:!1,easing:"easeOutSine"}),a(c).velocity({opacity:1},{duration:1300,queue:!1,easing:"swing",step:function(b,c){c.start=100;var d=b/100,e=150-(100-b)/1.75;100>e&&(e=100),b>=0&&a(this).css({"-webkit-filter":"grayscale("+d+")brightness("+e+"%)",filter:"grayscale("+d+")brightness("+e+"%)"})}})},Materialize.showStaggeredList=function(b){var c;if("string"==typeof b)c=a(b);else{if("object"!=typeof b)return;c=b}var d=0;c.find("li").velocity({translateX:"-100px"},{duration:0}),c.find("li").each(function(){a(this).velocity({opacity:"1",translateX:"0"},{duration:800,delay:d,easing:[60,10]}),d+=120})},a(document).ready(function(){var b=!1,c=!1;a(".dismissable").each(function(){a(this).hammer({prevent_default:!1}).bind("pan",function(d){if("touch"===d.gesture.pointerType){var e=a(this),f=d.gesture.direction,g=d.gesture.deltaX,h=d.gesture.velocityX;e.velocity({translateX:g},{duration:50,queue:!1,easing:"easeOutQuad"}),4===f&&(g>e.innerWidth()/2||-.75>h)&&(b=!0),2===f&&(g<-1*e.innerWidth()/2||h>.75)&&(c=!0)}}).bind("panend",function(d){if(Math.abs(d.gesture.deltaX)<a(this).innerWidth()/2&&(c=!1,b=!1),"touch"===d.gesture.pointerType){var e=a(this);if(b||c){var f;f=b?e.innerWidth():-1*e.innerWidth(),e.velocity({translateX:f},{duration:100,queue:!1,easing:"easeOutQuad",complete:function(){e.css("border","none"),e.velocity({height:0,padding:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){e.remove()}})}})}else e.velocity({translateX:0},{duration:100,queue:!1,easing:"easeOutQuad"});b=!1,c=!1}})})})}(jQuery),function(a){Materialize.scrollFire=function(a){var b=!1;window.addEventListener("scroll",function(){b=!0}),setInterval(function(){if(b){b=!1;for(var c=window.pageYOffset+window.innerHeight,d=0;d<a.length;d++){var e=a[d],f=e.selector,g=e.offset,h=e.callback,i=document.querySelector(f);if(null!==i){var j=i.getBoundingClientRect().top+window.pageYOffset;if(c>j+g&&e.done!==!0){if("function"==typeof h)h.call(this,i);else if("string"==typeof h){var k=new Function(h);k(i)}e.done=!0}}}}},100)}}(jQuery),function(a){"function"==typeof define&&define.amd?define("picker",["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):this.Picker=a(jQuery)}(function(a){function b(f,g,i,l){function m(){return b._.node("div",b._.node("div",b._.node("div",b._.node("div",y.component.nodes(t.open),v.box),v.wrap),v.frame),v.holder)}function n(){w.data(g,y).addClass(v.input).attr("tabindex",-1).val(w.data("value")?y.get("select",u.format):f.value),u.editable||w.on("focus."+t.id+" click."+t.id,function(a){a.preventDefault(),y.$root.eq(0).focus()}).on("keydown."+t.id,q),e(f,{haspopup:!0,expanded:!1,readonly:!1,owns:f.id+"_root"})}function o(){y.$root.on({keydown:q,focusin:function(a){y.$root.removeClass(v.focused),a.stopPropagation()},"mousedown click":function(b){var c=b.target;c!=y.$root.children()[0]&&(b.stopPropagation(),"mousedown"!=b.type||a(c).is("input, select, textarea, button, option")||(b.preventDefault(),y.$root.eq(0).focus()))}}).on({focus:function(){w.addClass(v.target)},blur:function(){w.removeClass(v.target)}}).on("focus.toOpen",r).on("click","[data-pick], [data-nav], [data-clear], [data-close]",function(){var b=a(this),c=b.data(),d=b.hasClass(v.navDisabled)||b.hasClass(v.disabled),e=h();e=e&&(e.type||e.href),(d||e&&!a.contains(y.$root[0],e))&&y.$root.eq(0).focus(),!d&&c.nav?y.set("highlight",y.component.item.highlight,{nav:c.nav}):!d&&"pick"in c?y.set("select",c.pick):c.clear?y.clear().close(!0):c.close&&y.close(!0)}),e(y.$root[0],"hidden",!0)}function p(){var b;u.hiddenName===!0?(b=f.name,f.name=""):(b=["string"==typeof u.hiddenPrefix?u.hiddenPrefix:"","string"==typeof u.hiddenSuffix?u.hiddenSuffix:"_submit"],b=b[0]+f.name+b[1]),y._hidden=a('<input type=hidden name="'+b+'"'+(w.data("value")||f.value?' value="'+y.get("select",u.formatSubmit)+'"':"")+">")[0],w.on("change."+t.id,function(){y._hidden.value=f.value?y.get("select",u.formatSubmit):""}),u.container?a(u.container).append(y._hidden):w.after(y._hidden)}function q(a){var b=a.keyCode,c=/^(8|46)$/.test(b);return 27==b?(y.close(),!1):void((32==b||c||!t.open&&y.component.key[b])&&(a.preventDefault(),a.stopPropagation(),c?y.clear().close():y.open()))}function r(a){a.stopPropagation(),"focus"==a.type&&y.$root.addClass(v.focused),y.open()}if(!f)return b;var s=!1,t={id:f.id||"P"+Math.abs(~~(Math.random()*new Date))},u=i?a.extend(!0,{},i.defaults,l):l||{},v=a.extend({},b.klasses(),u.klass),w=a(f),x=function(){return this.start()},y=x.prototype={constructor:x,$node:w,start:function(){return t&&t.start?y:(t.methods={},t.start=!0,t.open=!1,t.type=f.type,f.autofocus=f==h(),f.readOnly=!u.editable,f.id=f.id||t.id,"text"!=f.type&&(f.type="text"),y.component=new i(y,u),y.$root=a(b._.node("div",m(),v.picker,'id="'+f.id+'_root" tabindex="0"')),o(),u.formatSubmit&&p(),n(),u.container?a(u.container).append(y.$root):w.after(y.$root),y.on({start:y.component.onStart,render:y.component.onRender,stop:y.component.onStop,open:y.component.onOpen,close:y.component.onClose,set:y.component.onSet}).on({start:u.onStart,render:u.onRender,stop:u.onStop,open:u.onOpen,close:u.onClose,set:u.onSet}),s=c(y.$root.children()[0]),f.autofocus&&y.open(),y.trigger("start").trigger("render"))},render:function(a){return a?y.$root.html(m()):y.$root.find("."+v.box).html(y.component.nodes(t.open)),y.trigger("render")},stop:function(){return t.start?(y.close(),y._hidden&&y._hidden.parentNode.removeChild(y._hidden),y.$root.remove(),w.removeClass(v.input).removeData(g),setTimeout(function(){w.off("."+t.id)},0),f.type=t.type,f.readOnly=!1,y.trigger("stop"),t.methods={},t.start=!1,y):y},open:function(c){return t.open?y:(w.addClass(v.active),e(f,"expanded",!0),setTimeout(function(){y.$root.addClass(v.opened),e(y.$root[0],"hidden",!1)},0),c!==!1&&(t.open=!0,s&&k.css("overflow","hidden").css("padding-right","+="+d()),y.$root.eq(0).focus(),j.on("click."+t.id+" focusin."+t.id,function(a){var b=a.target;b!=f&&b!=document&&3!=a.which&&y.close(b===y.$root.children()[0])}).on("keydown."+t.id,function(c){var d=c.keyCode,e=y.component.key[d],f=c.target;27==d?y.close(!0):f!=y.$root[0]||!e&&13!=d?a.contains(y.$root[0],f)&&13==d&&(c.preventDefault(),f.click()):(c.preventDefault(),e?b._.trigger(y.component.key.go,y,[b._.trigger(e)]):y.$root.find("."+v.highlighted).hasClass(v.disabled)||y.set("select",y.component.item.highlight).close())})),y.trigger("open"))},close:function(a){return a&&(y.$root.off("focus.toOpen").eq(0).focus(),setTimeout(function(){y.$root.on("focus.toOpen",r)},0)),w.removeClass(v.active),e(f,"expanded",!1),setTimeout(function(){y.$root.removeClass(v.opened+" "+v.focused),e(y.$root[0],"hidden",!0)},0),t.open?(t.open=!1,s&&k.css("overflow","").css("padding-right","-="+d()),j.off("."+t.id),y.trigger("close")):y},clear:function(a){return y.set("clear",null,a)},set:function(b,c,d){var e,f,g=a.isPlainObject(b),h=g?b:{};if(d=g&&a.isPlainObject(c)?c:d||{},b){g||(h[b]=c);for(e in h)f=h[e],e in y.component.item&&(void 0===f&&(f=null),y.component.set(e,f,d)),("select"==e||"clear"==e)&&w.val("clear"==e?"":y.get(e,u.format)).trigger("change");y.render()}return d.muted?y:y.trigger("set",h)},get:function(a,c){if(a=a||"value",null!=t[a])return t[a];if("valueSubmit"==a){if(y._hidden)return y._hidden.value;a="value"}if("value"==a)return f.value;if(a in y.component.item){if("string"==typeof c){var d=y.component.get(a);return d?b._.trigger(y.component.formats.toString,y.component,[c,d]):""}return y.component.get(a)}},on:function(b,c,d){var e,f,g=a.isPlainObject(b),h=g?b:{};if(b){g||(h[b]=c);for(e in h)f=h[e],d&&(e="_"+e),t.methods[e]=t.methods[e]||[],t.methods[e].push(f)}return y},off:function(){var a,b,c=arguments;for(a=0,namesCount=c.length;a<namesCount;a+=1)b=c[a],b in t.methods&&delete t.methods[b];return y},trigger:function(a,c){var d=function(a){var d=t.methods[a];d&&d.map(function(a){b._.trigger(a,y,[c])})};return d("_"+a),d(a),y}};return new x}function c(a){var b,c="position";return a.currentStyle?b=a.currentStyle[c]:window.getComputedStyle&&(b=getComputedStyle(a)[c]),"fixed"==b}function d(){if(k.height()<=i.height())return 0;var b=a('<div style="visibility:hidden;width:100px" />').appendTo("body"),c=b[0].offsetWidth;b.css("overflow","scroll");var d=a('<div style="width:100%" />').appendTo(b),e=d[0].offsetWidth;return b.remove(),c-e}function e(b,c,d){if(a.isPlainObject(c))for(var e in c)f(b,e,c[e]);else f(b,c,d)}function f(a,b,c){a.setAttribute(("role"==b?"":"aria-")+b,c)}function g(b,c){a.isPlainObject(b)||(b={attribute:c}),c="";for(var d in b){var e=("role"==d?"":"aria-")+d,f=b[d];c+=null==f?"":e+'="'+b[d]+'"'}return c}function h(){try{return document.activeElement}catch(a){}}var i=a(window),j=a(document),k=a(document.documentElement);return b.klasses=function(a){return a=a||"picker",{picker:a,opened:a+"--opened",focused:a+"--focused",input:a+"__input",active:a+"__input--active",target:a+"__input--target",holder:a+"__holder",frame:a+"__frame",wrap:a+"__wrap",box:a+"__box"}},b._={group:function(a){for(var c,d="",e=b._.trigger(a.min,a);e<=b._.trigger(a.max,a,[e]);e+=a.i)c=b._.trigger(a.item,a,[e]),d+=b._.node(a.node,c[0],c[1],c[2]);return d},node:function(b,c,d,e){return c?(c=a.isArray(c)?c.join(""):c,d=d?' class="'+d+'"':"",e=e?" "+e:"","<"+b+d+e+">"+c+"</"+b+">"):""},lead:function(a){return(10>a?"0":"")+a},trigger:function(a,b,c){return"function"==typeof a?a.apply(b,c||[]):a},digits:function(a){return/\d/.test(a[1])?2:1},isDate:function(a){return{}.toString.call(a).indexOf("Date")>-1&&this.isInteger(a.getDate())},isInteger:function(a){return{}.toString.call(a).indexOf("Number")>-1&&a%1===0},ariaAttr:g},b.extend=function(c,d){a.fn[c]=function(e,f){var g=this.data(c);return"picker"==e?g:g&&"string"==typeof e?b._.trigger(g[e],g,[f]):this.each(function(){var f=a(this);f.data(c)||new b(this,c,d,e)})},a.fn[c].defaults=d.defaults},b}),function(a){"function"==typeof define&&define.amd?define(["picker","jquery"],a):"object"==typeof exports?module.exports=a(require("./picker.js"),require("jquery")):a(Picker,jQuery)}(function(a,b){function c(a,b){var c=this,d=a.$node[0],e=d.value,f=a.$node.data("value"),g=f||e,h=f?b.formatSubmit:b.format,i=function(){return d.currentStyle?"rtl"==d.currentStyle.direction:"rtl"==getComputedStyle(a.$root[0]).direction};c.settings=b,c.$node=a.$node,c.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse navigate create validate",view:"parse create validate viewset",disable:"deactivate",enable:"activate"},c.item={},c.item.clear=null,c.item.disable=(b.disable||[]).slice(0),c.item.enable=-function(a){return a[0]===!0?a.shift():-1}(c.item.disable),c.set("min",b.min).set("max",b.max).set("now"),g?c.set("select",g,{format:h}):c.set("select",null).set("highlight",c.item.now),c.key={40:7,38:-7,39:function(){return i()?-1:1},37:function(){return i()?1:-1},go:function(a){var b=c.item.highlight,d=new Date(b.year,b.month,b.date+a);c.set("highlight",d,{interval:a}),this.render()}},a.on("render",function(){a.$root.find("."+b.klass.selectMonth).on("change",function(){var c=this.value;c&&(a.set("highlight",[a.get("view").year,c,a.get("highlight").date]),a.$root.find("."+b.klass.selectMonth).trigger("focus"))}),a.$root.find("."+b.klass.selectYear).on("change",function(){var c=this.value;c&&(a.set("highlight",[c,a.get("view").month,a.get("highlight").date]),a.$root.find("."+b.klass.selectYear).trigger("focus"))})},1).on("open",function(){var d="";c.disabled(c.get("now"))&&(d=":not(."+b.klass.buttonToday+")"),a.$root.find("button"+d+", select").attr("disabled",!1)},1).on("close",function(){a.$root.find("button, select").attr("disabled",!0)},1)}var d=7,e=6,f=a._;c.prototype.set=function(a,b,c){var d=this,e=d.item;return null===b?("clear"==a&&(a="select"),e[a]=b,d):(e["enable"==a?"disable":"flip"==a?"enable":a]=d.queue[a].split(" ").map(function(e){return b=d[e](a,b,c)}).pop(),"select"==a?d.set("highlight",e.select,c):"highlight"==a?d.set("view",e.highlight,c):a.match(/^(flip|min|max|disable|enable)$/)&&(e.select&&d.disabled(e.select)&&d.set("select",e.select,c),e.highlight&&d.disabled(e.highlight)&&d.set("highlight",e.highlight,c)),d)},c.prototype.get=function(a){return this.item[a]},c.prototype.create=function(a,c,d){var e,g=this;return c=void 0===c?a:c,c==-(1/0)||c==1/0?e=c:b.isPlainObject(c)&&f.isInteger(c.pick)?c=c.obj:b.isArray(c)?(c=new Date(c[0],c[1],c[2]),c=f.isDate(c)?c:g.create().obj):c=f.isInteger(c)||f.isDate(c)?g.normalize(new Date(c),d):g.now(a,c,d),{year:e||c.getFullYear(),month:e||c.getMonth(),date:e||c.getDate(),day:e||c.getDay(),obj:e||c,pick:e||c.getTime()}},c.prototype.createRange=function(a,c){var d=this,e=function(a){return a===!0||b.isArray(a)||f.isDate(a)?d.create(a):a};return f.isInteger(a)||(a=e(a)),f.isInteger(c)||(c=e(c)),f.isInteger(a)&&b.isPlainObject(c)?a=[c.year,c.month,c.date+a]:f.isInteger(c)&&b.isPlainObject(a)&&(c=[a.year,a.month,a.date+c]),{from:e(a),to:e(c)}},c.prototype.withinRange=function(a,b){return a=this.createRange(a.from,a.to),b.pick>=a.from.pick&&b.pick<=a.to.pick},c.prototype.overlapRanges=function(a,b){var c=this;return a=c.createRange(a.from,a.to),b=c.createRange(b.from,b.to),c.withinRange(a,b.from)||c.withinRange(a,b.to)||c.withinRange(b,a.from)||c.withinRange(b,a.to)},c.prototype.now=function(a,b,c){return b=new Date,c&&c.rel&&b.setDate(b.getDate()+c.rel),this.normalize(b,c)},c.prototype.navigate=function(a,c,d){var e,f,g,h,i=b.isArray(c),j=b.isPlainObject(c),k=this.item.view;if(i||j){for(j?(f=c.year,g=c.month,h=c.date):(f=+c[0],g=+c[1],h=+c[2]),d&&d.nav&&k&&k.month!==g&&(f=k.year,g=k.month),e=new Date(f,g+(d&&d.nav?d.nav:0),1),f=e.getFullYear(),g=e.getMonth();new Date(f,g,h).getMonth()!==g;)h-=1;c=[f,g,h]}return c},c.prototype.normalize=function(a){return a.setHours(0,0,0,0),a},c.prototype.measure=function(a,b){var c=this;return b?"string"==typeof b?b=c.parse(a,b):f.isInteger(b)&&(b=c.now(a,b,{rel:b})):b="min"==a?-(1/0):1/0,b},c.prototype.viewset=function(a,b){return this.create([b.year,b.month,1])},c.prototype.validate=function(a,c,d){var e,g,h,i,j=this,k=c,l=d&&d.interval?d.interval:1,m=-1===j.item.enable,n=j.item.min,o=j.item.max,p=m&&j.item.disable.filter(function(a){if(b.isArray(a)){var d=j.create(a).pick;d<c.pick?e=!0:d>c.pick&&(g=!0)}return f.isInteger(a)}).length;if((!d||!d.nav)&&(!m&&j.disabled(c)||m&&j.disabled(c)&&(p||e||g)||!m&&(c.pick<=n.pick||c.pick>=o.pick)))for(m&&!p&&(!g&&l>0||!e&&0>l)&&(l*=-1);j.disabled(c)&&(Math.abs(l)>1&&(c.month<k.month||c.month>k.month)&&(c=k,l=l>0?1:-1),c.pick<=n.pick?(h=!0,l=1,c=j.create([n.year,n.month,n.date+(c.pick===n.pick?0:-1)])):c.pick>=o.pick&&(i=!0,l=-1,c=j.create([o.year,o.month,o.date+(c.pick===o.pick?0:1)])),!h||!i);)c=j.create([c.year,c.month,c.date+l]);return c},c.prototype.disabled=function(a){var c=this,d=c.item.disable.filter(function(d){return f.isInteger(d)?a.day===(c.settings.firstDay?d:d-1)%7:b.isArray(d)||f.isDate(d)?a.pick===c.create(d).pick:b.isPlainObject(d)?c.withinRange(d,a):void 0});return d=d.length&&!d.filter(function(a){return b.isArray(a)&&"inverted"==a[3]||b.isPlainObject(a)&&a.inverted}).length,-1===c.item.enable?!d:d||a.pick<c.item.min.pick||a.pick>c.item.max.pick},c.prototype.parse=function(a,b,c){var d=this,e={};return b&&"string"==typeof b?(c&&c.format||(c=c||{},c.format=d.settings.format),d.formats.toArray(c.format).map(function(a){var c=d.formats[a],g=c?f.trigger(c,d,[b,e]):a.replace(/^!/,"").length;c&&(e[a]=b.substr(0,g)),b=b.substr(g)}),[e.yyyy||e.yy,+(e.mm||e.m)-1,e.dd||e.d]):b},c.prototype.formats=function(){function a(a,b,c){var d=a.match(/\w+/)[0];return c.mm||c.m||(c.m=b.indexOf(d)+1),d.length}function b(a){return a.match(/\w+/)[0].length}return{d:function(a,b){return a?f.digits(a):b.date},dd:function(a,b){return a?2:f.lead(b.date)},ddd:function(a,c){return a?b(a):this.settings.weekdaysShort[c.day]},dddd:function(a,c){return a?b(a):this.settings.weekdaysFull[c.day]},m:function(a,b){return a?f.digits(a):b.month+1},mm:function(a,b){return a?2:f.lead(b.month+1)},mmm:function(b,c){var d=this.settings.monthsShort;return b?a(b,d,c):d[c.month]},mmmm:function(b,c){var d=this.settings.monthsFull;return b?a(b,d,c):d[c.month]},yy:function(a,b){return a?2:(""+b.year).slice(2)},yyyy:function(a,b){return a?4:b.year},toArray:function(a){return a.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(a,b){var c=this;return c.formats.toArray(a).map(function(a){return f.trigger(c.formats[a],c,[0,b])||a.replace(/^!/,"")}).join("")}}}(),c.prototype.isDateExact=function(a,c){var d=this;return f.isInteger(a)&&f.isInteger(c)||"boolean"==typeof a&&"boolean"==typeof c?a===c:(f.isDate(a)||b.isArray(a))&&(f.isDate(c)||b.isArray(c))?d.create(a).pick===d.create(c).pick:b.isPlainObject(a)&&b.isPlainObject(c)?d.isDateExact(a.from,c.from)&&d.isDateExact(a.to,c.to):!1},c.prototype.isDateOverlap=function(a,c){var d=this,e=d.settings.firstDay?1:0;return f.isInteger(a)&&(f.isDate(c)||b.isArray(c))?(a=a%7+e,a===d.create(c).day+1):f.isInteger(c)&&(f.isDate(a)||b.isArray(a))?(c=c%7+e,c===d.create(a).day+1):b.isPlainObject(a)&&b.isPlainObject(c)?d.overlapRanges(a,c):!1},c.prototype.flipEnable=function(a){var b=this.item;b.enable=a||(-1==b.enable?1:-1)},c.prototype.deactivate=function(a,c){var d=this,e=d.item.disable.slice(0);return"flip"==c?d.flipEnable():c===!1?(d.flipEnable(1),e=[]):c===!0?(d.flipEnable(-1),e=[]):c.map(function(a){for(var c,g=0;g<e.length;g+=1)if(d.isDateExact(a,e[g])){c=!0;break}c||(f.isInteger(a)||f.isDate(a)||b.isArray(a)||b.isPlainObject(a)&&a.from&&a.to)&&e.push(a)}),e},c.prototype.activate=function(a,c){var d=this,e=d.item.disable,g=e.length;return"flip"==c?d.flipEnable():c===!0?(d.flipEnable(1),e=[]):c===!1?(d.flipEnable(-1),e=[]):c.map(function(a){var c,h,i,j;for(i=0;g>i;i+=1){if(h=e[i],d.isDateExact(h,a)){c=e[i]=null,j=!0;break}if(d.isDateOverlap(h,a)){b.isPlainObject(a)?(a.inverted=!0,c=a):b.isArray(a)?(c=a,c[3]||c.push("inverted")):f.isDate(a)&&(c=[a.getFullYear(),a.getMonth(),a.getDate(),"inverted"]);break}}if(c)for(i=0;g>i;i+=1)if(d.isDateExact(e[i],a)){e[i]=null;break}if(j)for(i=0;g>i;i+=1)if(d.isDateOverlap(e[i],a)){e[i]=null;break}c&&e.push(c)}),e.filter(function(a){return null!=a})},c.prototype.nodes=function(a){var b=this,c=b.settings,g=b.item,h=g.now,i=g.select,j=g.highlight,k=g.view,l=g.disable,m=g.min,n=g.max,o=function(a,b){return c.firstDay&&(a.push(a.shift()),b.push(b.shift())),f.node("thead",f.node("tr",f.group({min:0,max:d-1,i:1,node:"th",item:function(d){return[a[d],c.klass.weekdays,'scope=col title="'+b[d]+'"']}})))}((c.showWeekdaysFull?c.weekdaysFull:c.weekdaysLetter).slice(0),c.weekdaysFull.slice(0)),p=function(a){return f.node("div"," ",c.klass["nav"+(a?"Next":"Prev")]+(a&&k.year>=n.year&&k.month>=n.month||!a&&k.year<=m.year&&k.month<=m.month?" "+c.klass.navDisabled:""),"data-nav="+(a||-1)+" "+f.ariaAttr({role:"button",controls:b.$node[0].id+"_table"})+' title="'+(a?c.labelMonthNext:c.labelMonthPrev)+'"')},q=function(d){var e=c.showMonthsShort?c.monthsShort:c.monthsFull;return"short_months"==d&&(e=c.monthsShort),c.selectMonths&&void 0==d?f.node("select",f.group({min:0,max:11,i:1,node:"option",item:function(a){return[e[a],0,"value="+a+(k.month==a?" selected":"")+(k.year==m.year&&a<m.month||k.year==n.year&&a>n.month?" disabled":"")]}}),c.klass.selectMonth+" browser-default",(a?"":"disabled")+" "+f.ariaAttr({controls:b.$node[0].id+"_table"
})+' title="'+c.labelMonthSelect+'"'):"short_months"==d?null!=i?f.node("div",e[i.month]):f.node("div",e[k.month]):f.node("div",e[k.month],c.klass.month)},r=function(d){var e=k.year,g=c.selectYears===!0?5:~~(c.selectYears/2);if(g){var h=m.year,i=n.year,j=e-g,l=e+g;if(h>j&&(l+=h-j,j=h),l>i){var o=j-h,p=l-i;j-=o>p?p:o,l=i}if(c.selectYears&&void 0==d)return f.node("select",f.group({min:j,max:l,i:1,node:"option",item:function(a){return[a,0,"value="+a+(e==a?" selected":"")]}}),c.klass.selectYear+" browser-default",(a?"":"disabled")+" "+f.ariaAttr({controls:b.$node[0].id+"_table"})+' title="'+c.labelYearSelect+'"')}return"raw"==d?f.node("div",e):f.node("div",e,c.klass.year)};return createDayLabel=function(){return null!=i?f.node("div",i.date):f.node("div",h.date)},createWeekdayLabel=function(){var a;a=null!=i?i.day:h.day;var b=c.weekdaysFull[a];return b},f.node("div",f.node("div",createWeekdayLabel(),"picker__weekday-display")+f.node("div",q("short_months"),c.klass.month_display)+f.node("div",createDayLabel(),c.klass.day_display)+f.node("div",r("raw"),c.klass.year_display),c.klass.date_display)+f.node("div",f.node("div",(c.selectYears?q()+r():q()+r())+p()+p(1),c.klass.header)+f.node("table",o+f.node("tbody",f.group({min:0,max:e-1,i:1,node:"tr",item:function(a){var e=c.firstDay&&0===b.create([k.year,k.month,1]).day?-7:0;return[f.group({min:d*a-k.day+e+1,max:function(){return this.min+d-1},i:1,node:"td",item:function(a){a=b.create([k.year,k.month,a+(c.firstDay?1:0)]);var d=i&&i.pick==a.pick,e=j&&j.pick==a.pick,g=l&&b.disabled(a)||a.pick<m.pick||a.pick>n.pick,o=f.trigger(b.formats.toString,b,[c.format,a]);return[f.node("div",a.date,function(b){return b.push(k.month==a.month?c.klass.infocus:c.klass.outfocus),h.pick==a.pick&&b.push(c.klass.now),d&&b.push(c.klass.selected),e&&b.push(c.klass.highlighted),g&&b.push(c.klass.disabled),b.join(" ")}([c.klass.day]),"data-pick="+a.pick+" "+f.ariaAttr({role:"gridcell",label:o,selected:d&&b.$node.val()===o?!0:null,activedescendant:e?!0:null,disabled:g?!0:null})),"",f.ariaAttr({role:"presentation"})]}})]}})),c.klass.table,'id="'+b.$node[0].id+'_table" '+f.ariaAttr({role:"grid",controls:b.$node[0].id,readonly:!0})),c.klass.calendar_container)+f.node("div",f.node("button",c.today,"btn-flat picker__today","type=button data-pick="+h.pick+(a&&!b.disabled(h)?"":" disabled")+" "+f.ariaAttr({controls:b.$node[0].id}))+f.node("button",c.clear,"btn-flat picker__clear","type=button data-clear=1"+(a?"":" disabled")+" "+f.ariaAttr({controls:b.$node[0].id}))+f.node("button",c.close,"btn-flat picker__close","type=button data-close=true "+(a?"":" disabled")+" "+f.ariaAttr({controls:b.$node[0].id})),c.klass.footer)},c.defaults=function(a){return{labelMonthNext:"Next month",labelMonthPrev:"Previous month",labelMonthSelect:"Select a month",labelYearSelect:"Select a year",monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysLetter:["S","M","T","W","T","F","S"],today:"Today",clear:"Clear",close:"Close",format:"d mmmm, yyyy",klass:{table:a+"table",header:a+"header",date_display:a+"date-display",day_display:a+"day-display",month_display:a+"month-display",year_display:a+"year-display",calendar_container:a+"calendar-container",navPrev:a+"nav--prev",navNext:a+"nav--next",navDisabled:a+"nav--disabled",month:a+"month",year:a+"year",selectMonth:a+"select--month",selectYear:a+"select--year",weekdays:a+"weekday",day:a+"day",disabled:a+"day--disabled",selected:a+"day--selected",highlighted:a+"day--highlighted",now:a+"day--today",infocus:a+"day--infocus",outfocus:a+"day--outfocus",footer:a+"footer",buttonClear:a+"button--clear",buttonToday:a+"button--today",buttonClose:a+"button--close"}}}(a.klasses().picker+"__"),a.extend("pickadate",c)}),function(a){function b(){var b=+a(this).attr("length"),c=+a(this).val().length,d=b>=c;a(this).parent().find('span[class="character-counter"]').html(c+"/"+b),e(d,a(this))}function c(b){var c=b.parent().find('span[class="character-counter"]');c.length||(c=a("<span/>").addClass("character-counter").css("float","right").css("font-size","12px").css("height",1),b.parent().append(c))}function d(){a(this).parent().find('span[class="character-counter"]').html("")}function e(a,b){var c=b.hasClass("invalid");a&&c?b.removeClass("invalid"):a||c||(b.removeClass("valid"),b.addClass("invalid"))}a.fn.characterCounter=function(){return this.each(function(){var e=a(this),f=e.parent().find('span[class="character-counter"]');if(!f.length){var g=void 0!==e.attr("length");g&&(e.on("input",b),e.on("focus",b),e.on("blur",d),c(e))}})},a(document).ready(function(){a("input, textarea").characterCounter()})}(jQuery),function(a){var b={init:function(b){var c={time_constant:200,dist:-100,shift:0,padding:0,full_width:!1,indicators:!1,no_wrap:!1};return b=a.extend(c,b),this.each(function(){function c(){"undefined"!=typeof window.ontouchstart&&(H[0].addEventListener("touchstart",l),H[0].addEventListener("touchmove",m),H[0].addEventListener("touchend",n)),H[0].addEventListener("mousedown",l),H[0].addEventListener("mousemove",m),H[0].addEventListener("mouseup",n),H[0].addEventListener("mouseleave",n),H[0].addEventListener("click",j)}function d(a){return a.targetTouches&&a.targetTouches.length>=1?a.targetTouches[0].clientX:a.clientX}function e(a){return a.targetTouches&&a.targetTouches.length>=1?a.targetTouches[0].clientY:a.clientY}function f(a){return a>=t?a%t:0>a?f(t+a%t):a}function g(a){var c,d,e,g,h,i,j;if(p="number"==typeof a?a:p,q=Math.floor((p+s/2)/s),e=p-q*s,g=0>e?1:-1,h=-g*e*2/s,d=t>>1,b.full_width?j="translateX(0)":(j="translateX("+(H[0].clientWidth-item_width)/2+"px) ",j+="translateY("+(H[0].clientHeight-item_width)/2+"px)"),I){var k=q%t,l=G.find(".indicator-item.active");l.index()!==k&&(l.removeClass("active"),G.find(".indicator-item").eq(k).addClass("active"))}for((!b.no_wrap||q>=0&&t>q)&&(i=o[f(q)],i.style[A]=j+" translateX("+-e/2+"px) translateX("+g*b.shift*h*c+"px) translateZ("+b.dist*h+"px)",i.style.zIndex=0,b.full_width?tweenedOpacity=1:tweenedOpacity=1-.2*h,i.style.opacity=tweenedOpacity,i.style.display="block"),c=1;d>=c;++c)b.full_width?(zTranslation=b.dist,tweenedOpacity=c===d&&0>e?1-h:1):(zTranslation=b.dist*(2*c+h*g),tweenedOpacity=1-.2*(2*c+h*g)),(!b.no_wrap||t>q+c)&&(i=o[f(q+c)],i.style[A]=j+" translateX("+(b.shift+(s*c-e)/2)+"px) translateZ("+zTranslation+"px)",i.style.zIndex=-c,i.style.opacity=tweenedOpacity,i.style.display="block"),b.full_width?(zTranslation=b.dist,tweenedOpacity=c===d&&e>0?1-h:1):(zTranslation=b.dist*(2*c-h*g),tweenedOpacity=1-.2*(2*c-h*g)),(!b.no_wrap||q-c>=0)&&(i=o[f(q-c)],i.style[A]=j+" translateX("+(-b.shift+(-s*c-e)/2)+"px) translateZ("+zTranslation+"px)",i.style.zIndex=-c,i.style.opacity=tweenedOpacity,i.style.display="block");(!b.no_wrap||q>=0&&t>q)&&(i=o[f(q)],i.style[A]=j+" translateX("+-e/2+"px) translateX("+g*b.shift*h+"px) translateZ("+b.dist*h+"px)",i.style.zIndex=0,b.full_width?tweenedOpacity=1:tweenedOpacity=1-.2*h,i.style.opacity=tweenedOpacity,i.style.display="block")}function h(){var a,b,c,d;a=Date.now(),b=a-C,C=a,c=p-B,B=p,d=1e3*c/(1+b),z=.8*d+.2*z}function i(){var a,c;w&&(a=Date.now()-C,c=w*Math.exp(-a/b.time_constant),c>2||-2>c?(g(x-c),requestAnimationFrame(i)):g(x))}function j(c){if(E)return c.preventDefault(),c.stopPropagation(),!1;if(!b.full_width){var d=a(c.target).closest(".carousel-item").index(),e=q%t-d;0!==e&&(c.preventDefault(),c.stopPropagation()),k(d)}}function k(a){var c=q%t-a;b.no_wrap||(0>c?Math.abs(c+t)<Math.abs(c)&&(c+=t):c>0&&Math.abs(c-t)<c&&(c-=t)),0>c?H.trigger("carouselNext",[Math.abs(c)]):c>0&&H.trigger("carouselPrev",[c])}function l(a){r=!0,E=!1,F=!1,u=d(a),v=e(a),z=w=0,B=p,C=Date.now(),clearInterval(D),D=setInterval(h,100)}function m(a){var b,c,f;if(r)if(b=d(a),y=e(a),c=u-b,f=Math.abs(v-y),30>f&&!F)(c>2||-2>c)&&(E=!0,u=b,g(p+c));else{if(E)return a.preventDefault(),a.stopPropagation(),!1;F=!0}return E?(a.preventDefault(),a.stopPropagation(),!1):void 0}function n(a){return r?(r=!1,clearInterval(D),x=p,(z>10||-10>z)&&(w=.9*z,x=p+w),x=Math.round(x/s)*s,b.no_wrap&&(x>=s*(t-1)?x=s*(t-1):0>x&&(x=0)),w=x-p,C=Date.now(),requestAnimationFrame(i),E&&(a.preventDefault(),a.stopPropagation()),!1):void 0}var o,p,q,r,s,t,u,v,w,x,z,A,B,C,D,E,F,G=a('<ul class="indicators"></ul>'),H=a(this),I=H.attr("data-indicators")||b.indicators;if(H.hasClass("initialized"))return a(this).trigger("carouselNext",[1e-6]),!0;if(b.full_width){b.dist=0;var J=H.find(".carousel-item img").first();J.length?imageHeight=J.load(function(){H.css("height",a(this).height())}):(imageHeight=H.find(".carousel-item").first().height(),H.css("height",imageHeight)),I&&H.find(".carousel-fixed-item").addClass("with-indicators")}H.addClass("initialized"),r=!1,p=x=0,o=[],item_width=H.find(".carousel-item").first().innerWidth(),s=2*item_width+b.padding,H.find(".carousel-item").each(function(b){if(o.push(a(this)[0]),I){var c=a('<li class="indicator-item"></li>');0===b&&c.addClass("active"),c.click(function(){var b=a(this).index();k(b)}),G.append(c)}}),I&&H.append(G),t=o.length,A="transform",["webkit","Moz","O","ms"].every(function(a){var b=a+"Transform";return"undefined"!=typeof document.body.style[b]?(A=b,!1):!0}),window.onresize=g,c(),g(p),a(this).on("carouselNext",function(a,b){void 0===b&&(b=1),x=p+s*b,p!==x&&(w=x-p,C=Date.now(),requestAnimationFrame(i))}),a(this).on("carouselPrev",function(a,b){void 0===b&&(b=1),x=p-s*b,p!==x&&(w=x-p,C=Date.now(),requestAnimationFrame(i))}),a(this).on("carouselSet",function(a,b){void 0===b&&(b=0),k(b)})})},next:function(b){a(this).trigger("carouselNext",[b])},prev:function(b){a(this).trigger("carouselPrev",[b])},set:function(b){a(this).trigger("carouselSet",[b])}};a.fn.carousel=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.carousel"):b.init.apply(this,arguments)}}(jQuery);;
var R={Game:{BetType_Sum:"和值",LottoSelectionTypeGroup_2351:"和值（7,20）",LottoSelectionType_ThreeNumber1:"三字 (组六)",LottoSelectionTypeGroup_1404:"一定位 (万)",SelectionType_SmallOdd:"小单",LottoSelectionTypeGroup_15311:"二定位 (十个)",LottoBetType_19061:"合尾质合 (十个)",LottoBetType_19071:"合尾质合 (百个)",LottoBetType_19021:"质合 (十)",LottoBetType_19031:"质合 (百)",CounterName_350:"福彩3D",LottoBetType_19011:"质合 (个)",LottoSelectionTypeGroup_23561:"和值 (三定位) (12, 15)",SelectionType_Small_Short:"小",LottoSelectionTypeGroup_2350:"和值（0-6）（21-27）",LottoSelectionTypeGroup_1403:"一定位 (千)",LottoSelectionTypeGroup_26001:"一字过关",LottoSelectionTypeGroup_1201:"二字（双重）",LottoSelectionTypeGroup_2201:"跨度（1,9）",SelectionType_Total810:"和值 810",LottoBetType_2600:"一字过关",LottoBetType_1508:"千百 | 二定位单号",LottoSelectionTypeGroup_23551:"和值 (三定位) (11,16)",LottoBetType_2306:"和值二定位 (千十)",LottoBetType_2307:"和值二定位 (万十)",LottoBetType_2304:"和值二定位 (万个)",LottoBetType_2305:"和值二定位",LottoBetType_2302:"和值二定位",LottoResultBetType_Small_Abbr1:"小",LottoBetType_1631:"百十个 | 三定位单号",LottoBetType_2301:"和值二定位",LottoSelectionTypeGroup_1402:"一定位 (百)",LottoResultBetType_Prime_Abbr1:"质",LottoSelectionTypeGroup_1200:"二字",LottoBetType_2309:"和值二定位 (万百)",LottoSelectionTypeGroup_2200:"跨度（0）",BetType_LastDigitOfSum:"和尾",LottoBetType_25021:"复式组合(十)",LottoBetType_25031:"复式组合(百)",LottoBetType_1711:"千十 | 和尾单双",LottoBetType_25011:"复式组合(个)",LottoSelectionTypeGroup_15321:"二定位 (百个)",LottoResultBetType_Big1:"大",LottoBetTypeGroup_13001:"三字",LottoSelectionTypeGroup_19001:"质合",LottoBetType_2310:"和值二定位 (万千)",LottoBetType_1706:"十个 | 和尾单双",LottoBetType_1707:"百个 | 和尾单双",LottoBetType_1704:"千 | 一定位单/双",LottoSelectionType_ThreeNumber:"三字 (组六)",LottoBetType_1702:"十 | 一定位单/双",LottoBetType_1703:"百 | 一定位单/双",LottoBetType_1701:"个 | 一定位单/双",LottoBetTypeGroup_1600:"三定位",LottoBetType_1708:"千个 | 和尾单双",LottoBetType_1709:"万个 | 和尾单双",Trend_Earth:"土",LottoBetTypeGroup_1900:"质合",LottoSelectionTypeGroup_23531:"和值 (三定位) (9, 18)",BetType_UpDown:"上下",BetType_LastDigitOddEven:"和尾单双",WagerStatus_Confirmed:"已确认",LottoBetType_10011:"一字 (后三)||一字 ",LottoSelectionTypeGroup_22041:"跨度 (4,6)",LottoBetType_1716:"百十个 | 和尾单双",LottoBetType_1717:"千百十 | 和尾单双",SelectionType_Odds:"奇",LottoBetType_1715:"万千 | 和尾单双",LottoBetType_1712:"万十 | 和尾单双",LottoBetType_1713:"千百 | 和尾单双",LottoBetType_1710:"百十 | 和尾单双",LottoSelectionTypeGroup_2500:"复式组合",LottoResultBetType_Odd:"单",CounterName_330:"江西",LottoBetType_1718:"万千百 | 和尾单双",BetType_PearlBall_Short:"珠仔",LottoBetTypeGroup_1800:"大小",LottoBetType_1816:"百十个 | 和尾大小",LottoSelectionTypeGroup_22031:"跨度 (3,7)",LottoBetTypeGroup_22001:"跨度",LottoBetTypeGroup_23501:"和值三定位",LottoSelectionTypeGroup_25001:"複式組合",LottoSelectionTypeGroup_1508:"二定位 (千百)",LottoBetType_BigSmall_Short:"大小",LottoSelectionTypeGroup_2204:"跨度（4,6）",LottoBetType_1806:"十个 | 和尾大小",LottoBetType_1807:"百个 | 和尾大小",LottoBetType_1804:"千 | 一定位大/小",LottoBetType_1805:"万 | 一定位大/小",LottoBetType_1802:"十 | 一定位大/小",LottoBetType_1803:"百 | 一定位大/小",Trend_Down:"下",LottoBetType_1801:"个 | 一定位大/小",LottoSelectionTypeGroup_2006:"选10",LottoSelectionTypeGroup_12011:"二字（双重）",LottoSelectionTypeGroup_22021:"跨度 (2,8)",LottoResultBetType_Odd_Abbr1:"单",LottoBetType_1808:"千个 | 和尾大小",LottoBetType_1809:"万个 | 和尾大小",LottoSelectionTypeGroup_1800:"大小",BetType_Total:"总额",LottoBetType_19101:"合尾质合 (百十)",SelectionType_SmallEven_Short:"小/双",LottoResultBetType_CombinedBig:"合大",LottoResultBetType_Composite_Abbr1:"合",LottoSelectionTypeGroup_1631:"三定位",LottoResultBetType_Even:"双",LottoBetType_1817:"千百十 | 和尾大小",LottoBetType_1814:"万百 | 和尾大小",LottoBetType_1815:"万千 | 和尾大小",SelectionType_4thDigit:"千",LottoBetType_1813:"千百 | 和尾大小",LottoBetType_1810:"百十 | 和尾大小",LottoBetType_1811:"千十 | 和尾大小",LottoSelectionTypeGroup_2005:"选9",LottoSelectionTypeGroup_12001:"二字",SelectionType_1stDigit:"个",LottoBetType_1818:"万千百 | 和尾大小",BetType_Span:"跨度",BetType_LastDigitBigSmall:"和尾大小",BetType_3_FixedDigit:"三定位",SelectionType_SmallEven:"小双",SelectionType_Down:"下",LottoBetTypeGroup_2200:"跨度",LottoSelectionTypeGroup_2004:"选8",Trend_Even:"双",LottoSelectionTypeGroup_1400:"一定位",BetType_UpDown_Short:"上下",LottoBetTypeGroup_1400:"一定位",Trend_Tie:"和",LottoSelectionTypeGroup_1510:"二定位 (万千)",LottoBetTypeGroup_2100:"组选六",LottoBetType_OddEven:"一定位单/双",LottoSelectionTypeGroup_14321:"一定位 (百)",LottoSelectionType_ThreeNumberTriple1:"三字 (豹子)",Trend_Odd:"单",LottoSelectionTypeGroup_2305:"和值（9），",LottoSelectionTypeGroup_2003:"选7",LottoSelectionTypeGroup_1501:"二定位 (十个)",LottoBetType_2308:"和值二定位 (千百)",ResultBall_Wood:"木",BetType_UpTieDown_Short:"上/和/下",LottoBetTypeGroup_2000:"组选三",LottoBetType_1603:"万千百 | 三定位单号",LottoBetTypeGroup_17001:"单双",LottoSelectionTypeGroup_14311:"一定位 (十)",LottoSelectionTypeGroup_2304:"和值（8,10）",LottoSelectionTypeGroup_2002:"选6",LottoBetType_1906:"两面质合",LottoBetType_1907:"两面质合",LottoBetType_1904:"质合 (千)",LottoResultBetType_Small1:"小",LottoBetType_1902:"两面质合",LottoBetType_1903:"两面质合",LottoResultBetType_Composite1:"合",LottoBetType_1901:"两面质合",SelectionType_Evens:"偶",CounterName_340:"天津",LottoBetType_1908:"合尾质合 (千个)",LottoResultBetType_Odd_Abbr:"单",LottoSelectionTypeGroup_14301:"一定位 (个)",LottoBetType_2413:"和尾 (前三)",LottoResultBetType_Odd1:"单",LottoBetType_26001:"一字过关",LottoSelectionTypeGroup_2303:"和值（7,11）",LottoBetType_1916:"合尾质合 (后三)||合尾质合",LottoBetType_1917:"合尾质合 (中三)",LottoResultBetType_Even1:"双",LottoBetType_1915:"合尾质合 (万千)",LottoBetType_1912:"合尾质合 (万十)",LottoBetType_1913:"合尾质合 (千百)",LottoBetType_1910:"两面质合",LottoBetType_1911:"合尾质合 (千十)",LottoBetType_23051:"和值二定位 (百十)",LottoBetType_23021:"和值二定位 (百个)",LottoBetType_23011:"和值二定位 (十个)",LottoBetType_1918:"合尾质合 (前三)",ResultBall_Small:"小",LottoBetTypeGroup_2600:"一字过关",LottoSelectionTypeGroup_1302:"豹子",LottoSelectionTypeGroup_2302:"和值（6,12）",LottoSelectionTypeGroup_1100:"一字 (全五)",LottoSelectionType_ThreeNumberDouble1:"三字 (组三)",LottoSelectionTypeGroup_18001:"大小",LottoResultPosition_ThreeDigit:"百",BetType_FiveElement:"五行",LottoSelectionTypeGroup_1535:"二定位（00X）",Trend_Small:"小",LottoBetType_1431:"个 | 一定位单号",LottoSelectionTypeGroup_2352:"和值（8,19）",LottoBetTypeGroup_18001:"大小",LottoBetType_1503:"千个 | 二定位单号",LottoSelectionTypeGroup_17002:"单双",LottoSelectionType_ThreeNumberTriple:"三字 (豹子)",LottoBetTypeGroup_2500:"复式组合",LottoSelectionTypeGroup_1603:"三定位 (前三)",LottoSelectionTypeGroup_1401:"一定位 (十)",SelectionType_Up:"上",ResultBall_Gold:"金",BetType_FiveElement_Short:"五行",LottoBetType_1002:"一字 (中三)",LottoBetType_1003:"一字 (前三)",LottoBetType_1001:"百十个 | 一字",LottoBetType_1602:"千百十 | 三定位单号",LottoBetTypeGroup_2400:"和尾",LottoSelectionTypeGroup_1602:"三定位 (中三)",Trend_Up:"上",BetType_OddsEvens_Short:"奇偶",SelectionType_Odd:"单",LottoResultBetType_Small_Abbr:"小",LottoSelectionTypeGroup_2400:"和尾",BetType_2Digits_Double:"双重",LottoBetType_2411:"和尾",SelectionType_Big_Short:"大",CounterName_320:"重庆",ResultBall_Up:"上",BetType_1_FixedDigit:"一定位",LottoSelectionTypeGroup_23521:"和值 (三定位) (8, 19)",LottoResultBetType_Even_Abbr1:"双",LottoSelectionTypeGroup_1502:"二定位 (百个)",SelectionType_Fire:"火",LottoSelectionTypeGroup_22001:"跨度 (0)",LottoBetTypeGroup_1300:"三字",LottoResultBetType_CombinedEven1:"合双",SelectionType_PearlBall:"珠仔",LottoSelectionTypeGroup_22051:"跨度 (5)",BetType_PearlBall:"珠仔",LottoSelectionTypeGroup_1532:"二定位（为0x0）",LottoSelectionTypeGroup_23511:"和值 (三定位) (7, 20)",LottoResultBetType_Composite:"合",LottoSelectionTypeGroup_1509:"二定位 (万百)",LottoSelectionTypeGroup_1700:"单双",ResultBall_Water:"水",LottoBetType_2002:"组选三 (中三)",LottoBetType_2003:"组选三 (前三)",LottoBetType_2001:"组选三",Trend_Fire:"火",LottoSelectionTypeGroup_1531:"二定位（X00）",ResultBall_Odd:"单",LottoBetType_1714:"万百 | 和尾单双",LottoSelectionTypeGroup_23501:"和值 (三定位) (0-6, 21-27)",LottoBetType_1601:"百十个 | 三定位单号",WagerStatus_Open:"未结帐",LottoBetType_2352:"和值三定位 (中三)",LottoBetType_2353:"和值三定位 (前三)",LottoBetType_2351:"百十个 | 和值",LottoBetTypeGroup_1100:"一字全五",LottoBetType_2303:"和值二定位 (千个)",LottoBetTypeGroup_12001:"二字",ResultBall_Earth:"土",LottoResultBetType_Prime1:"质",LottoBetType_1404:"千 | 一定位单号",LottoBetType_1405:"万 | 一定位单号",LottoBetType_1402:"十 | 一定位单号",LottoBetType_1403:"百 | 一定位单号",LottoBetType_1401:"个 | 一定位单号",Trend_Gold:"金",LottoSelectionType_ThreeNumberDouble:"三字 (组三)",SelectionType_Tie:"和",LottoResultBetType_CombinedSmall1:"合小",SelectionType_BigEven:"大双",Trend_Odds:"奇",LottoBetTypeGroup_1000:"一字",LottoBetType_1101:"一字 (全五)",LottoResultBetType_Prime:"质",SelectionType_Wood:"木",LottoSelectionTypeGroup_2354:"和值（10,17）",WagerCancelReason_OfficialResultSuspend:"官方网站没开奖",SelectionType_BigOdd:"大单",LottoSelectionTypeGroup_22011:"跨度 (1,9)",LottoSelectionTypeGroup_2205:"跨度（5）",SelectionType_3rdDigit:"百",LottoResultBetType_Big:"大",LottoBetType_1507:"万十 | 二定位单号",LottoBetTypeGroup_1700:"单双",LottoResultBetType_CombinedOdd:"合单",LottoSelectionTypeGroup_14001:"一定位 (个)",LottoResultBetType_Small:"小",BetType_3Digits_3x3:"组三",SelectionType_BigOdd_Short:"大/单",LottoSelectionTypeGroup_1506:"二定位 (千十)",BetType_OddEven_Short:"单双",LottoResultPosition_OneDigit:"个",ResultBall_Fire:"火",BetType_OddEven:"单双",Trend_Big:"大",BetType_OddsTieEvens_Short:"奇/和/偶",LottoBetType_2406:"和尾 (千十)",LottoBetType_2407:"和尾 (万十)",LottoBetType_2404:"和尾 (万个)",LottoBetType_2405:"和尾",LottoBetType_2402:"和尾",LottoBetType_2403:"和尾 (千个)",LottoBetType_2401:"和尾",LottoSelectionTypeGroup_24001:"和尾",LottoBetType_2102:"组选六 (中三)",LottoBetType_2408:"和尾 (千百)",LottoBetType_2409:"和尾 (万百)",LottoBetType_1432:"十 | 一定位单号",LottoBetType_1433:"百 | 一定位单号",LottoBetType_2103:"组选六 (前三)",LottoBetType_BigSmall:"一定位大/小",LottoBetType_2101:"组选六",LottoResultBetType_Even_Abbr:"双",LottoSelectionTypeGroup_2203:"跨度（3,7）",LottoSelectionTypeGroup_2001:"组选六",LottoBetType_2412:"和尾 (中三)",LottoBetTypeGroup_1500:"二定位",LottoBetType_2410:"和尾 (万千)",BetType_Total810:"和值 810",BetType_3Digits:"三字",LottoResultPosition_TwoDigit:"十",LottoSelectionTypeGroup_20001:"组选三",ResultBall_Big:"大",LottoResultBetType_CombinedEven:"合双",LottoResultBetType_CombinedOdd1:"合单",LottoSelectionTypeGroup_1504:"二定位 (万个)",LottoBetType_1506:"千十 | 二定位单号",LottoSelectionTypeGroup_17001:"单双",LottoSelectionTypeGroup_2202:"跨度（2,8）",LottoSelectionTypeGroup_1000:"一字",LottoBetType_1502:"百个 | 二定位单号",BetType_3rd2nd1st:"百十个",LottoSelectionTypeGroup_2000:"组选三",LottoBetType_1501:"十个 | 二定位单号",LottoSelectionTypeGroup_16311:"三定位 (前三)",SelectionType_SmallOdd_Short:"小/单",CounterName_360:"新疆",BetType_2Digits:"二字",LottoBetType_1509:"万百 | 二定位单号",LottoSelectionTypeGroup_1507:"二定位 (万十)",BetType_BigSmall:"大小",LottoSelectionTypeGroup_23541:"和值 (三定位) (10, 17)",LottoBetType_1504:"万个 | 二定位单号",SelectionType_Odd_Short:"单",LottoSelectionTypeGroup_1503:"二定位 (千个)",ResultBall_Odds:"奇",LottoResultPosition_FiveDigit:"万",LottoSelectionTypeGroup_1301:"组三",ResultBall_Down:"下",LottoSelectionTypeGroup_2301:"和值（5,13）",LottoBetType_1510:"万千 | 二定位单号",BetType_Big810Small_Short:"大/810/小",SelectionType_BigEven_Short:"大/双",LottoResultBetType_CombinedBig1:"合大",Trend_Water:"水",BetType_BigSmall_Short:"大小",LottoResultBetType_Prime_Abbr:"质",SelectionType_5thDigit:"万",Trend_Wood:"木",LottoBetType_1705:"万 | 一定位单/双",LottoSelectionTypeGroup_1300:"组六",SelectionType_Gold:"金",LottoSelectionTypeGroup_2300:"和值（0-4）（4-18）",CounterName_310:"上海",LottoSelectionTypeGroup_23051:"和值 (二定位) (9)",LottoSelectionTypeGroup_23011:"和值 (二定位) (5, 13)",SelectionType_Big:"大",SelectionType_Even_Short:"双",WagerCancelReason_BetCancelled:"注单取消",LottoResultBetType_Big_Abbr:"大",LottoBetType_2502:"复式组合（十）",LottoBetType_2503:"复式组合（百）",LottoBetType_2500:"复式组合",LottoBetType_2501:"复式组合（个）",LottoBetTypeGroup_10001:"一字",LottoSelectionTypeGroup_1601:"三定位 (后三)",LottoBetType_1535:"百十 | 二定位单号",LottoBetType_1532:"百个 | 二定位单号",LottoBetType_1531:"十个 | 二定位单号",LottoSelectionTypeGroup_20011:"组选六",LottoSelectionTypeGroup_1432:"一定位（0XX）",LottoBetTypeGroup_1200:"二字",LottoResultBetType_Big_Abbr1:"大",LottoResultPosition_FourDigit:"千",SelectionType_Water:"水",ResultBall_Even:"双",LottoBetType_20011:"组选三 (后三)||组选三 ",LottoSelectionTypeGroup_23041:"和值 (二定位) (8, 10)",LottoResultBetType_CombinedSmall:"合小",LottoSelectionTypeGroup_2600:"一字过关",LottoBetType_1505:"百十 | 二定位单号",LottoBetType_1909:"合尾质合 (万个)",LottoSelectionTypeGroup_10001:"一字",LottoSelectionTypeGroup_1431:"一定位（x0x）",LottoBetType_1202:"二字 (中三)",LottoBetType_1203:"二字 (前三)",WagerStatus_Cancelled:"取消",LottoBetType_1201:"百十个 | 二字",ResultBall_Tie:"和",BetType_BigSmallOddEven:"大小 & 单双",LottoSelectionTypeGroup_13021:"三字 (豹子)",LottoBetType_1905:"质合 (万)",LottoSelectionTypeGroup_23031:"和值 (二定位) (7, 11)",LottoSelectionTypeGroup_2355:"和值（11,16）",LottoSelectionTypeGroup_1505:"二定位 (百十)",LottoSelectionTypeGroup_1430:"一定位（xx0）",LottoBetType_24111:"和尾 (后三)||和尾 ",LottoBetTypeGroup_14001:"一定位",SelectionType_Earth:"土",BetType_3Digits_3x6:"组六",LottoBetType_OddEven_Short:"单双",LottoSelectionTypeGroup_15351:"二定位 (百十)",LottoSelectionTypeGroup_13011:"三字 (組三)",LottoSelectionTypeGroup_1900:"质合",LottoSelectionTypeGroup_23021:"和值 (二定位) (6, 12)",LottoBetTypeGroup_2300:"和值二定位",BetType_1Digit:"一字",LottoBetTypeGroup_2350:"三定位总和",LottoResultBetType_Composite_Abbr:"合",Trend_Evens:"偶",LottoSelectionTypeGroup_13001:"三字 (組六)",LottoBetType_2202:"跨度 (中三)",LottoBetType_2203:"跨度 (前三)",LottoBetType_2201:"百十个 | 跨度",BetType_2_FixedDigit:"二定位",LottoSelectionTypeGroup_2357:"和值（13,14）",LottoSelectionTypeGroup_2353:"和值（9,18）",SelectionType_Even:"双",SelectionType_2ndDigit:"十",LottoBetType_24051:"和尾 (百十)",LottoBetType_24021:"和尾 (百个)",BetType_3Digits_Triple:"豹子",LottoBetType_24011:"和尾 (十个)",LottoSelectionTypeGroup_23001:"和值 (二定位) (0-4, 14-18)",LottoBetType_21011:"组选六 (后三)||组选六 ",LottoBetType_1914:"合尾质合 (万百)",BetType_OddsEvens:"奇偶",CounterName_5:"加拿大",CounterName_4:"加拿大西部",ResultBall_Evens:"偶",CounterName_6:"马耳他",CounterName_1:"北京快乐8",CounterName_3:"澳洲ACTTAB",CounterName_2:"斯洛伐克",LottoSelectionTypeGroup_2356:"和值（12,15）",LottoBetType_1302:"三字 (中三)",LottoBetType_1303:"三字 (前三)",LottoBetType_1301:"百十个 | 三字",LottoBetType_1812:"万十 | 和尾大小",SelectionType_Small:"小",LottoSelectionTypeGroup_23571:"和值 (三定位) (13, 14)"},Message:{BS_BetNotAllowAfterDrawDate:"盘口已关闭。",BS_GameProfileMemberSettingItemNotFound:"无法找到会员设定。",Error_Captcha:"请输入正确的验证号码。",BS_ExceedMemberAccumulateBetAmount:"投注额已超出您最高投注额",BS_BetExceedProfileMaxBet:"投注额已超出最高限额。",BS_BetExeceedProfileMaxPayout:"可赢额已超出最高派彩金额。",BS_PauseAllBet:"彩期正在更新中。。。",BS_InactiveMember:"您的帐户已被冻结。",BS_GameProfileSettingNotFound:"无法找到投注设定。",BS_OddsDifferent:"赔率已更新。",Error_PageNotFound:"此页面不存在。 ",Layer_InProgress:"进行中。。。",BS_StakeMustGreaterThanZero:"投注额必须大于0。",BS_EstimatePayoutNotTally:"赔率已更新。",BS_InvalidOddsRange:"无法确认赔率。",BS_GameProfileSettingNotActive:"投注设定已被停用。",EnumError_INTEGRATION_PARTNER_GREATERTHANMAXBET:"投注额已超出最高限额。",BS_LessThanMemberMinBet:"投注额不能低于最低限额。",Error_InternalServerErrorHeader:"500 内部服务器错误",BS_MemberNotFound:"无法找到会员。",BS_InactiveCounter:"此游戏盘口已被停用。",BS_ExceedPartnerMemberPayout:"您已超过今天的赢输限额。请明天再来投注。",RecommendedBrowsers:"推荐浏览器为 <a href=&quot;http://windows.microsoft.com/zh-cn/internet-explorer/products/ie/home&quot; target=&quot;_blank&quot;>微软IE9</a>，<a href=&quot;http://www.google.com/chrome?hl=zh-CN&quot; target=&quot;_blank&quot;>谷歌Chrome</a>，<a href=&quot;http://firefox.com.cn/&quot; target=&quot;_blank&quot;>火狐Firefox</a> 以及 <a href=&quot;http://www.apple.com.cn/safari/download/&quot; target=&quot;_blank&quot;>苹果Safari</a>。",Error_NoPermission:"您没有权限访问此页面。",BS_CounterClosed:"盘口已关闭。",EnumError_INTEGRATION_PARTNER_MAXWINLOSSLIMITDAY:"您已超过今天的赢输限额。请明天再来投注。",BS_WrongSetting:"设定错误。",BS_ExceedPartnerMemberUplinePayout:"您的上线每日可输金额已超过，无法进行投注！",BS_ExceedAccumulatePayout:"此投注选项暂时无法受注。请稍后再试。",EnumError_INTEGRATION_INACTIVE_BU:"系统目前无法访问。<br /><br />请联系客服中心寻求帮助。",Error_SessionTimeOutHeader:"登入状态已无效",Maintenance_DateTimeFormat:"dd/MM/yyyy HH:mm",BS_CounterPaused:"系统正在更新彩期资料，请稍后。",Error_Login:"登入帐号或密码不正确。",ConfirmToClearAllWagers:"确认删除所有投注？",Layer_StopBetting:"停止下注",BS_NotAllowDuplicatePearlBallNumber:"您输入的珠仔号码已重叠。",Error_ClickToLogin_Format:"请点击<a href=&quot;{0}&quot; target=&quot;_top&quot; class=&quot;link-style3&quot;>这里</a>登录。",Error_NotAuthorized:"请先登录。",Layer_MarketIsClosed:"盘口已关闭",Error_ServerInternal:"由于技术错误，我们无法执行您的请求。",EnumError_OPA_User_MEMBER_CURRENCY_BU_NOT_SUPPORTED:"会员货币并不在营商可用货币选择里。",EnumError_INTEGRATION_PARTNER_UPLINEMAXLOSSLIMITDAY:"您的上线每日可输金额已超过，无法进行投注！",Maintenance_ToServeYou:"为了更好地为您服务，我们目前正在执行系统维护。<br />对所造成的不方便，我们深表歉意。",BS_DrawNotOpen:"彩期盘口已关闭。",BS_ExceedMarginControl:"投注已超出这期最高奖金",EnumError_INTEGRATION_INACTIVE_MEMBER:"您的帐号已被停用。",Layer_NextDrawSoon:"下一期即将开放投注。。。",TooManyWagers:"请勿在同一时间下超过 {0} 注",BS_NA:"下注失败",BS_Unknown:"下注失败",Layer_WaitingForDrawResult:"等待开奖。。。",Error_PageNotFoundHeader:"404 此页面不存在",BS_GameProfileBuSettingItemNotFound:"无法找到公司投注设定。",BS_ExceedPearlBallNumberRange:"请输入正确的珠仔号码。",Error_Forbidden:"您所在地区被禁止访问我们的网址。<br/><br/>给您造成不便，敬请谅解。",Error_KickOut:"您的登入状态已无效。",Error_SessionTimeOut:"您的登入状态已无效。<br/><br/>请重新打开快乐彩游戏会员端。",TT_Password:"密码至少6个字英文字母，只能在'a-z','A-Z','0-9', '!@#$%^&*().'的范围内",BS_StakeMustValidNumber:"请输入有效的数字。",Disclaimer:"所有交易的日期和时间记载是以GMT +08:00 (北京时间)为根据。",BS_InsufficientMemberBalance:"投注额超出您的帐户余额。",BS_InactiveBusinessUnit:"公司已被冻结。",BS_GreaterThanMemberMaxBet:"投注额已超出最高限额。",RecommendedResolution:"推荐分辨率为1280× 768及以上。",BS_GameProfileMultiplierNotFound:"无法找到投注设定。",BS_BetLessThanProfileMinBet:"投注额不能低于最低限额。",Error_AccessDeniedHeader:"403 访问被拒绝",BS_CounterNotOpen:"盘口已关闭。",EnumError_INTEGRATION_PARTNER_LESSTHANMINBET:"投注额不能低于最低限额。"},Text:{Title_BetTransactionDetails:"帐户历史详情",KickedOutTitle:"登出",Btn_Clear:"清除",Link_Statement:"帐户历史",Lbl_Hot:"热门",TH_DrawNo:"期号",Tab_BetTransaction:"下注详情",OK:"确定",WagerNo:"注单编号",Ball_5th:"万",Lbl_Draw:"期号",Cold:"冷门",Update:"修改",TT_GoToResultsPage:"打开开奖结果页面",NoMainLobbyURL:"网址不存在",PageTitleHome:"快乐彩",SelectAtLeastOnePearlBall:"请选择至少一个号码。",SessionTimeOut:"您的登入状态已无效。<br/><br/>请重新打开快乐彩游戏会员端。",Lbl_Drawing:"开奖中",Wager_2_numbers:"两个号码",NoRecordFound:"没有记录",TH_CounterDrawNo:"彩期详情",TotalBet:"注单总数",Ball:"彩球",PageTitleResults:"开奖结果",PlaceBetFailed:"下注失败。",TT_MoreLastBets:"打开下注状况",Refresh:"刷新",TH_Total:"总和",Btn_SkipForNext:"跳过开奖，<br />继续下一期投注",Lbl_To:"到",Btn_LaunceGameClient:"启动快乐彩客户端",Btn_Print:"打印",Hot:"热门",Title_OpenBets:"下注状况",TH_Date:"日期",Earth:"土",Lbl_Counter:"开彩国家",TT_Refresh:"刷新",Ball_2nd:"十",Lbl_UpcomingDraws:"开盘时间",BetSlip:"注单",PageTitleMainLobby:"大堂",PageTitleSingleCounter:"单一开彩国家",PleaseSelect3Number:"组六/组三/豹子",TT_GoToNextDrawNo:"转到下一期结果",Lbl_EstWinning:"可赢额",TH_BetType:"投注类型",Wager_1_numbers:"一个号码",TT_GoToThisCounter:"切换此游戏玩法界面",GameDrawResultVoidReason_NA:"N/A",Link_Rules:"规则说明",TransferIn:"转入",TH_TotalStake:"总计投注额",TH_No:"序号",Add:"加入",Btn_NextDraw:"下一期",Title_Results:"开奖结果",UpdatedSuccessfully:"修改成功。",EnterStakeAmount:"请输入投注金额。",TH_DateTime:"日期/时间",PageTitleStatementDetails:"帐户历史详情",PageTitleNotAuthorized:"登入状态已无效",Tab_Transfer:"转账",PleaseSelect2Number:"两码/对子",Lbl_UpcomingTournaments:"即将到来的比赛",PageTitleRules:"规则说明",ProductKeno:"快乐彩",TH_BetDetails:"投注详情",Title_Statement:"帐户历史",Btn_Last30Days:"过去30天",MemberStatusIsNotActive:"您的帐户已被停用。",Wager_3_numbers:"三个号码",BetResults:"开奖结果",ProductLotto:"时时彩",PageTitleStatement:"帐户历史",Lbl_Singles:"单式",TH_NoOfTransfer:"转账计数",Odd:"单",Link_Deposit:"存款",Lbl_TotalEstWinning:"总计可赢额",Btn_Close:"关闭",Btn_Yesterday:"昨天",MoreBetTypes:"更多投注类型",Tie:"和",Up:"上",Title_ManualInput:"手动输入",Title_ImportantAnnouncement:"重要公告",Btn_LastMonth:"上月",PageTitleError:"500 内部服务器错误",Lbl_MinBet:"最低限额",TokenSizeNotFound:"筹码大小不存在. 请再次储存.",Link_Profile:"会员资料",TT_Close:"关闭",Btn_More:"更多",Btn_Last8Days:"过去8天",Lbl_NextDraw:"下一期",TH_TransferIn:"转入",Btn_Refresh:"刷新",DateFormat:"yy/mm/dd",Link_OfficialSite:"官方网站",TH_Status:"状况",OfficialResultSuspended:"官方网站没开奖",Off:"关",OfficialEventCancelled:"彩期取消",Title_StatementDetails:"帐户历史详情",TH_Announcement:"公告栏",Down:"下",TransferOut:"转出",Odds:"奇",Lbl_Total:"总计",Close:"关闭",Btn_Cancel:"取消",Link_Setting:"设定",Ball_1st:"个",Lbl_321_Ball:"百十个彩球",Lbl_Numbers:"号码",PageTitleSystemMaintenance:"系统维护",Btn_Back:"返回",Home:"主页",TH_TransactionType:"交易类别",Total810:"和值 810",PlacedBetSuccessfully:"下注成功。",TT_WinningNumbers:"中奖号码",Link_BackToLobby:"返回大厅",TT_SwitchTrendView:"切换路子视图",Link_Results:"开奖结果",TH_Stake:"投注额",Wager_4_numbers:"四个号码",Btn_PlaceBet:"下注",Lbl_Date:"日期",TH_Number:"序号",GameDrawResultVoidReason_OfficialResultSuspended:"官方网站没开奖",Lbl_TokenSize:"筹码大小 : ",TH_RefNo:"参考号",Even:"双",Big:"大",Btn_Today:"今天",PleaseEnterNumber:"请输入有效的数字。",TT_SwitchStatisticsView:"切换数据分析",Digit:"一定位单号",Link_Win:"赢",PageTitleForbidden:"403 访问被拒绝",Wager_5_numbers:"五个号码",Link_OpenBets:"下注状况",Lbl_Cold:"冷门",Btn_ThisMonth:"本月",Lbl_LoginName:"登录名 : ",PleaseSelect1Number:"定位",Lbl_H_C:"热/冷",Lbl_Stake:"投注额",SureToPlaceBet:"您确定要下注吗？",Ball_4th:"千",Error:"错误",Lbl_Closed:"盘口已关闭！",Lbl_DateRange:"日期范围",Lbl_DrawNo:"受注期号",Lbl_NA:"N/A",TT_GoToPreviousDrawNo:"转到上一期结果",Wood:"木",Lbl_MaxBet:"最高限额",TH_Amount:"金额",Lbl_Bet:"下注",Water:"水",TH_Previous:"上一期",TT_GoToLastDrawNo:"转到最后开奖结果",TH_Market:"开彩国家",TH_NoOfBet:"投注计数",TH_Results:"开奖结果",Lbl_CurrentDrawResult:"即将开奖彩期",Small:"小",PageTitleAnnouncements:"公告栏",GameDrawResultVoidReason_OfficialEventCancelled:"彩期取消",BetDetails:"投注详情",Title_TransferDetails:"转账明细",Btn_Confirm:"确定",LimitationOfTokenSize:"如果你要自择筹码大小，至少选择一个和最多四个.",Gold:"金",Link_Statistics:"统计",Btn_Login:"登录",Lbl_Captcha:"验证码",Title_Announcements:"公告栏",ResultNotFound:"无法找到开奖结果。",Lbl_GrandTotal:"总计",PageTitleNotFound:"404 此页面不存在",Lbl_Last10Bets:"最后10个投注",Btn_Save:"储存",Lbl_Ticket:"注单编号",Link_Print:"打印",TH_EstimatedWinning:"可赢额",PageTitleProfiles:"会员资料",RefreshSecond:"秒",Bet:"下注",Link_Announcements:"公告栏",Btn_Search:"查询",TH_CountdownTime:"倒数时间",StakeAmountMoreThanBalance:"您的余额不足。",TT_GoToSingleView:"进入单一游戏玩法界面",Pick:"选 {0}",Ball_3rd:"百",Link_Lose:"输",SystemPickMax5Picks:"最多只能选择5个号码。",TH_DrawNumber:"期号",Evens:"偶",Btn_Ok:"确定",Cancel:"取消",TH_Selection:"选项",StakeAmountLessThanMinSingleBetAmount:"投注额不能低于最低限额。",Lbl_UserName:"登入帐号",Fire:"火",Link_LogOut:"登出",TH_Next:"下一期",Lbl_Password:"密码",Lbl_Hit:"中",TH_TransferOut:"转出",Lbl_Area:"开彩地区",StakeAmountMoreThanMaxSingleBetAmount:"投注额已超出最高限额。",Remove:"删除",Btn_Bet:"下注",NoLogOutURL:"登出网址不存在",NoBetAllowedLessThanEqualOddsOne:"无法确认赔率。",TH_TotalWinLoss:"总计赢/输",SystemPick:"自动挑选",TH_WinLoss:"赢/输",NoBalance:"您的余额不足。",AddToBetSlip:"加入注单",Title_BetSlip:"注单",TT_BackToMainLobby:"返回多游戏玩法界面",On:"开",Link_Refund:"退还",Lbl_MaintenanceSchedule:"维护时间",PageTitleOpenBets:"下注状况"}};
;


/*
 AngularJS v1.5.3
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (T, P, u) {
    'use strict'; function O(a) { return function () { var b = arguments[0], d; d = "[" + (a ? a + ":" : "") + b + "] http://errors.angularjs.org/1.5.3/" + (a ? a + "/" : "") + b; for (b = 1; b < arguments.length; b++) { d = d + (1 == b ? "?" : "&") + "p" + (b - 1) + "="; var c = encodeURIComponent, e; e = arguments[b]; e = "function" == typeof e ? e.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof e ? "undefined" : "string" != typeof e ? JSON.stringify(e) : e; d += c(e) } return Error(d) } } function za(a) {
        if (null == a || Ya(a)) return !1; if (M(a) || y(a) || H && a instanceof H) return !0;
        var b = "length" in Object(a) && a.length; return R(b) && (0 <= b && (b - 1 in a || a instanceof Array) || "function" == typeof a.item)
    } function q(a, b, d) {
        var c, e; if (a) if (D(a)) for (c in a) "prototype" == c || "length" == c || "name" == c || a.hasOwnProperty && !a.hasOwnProperty(c) || b.call(d, a[c], c, a); else if (M(a) || za(a)) { var f = "object" !== typeof a; c = 0; for (e = a.length; c < e; c++) (f || c in a) && b.call(d, a[c], c, a) } else if (a.forEach && a.forEach !== q) a.forEach(b, d, a); else if (oc(a)) for (c in a) b.call(d, a[c], c, a); else if ("function" === typeof a.hasOwnProperty) for (c in a) a.hasOwnProperty(c) &&
        b.call(d, a[c], c, a); else for (c in a) va.call(a, c) && b.call(d, a[c], c, a); return a
    } function pc(a, b, d) { for (var c = Object.keys(a).sort(), e = 0; e < c.length; e++) b.call(d, a[c[e]], c[e]); return c } function qc(a) { return function (b, d) { a(d, b) } } function Wd() { return ++qb } function Ob(a, b, d) {
        for (var c = a.$$hashKey, e = 0, f = b.length; e < f; ++e) {
            var g = b[e]; if (J(g) || D(g)) for (var h = Object.keys(g), k = 0, l = h.length; k < l; k++) {
                var m = h[k], n = g[m]; d && J(n) ? fa(n) ? a[m] = new Date(n.valueOf()) : Za(n) ? a[m] = new RegExp(n) : n.nodeName ? a[m] = n.cloneNode(!0) :
                Pb(n) ? a[m] = n.clone() : (J(a[m]) || (a[m] = M(n) ? [] : {}), Ob(a[m], [n], !0)) : a[m] = n
            }
        } c ? a.$$hashKey = c : delete a.$$hashKey; return a
    } function S(a) { return Ob(a, Aa.call(arguments, 1), !1) } function Xd(a) { return Ob(a, Aa.call(arguments, 1), !0) } function Y(a) { return parseInt(a, 10) } function Qb(a, b) { return S(Object.create(a), b) } function E() { } function $a(a) { return a } function da(a) { return function () { return a } } function rc(a) { return D(a.toString) && a.toString !== ka } function z(a) { return "undefined" === typeof a } function A(a) {
        return "undefined" !==
        typeof a
    } function J(a) { return null !== a && "object" === typeof a } function oc(a) { return null !== a && "object" === typeof a && !sc(a) } function y(a) { return "string" === typeof a } function R(a) { return "number" === typeof a } function fa(a) { return "[object Date]" === ka.call(a) } function D(a) { return "function" === typeof a } function Za(a) { return "[object RegExp]" === ka.call(a) } function Ya(a) { return a && a.window === a } function ab(a) { return a && a.$evalAsync && a.$watch } function Oa(a) { return "boolean" === typeof a } function Yd(a) {
        return a && R(a.length) &&
        Zd.test(ka.call(a))
    } function Pb(a) { return !(!a || !(a.nodeName || a.prop && a.attr && a.find)) } function $d(a) { var b = {}; a = a.split(","); var d; for (d = 0; d < a.length; d++) b[a[d]] = !0; return b } function oa(a) { return N(a.nodeName || a[0] && a[0].nodeName) } function bb(a, b) { var d = a.indexOf(b); 0 <= d && a.splice(d, 1); return d } function pa(a, b) {
        function d(a, b) {
            var d = b.$$hashKey, e; if (M(a)) { e = 0; for (var f = a.length; e < f; e++) b.push(c(a[e])) } else if (oc(a)) for (e in a) b[e] = c(a[e]); else if (a && "function" === typeof a.hasOwnProperty) for (e in a) a.hasOwnProperty(e) &&
            (b[e] = c(a[e])); else for (e in a) va.call(a, e) && (b[e] = c(a[e])); d ? b.$$hashKey = d : delete b.$$hashKey; return b
        } function c(a) { if (!J(a)) return a; var b = f.indexOf(a); if (-1 !== b) return g[b]; if (Ya(a) || ab(a)) throw Ba("cpws"); var b = !1, c = e(a); c === u && (c = M(a) ? [] : Object.create(sc(a)), b = !0); f.push(a); g.push(c); return b ? d(a, c) : c } function e(a) {
            switch (ka.call(a)) {
                case "[object Int8Array]": case "[object Int16Array]": case "[object Int32Array]": case "[object Float32Array]": case "[object Float64Array]": case "[object Uint8Array]": case "[object Uint8ClampedArray]": case "[object Uint16Array]": case "[object Uint32Array]": return new a.constructor(c(a.buffer));
                case "[object ArrayBuffer]": if (!a.slice) { var b = new ArrayBuffer(a.byteLength); (new Uint8Array(b)).set(new Uint8Array(a)); return b } return a.slice(0); case "[object Boolean]": case "[object Number]": case "[object String]": case "[object Date]": return new a.constructor(a.valueOf()); case "[object RegExp]": return b = new RegExp(a.source, a.toString().match(/[^\/]*$/)[0]), b.lastIndex = a.lastIndex, b; case "[object Blob]": return new a.constructor([a], { type: a.type })
            } if (D(a.cloneNode)) return a.cloneNode(!0)
        } var f = [],
        g = []; if (b) { if (Yd(b) || "[object ArrayBuffer]" === ka.call(b)) throw Ba("cpta"); if (a === b) throw Ba("cpi"); M(b) ? b.length = 0 : q(b, function (a, c) { "$$hashKey" !== c && delete b[c] }); f.push(a); g.push(b); return d(a, b) } return c(a)
    } function ia(a, b) { if (M(a)) { b = b || []; for (var d = 0, c = a.length; d < c; d++) b[d] = a[d] } else if (J(a)) for (d in b = b || {}, a) if ("$" !== d.charAt(0) || "$" !== d.charAt(1)) b[d] = a[d]; return b || a } function na(a, b) {
        if (a === b) return !0; if (null === a || null === b) return !1; if (a !== a && b !== b) return !0; var d = typeof a, c; if (d == typeof b &&
        "object" == d) if (M(a)) { if (!M(b)) return !1; if ((d = a.length) == b.length) { for (c = 0; c < d; c++) if (!na(a[c], b[c])) return !1; return !0 } } else { if (fa(a)) return fa(b) ? na(a.getTime(), b.getTime()) : !1; if (Za(a)) return Za(b) ? a.toString() == b.toString() : !1; if (ab(a) || ab(b) || Ya(a) || Ya(b) || M(b) || fa(b) || Za(b)) return !1; d = V(); for (c in a) if ("$" !== c.charAt(0) && !D(a[c])) { if (!na(a[c], b[c])) return !1; d[c] = !0 } for (c in b) if (!(c in d) && "$" !== c.charAt(0) && A(b[c]) && !D(b[c])) return !1; return !0 } return !1
    } function cb(a, b, d) {
        return a.concat(Aa.call(b,
        d))
    } function tc(a, b) { var d = 2 < arguments.length ? Aa.call(arguments, 2) : []; return !D(b) || b instanceof RegExp ? b : d.length ? function () { return arguments.length ? b.apply(a, cb(d, arguments, 0)) : b.apply(a, d) } : function () { return arguments.length ? b.apply(a, arguments) : b.call(a) } } function ae(a, b) { var d = b; "string" === typeof a && "$" === a.charAt(0) && "$" === a.charAt(1) ? d = u : Ya(b) ? d = "$WINDOW" : b && P === b ? d = "$DOCUMENT" : ab(b) && (d = "$SCOPE"); return d } function db(a, b) { if (z(a)) return u; R(b) || (b = b ? 2 : null); return JSON.stringify(a, ae, b) } function uc(a) {
        return y(a) ?
        JSON.parse(a) : a
    } function vc(a, b) { a = a.replace(be, ""); var d = Date.parse("Jan 01, 1970 00:00:00 " + a) / 6E4; return isNaN(d) ? b : d } function Rb(a, b, d) { d = d ? -1 : 1; var c = a.getTimezoneOffset(); b = vc(b, c); d *= b - c; a = new Date(a.getTime()); a.setMinutes(a.getMinutes() + d); return a } function wa(a) { a = H(a).clone(); try { a.empty() } catch (b) { } var d = H("<div>").append(a).html(); try { return a[0].nodeType === Pa ? N(d) : d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (a, b) { return "<" + N(b) }) } catch (c) { return N(d) } } function wc(a) { try { return decodeURIComponent(a) } catch (b) { } }
    function xc(a) { var b = {}; q((a || "").split("&"), function (a) { var c, e, f; a && (e = a = a.replace(/\+/g, "%20"), c = a.indexOf("="), -1 !== c && (e = a.substring(0, c), f = a.substring(c + 1)), e = wc(e), A(e) && (f = A(f) ? wc(f) : !0, va.call(b, e) ? M(b[e]) ? b[e].push(f) : b[e] = [b[e], f] : b[e] = f)) }); return b } function Sb(a) { var b = []; q(a, function (a, c) { M(a) ? q(a, function (a) { b.push(ja(c, !0) + (!0 === a ? "" : "=" + ja(a, !0))) }) : b.push(ja(c, !0) + (!0 === a ? "" : "=" + ja(a, !0))) }); return b.length ? b.join("&") : "" } function rb(a) {
        return ja(a, !0).replace(/%26/gi, "&").replace(/%3D/gi,
        "=").replace(/%2B/gi, "+")
    } function ja(a, b) { return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, b ? "%20" : "+") } function ce(a, b) { var d, c, e = Qa.length; for (c = 0; c < e; ++c) if (d = Qa[c] + b, y(d = a.getAttribute(d))) return d; return null } function de(a, b) {
        var d, c, e = {}; q(Qa, function (b) { b += "app"; !d && a.hasAttribute && a.hasAttribute(b) && (d = a, c = a.getAttribute(b)) }); q(Qa, function (b) {
            b += "app"; var e; !d && (e = a.querySelector("[" + b.replace(":",
            "\\:") + "]")) && (d = e, c = e.getAttribute(b))
        }); d && (e.strictDi = null !== ce(d, "strict-di"), b(d, c ? [c] : [], e))
    } function yc(a, b, d) {
        J(d) || (d = {}); d = S({ strictDi: !1 }, d); var c = function () {
            a = H(a); if (a.injector()) { var c = a[0] === P ? "document" : wa(a); throw Ba("btstrpd", c.replace(/</, "&lt;").replace(/>/, "&gt;")); } b = b || []; b.unshift(["$provide", function (b) { b.value("$rootElement", a) }]); d.debugInfoEnabled && b.push(["$compileProvider", function (a) { a.debugInfoEnabled(!0) }]); b.unshift("ng"); c = eb(b, d.strictDi); c.invoke(["$rootScope",
            "$rootElement", "$compile", "$injector", function (a, b, c, d) { a.$apply(function () { b.data("$injector", d); c(b)(a) }) }]); return c
        }, e = /^NG_ENABLE_DEBUG_INFO!/, f = /^NG_DEFER_BOOTSTRAP!/; T && e.test(T.name) && (d.debugInfoEnabled = !0, T.name = T.name.replace(e, "")); if (T && !f.test(T.name)) return c(); T.name = T.name.replace(f, ""); ea.resumeBootstrap = function (a) { q(a, function (a) { b.push(a) }); return c() }; D(ea.resumeDeferredBootstrap) && ea.resumeDeferredBootstrap()
    } function ee() { T.name = "NG_ENABLE_DEBUG_INFO!" + T.name; T.location.reload() }
    function fe(a) { a = ea.element(a).injector(); if (!a) throw Ba("test"); return a.get("$$testability") } function zc(a, b) { b = b || "_"; return a.replace(ge, function (a, c) { return (c ? b : "") + a.toLowerCase() }) } function he() {
        var a; if (!Ac) {
            var b = sb(); ($ = z(b) ? T.jQuery : b ? T[b] : u) && $.fn.on ? (H = $, S($.fn, { scope: Ra.scope, isolateScope: Ra.isolateScope, controller: Ra.controller, injector: Ra.injector, inheritedData: Ra.inheritedData }), a = $.cleanData, $.cleanData = function (b) {
                for (var c, e = 0, f; null != (f = b[e]) ; e++) (c = $._data(f, "events")) && c.$destroy &&
                $(f).triggerHandler("$destroy"); a(b)
            }) : H = U; ea.element = H; Ac = !0
        }
    } function tb(a, b, d) { if (!a) throw Ba("areq", b || "?", d || "required"); return a } function Sa(a, b, d) { d && M(a) && (a = a[a.length - 1]); tb(D(a), b, "not a function, got " + (a && "object" === typeof a ? a.constructor.name || "Object" : typeof a)); return a } function Ta(a, b) { if ("hasOwnProperty" === a) throw Ba("badname", b); } function Bc(a, b, d) { if (!b) return a; b = b.split("."); for (var c, e = a, f = b.length, g = 0; g < f; g++) c = b[g], a && (a = (e = a)[c]); return !d && D(a) ? tc(e, a) : a } function ub(a) {
        for (var b =
        a[0], d = a[a.length - 1], c, e = 1; b !== d && (b = b.nextSibling) ; e++) if (c || a[e] !== b) c || (c = H(Aa.call(a, 0, e))), c.push(b); return c || a
    } function V() { return Object.create(null) } function ie(a) {
        function b(a, b, c) { return a[b] || (a[b] = c()) } var d = O("$injector"), c = O("ng"); a = b(a, "angular", Object); a.$$minErr = a.$$minErr || O; return b(a, "module", function () {
            var a = {}; return function (f, g, h) {
                if ("hasOwnProperty" === f) throw c("badname", "module"); g && a.hasOwnProperty(f) && (a[f] = null); return b(a, f, function () {
                    function a(b, d, e, f) {
                        f || (f = c); return function () {
                            f[e ||
                            "push"]([b, d, arguments]); return L
                        }
                    } function b(a, d) { return function (b, e) { e && D(e) && (e.$$moduleName = f); c.push([a, d, arguments]); return L } } if (!g) throw d("nomod", f); var c = [], e = [], p = [], F = a("$injector", "invoke", "push", e), L = {
                        _invokeQueue: c, _configBlocks: e, _runBlocks: p, requires: g, name: f, provider: b("$provide", "provider"), factory: b("$provide", "factory"), service: b("$provide", "service"), value: a("$provide", "value"), constant: a("$provide", "constant", "unshift"), decorator: b("$provide", "decorator"), animation: b("$animateProvider",
                        "register"), filter: b("$filterProvider", "register"), controller: b("$controllerProvider", "register"), directive: b("$compileProvider", "directive"), component: b("$compileProvider", "component"), config: F, run: function (a) { p.push(a); return this }
                    }; h && F(h); return L
                })
            }
        })
    } function je(a) {
        S(a, {
            bootstrap: yc, copy: pa, extend: S, merge: Xd, equals: na, element: H, forEach: q, injector: eb, noop: E, bind: tc, toJson: db, fromJson: uc, identity: $a, isUndefined: z, isDefined: A, isString: y, isFunction: D, isObject: J, isNumber: R, isElement: Pb, isArray: M,
            version: ke, isDate: fa, lowercase: N, uppercase: vb, callbacks: { counter: 0 }, getTestability: fe, $$minErr: O, $$csp: Ga, reloadWithDebugInfo: ee
        }); Tb = ie(T); Tb("ng", ["ngLocale"], ["$provide", function (a) {
            a.provider({ $$sanitizeUri: le }); a.provider("$compile", Cc).directive({
                a: me, input: Dc, textarea: Dc, form: ne, script: oe, select: pe, style: qe, option: re, ngBind: se, ngBindHtml: te, ngBindTemplate: ue, ngClass: ve, ngClassEven: we, ngClassOdd: xe, ngCloak: ye, ngController: ze, ngForm: Ae, ngHide: Be, ngIf: Ce, ngInclude: De, ngInit: Ee, ngNonBindable: Fe,
                ngPluralize: Ge, ngRepeat: He, ngShow: Ie, ngStyle: Je, ngSwitch: Ke, ngSwitchWhen: Le, ngSwitchDefault: Me, ngOptions: Ne, ngTransclude: Oe, ngModel: Pe, ngList: Qe, ngChange: Re, pattern: Ec, ngPattern: Ec, required: Fc, ngRequired: Fc, minlength: Gc, ngMinlength: Gc, maxlength: Hc, ngMaxlength: Hc, ngValue: Se, ngModelOptions: Te
            }).directive({ ngInclude: Ue }).directive(wb).directive(Ic); a.provider({
                $anchorScroll: Ve, $animate: We, $animateCss: Xe, $$animateJs: Ye, $$animateQueue: Ze, $$AnimateRunner: $e, $$animateAsyncRun: af, $browser: bf, $cacheFactory: cf,
                $controller: df, $document: ef, $exceptionHandler: ff, $filter: Jc, $$forceReflow: gf, $interpolate: hf, $interval: jf, $http: kf, $httpParamSerializer: lf, $httpParamSerializerJQLike: mf, $httpBackend: nf, $xhrFactory: of, $location: pf, $log: qf, $parse: rf, $rootScope: sf, $q: tf, $$q: uf, $sce: vf, $sceDelegate: wf, $sniffer: xf, $templateCache: yf, $templateRequest: zf, $$testability: Af, $timeout: Bf, $window: Cf, $$rAF: Df, $$jqLite: Ef, $$HashMap: Ff, $$cookieReader: Gf
            })
        }])
    } function fb(a) {
        return a.replace(Hf, function (a, d, c, e) {
            return e ? c.toUpperCase() :
            c
        }).replace(If, "Moz$1")
    } function Kc(a) { a = a.nodeType; return 1 === a || !a || 9 === a } function Lc(a, b) { var d, c, e = b.createDocumentFragment(), f = []; if (Ub.test(a)) { d = d || e.appendChild(b.createElement("div")); c = (Jf.exec(a) || ["", ""])[1].toLowerCase(); c = ha[c] || ha._default; d.innerHTML = c[1] + a.replace(Kf, "<$1></$2>") + c[2]; for (c = c[0]; c--;) d = d.lastChild; f = cb(f, d.childNodes); d = e.firstChild; d.textContent = "" } else f.push(b.createTextNode(a)); e.textContent = ""; e.innerHTML = ""; q(f, function (a) { e.appendChild(a) }); return e } function Mc(a,
    b) { var d = a.parentNode; d && d.replaceChild(b, a); b.appendChild(a) } function U(a) { if (a instanceof U) return a; var b; y(a) && (a = W(a), b = !0); if (!(this instanceof U)) { if (b && "<" != a.charAt(0)) throw Vb("nosel"); return new U(a) } if (b) { b = P; var d; a = (d = Lf.exec(a)) ? [b.createElement(d[1])] : (d = Lc(a, b)) ? d.childNodes : [] } Nc(this, a) } function Wb(a) { return a.cloneNode(!0) } function xb(a, b) { b || gb(a); if (a.querySelectorAll) for (var d = a.querySelectorAll("*"), c = 0, e = d.length; c < e; c++) gb(d[c]) } function Oc(a, b, d, c) {
        if (A(c)) throw Vb("offargs");
        var e = (c = yb(a)) && c.events, f = c && c.handle; if (f) if (b) { var g = function (b) { var c = e[b]; A(d) && bb(c || [], d); A(d) && c && 0 < c.length || (a.removeEventListener(b, f, !1), delete e[b]) }; q(b.split(" "), function (a) { g(a); zb[a] && g(zb[a]) }) } else for (b in e) "$destroy" !== b && a.removeEventListener(b, f, !1), delete e[b]
    } function gb(a, b) { var d = a.ng339, c = d && hb[d]; c && (b ? delete c.data[b] : (c.handle && (c.events.$destroy && c.handle({}, "$destroy"), Oc(a)), delete hb[d], a.ng339 = u)) } function yb(a, b) {
        var d = a.ng339, d = d && hb[d]; b && !d && (a.ng339 = d = ++Mf,
        d = hb[d] = { events: {}, data: {}, handle: u }); return d
    } function Xb(a, b, d) { if (Kc(a)) { var c = A(d), e = !c && b && !J(b), f = !b; a = (a = yb(a, !e)) && a.data; if (c) a[b] = d; else { if (f) return a; if (e) return a && a[b]; S(a, b) } } } function Ab(a, b) { return a.getAttribute ? -1 < (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") : !1 } function Bb(a, b) { b && a.setAttribute && q(b.split(" "), function (b) { a.setAttribute("class", W((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + W(b) + " ", " "))) }) } function Cb(a,
    b) { if (b && a.setAttribute) { var d = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " "); q(b.split(" "), function (a) { a = W(a); -1 === d.indexOf(" " + a + " ") && (d += a + " ") }); a.setAttribute("class", W(d)) } } function Nc(a, b) { if (b) if (b.nodeType) a[a.length++] = b; else { var d = b.length; if ("number" === typeof d && b.window !== b) { if (d) for (var c = 0; c < d; c++) a[a.length++] = b[c] } else a[a.length++] = b } } function Pc(a, b) { return Db(a, "$" + (b || "ngController") + "Controller") } function Db(a, b, d) {
        9 == a.nodeType && (a = a.documentElement); for (b =
        M(b) ? b : [b]; a;) { for (var c = 0, e = b.length; c < e; c++) if (A(d = H.data(a, b[c]))) return d; a = a.parentNode || 11 === a.nodeType && a.host }
    } function Qc(a) { for (xb(a, !0) ; a.firstChild;) a.removeChild(a.firstChild) } function Yb(a, b) { b || xb(a); var d = a.parentNode; d && d.removeChild(a) } function Nf(a, b) { b = b || T; if ("complete" === b.document.readyState) b.setTimeout(a); else H(b).on("load", a) } function Rc(a, b) { var d = Eb[b.toLowerCase()]; return d && Sc[oa(a)] && d } function Of(a, b) {
        var d = function (c, d) {
            c.isDefaultPrevented = function () { return c.defaultPrevented };
            var f = b[d || c.type], g = f ? f.length : 0; if (g) { if (z(c.immediatePropagationStopped)) { var h = c.stopImmediatePropagation; c.stopImmediatePropagation = function () { c.immediatePropagationStopped = !0; c.stopPropagation && c.stopPropagation(); h && h.call(c) } } c.isImmediatePropagationStopped = function () { return !0 === c.immediatePropagationStopped }; var k = f.specialHandlerWrapper || Pf; 1 < g && (f = ia(f)); for (var l = 0; l < g; l++) c.isImmediatePropagationStopped() || k(a, c, f[l]) }
        }; d.elem = a; return d
    } function Pf(a, b, d) { d.call(a, b) } function Qf(a, b,
    d) { var c = b.relatedTarget; c && (c === a || Rf.call(a, c)) || d.call(a, b) } function Ef() { this.$get = function () { return S(U, { hasClass: function (a, b) { a.attr && (a = a[0]); return Ab(a, b) }, addClass: function (a, b) { a.attr && (a = a[0]); return Cb(a, b) }, removeClass: function (a, b) { a.attr && (a = a[0]); return Bb(a, b) } }) } } function Ha(a, b) { var d = a && a.$$hashKey; if (d) return "function" === typeof d && (d = a.$$hashKey()), d; d = typeof a; return d = "function" == d || "object" == d && null !== a ? a.$$hashKey = d + ":" + (b || Wd)() : d + ":" + a } function Ua(a, b) {
        if (b) {
            var d = 0; this.nextUid =
            function () { return ++d }
        } q(a, this.put, this)
    } function Tc(a) { a = a.toString().replace(Sf, ""); return a.match(Tf) || a.match(Uf) } function Vf(a) { return (a = Tc(a)) ? "function(" + (a[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn" } function eb(a, b) {
        function d(a) { return function (b, c) { if (J(b)) q(b, qc(a)); else return a(b, c) } } function c(a, b) { Ta(a, "service"); if (D(b) || M(b)) b = p.instantiate(b); if (!b.$get) throw Ia("pget", a); return n[a + "Provider"] = b } function e(a, b) {
            return function () {
                var c = x.invoke(b, this); if (z(c)) throw Ia("undef", a);
                return c
            }
        } function f(a, b, d) { return c(a, { $get: !1 !== d ? e(a, b) : b }) } function g(a) {
            tb(z(a) || M(a), "modulesToLoad", "not an array"); var b = [], c; q(a, function (a) {
                function d(a) { var b, c; b = 0; for (c = a.length; b < c; b++) { var e = a[b], f = p.get(e[0]); f[e[1]].apply(f, e[2]) } } if (!m.get(a)) {
                    m.put(a, !0); try { y(a) ? (c = Tb(a), b = b.concat(g(c.requires)).concat(c._runBlocks), d(c._invokeQueue), d(c._configBlocks)) : D(a) ? b.push(p.invoke(a)) : M(a) ? b.push(p.invoke(a)) : Sa(a, "module") } catch (e) {
                        throw M(a) && (a = a[a.length - 1]), e.message && e.stack &&
                        -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), Ia("modulerr", a, e.stack || e.message || e);
                    }
                }
            }); return b
        } function h(a, c) {
            function d(b, e) { if (a.hasOwnProperty(b)) { if (a[b] === k) throw Ia("cdep", b + " <- " + l.join(" <- ")); return a[b] } try { return l.unshift(b), a[b] = k, a[b] = c(b, e) } catch (f) { throw a[b] === k && delete a[b], f; } finally { l.shift() } } function e(a, c, f) {
                var g = []; a = eb.$$annotate(a, b, f); for (var h = 0, k = a.length; h < k; h++) {
                    var l = a[h]; if ("string" !== typeof l) throw Ia("itkn", l); g.push(c && c.hasOwnProperty(l) ? c[l] :
                    d(l, f))
                } return g
            } return {
                invoke: function (a, b, c, d) { "string" === typeof c && (d = c, c = null); c = e(a, c, d); M(a) && (a = a[a.length - 1]); d = 11 >= Da ? !1 : "function" === typeof a && /^(?:class\s|constructor\()/.test(Function.prototype.toString.call(a)); return d ? (c.unshift(null), new (Function.prototype.bind.apply(a, c))) : a.apply(b, c) }, instantiate: function (a, b, c) { var d = M(a) ? a[a.length - 1] : a; a = e(a, b, c); a.unshift(null); return new (Function.prototype.bind.apply(d, a)) }, get: d, annotate: eb.$$annotate, has: function (b) {
                    return n.hasOwnProperty(b +
                    "Provider") || a.hasOwnProperty(b)
                }
            }
        } b = !0 === b; var k = {}, l = [], m = new Ua([], !0), n = { $provide: { provider: d(c), factory: d(f), service: d(function (a, b) { return f(a, ["$injector", function (a) { return a.instantiate(b) }]) }), value: d(function (a, b) { return f(a, da(b), !1) }), constant: d(function (a, b) { Ta(a, "constant"); n[a] = b; F[a] = b }), decorator: function (a, b) { var c = p.get(a + "Provider"), d = c.$get; c.$get = function () { var a = x.invoke(d, c); return x.invoke(b, null, { $delegate: a }) } } } }, p = n.$injector = h(n, function (a, b) {
            ea.isString(b) && l.push(b);
            throw Ia("unpr", l.join(" <- "));
        }), F = {}, L = h(F, function (a, b) { var c = p.get(a + "Provider", b); return x.invoke(c.$get, c, u, a) }), x = L; n.$injectorProvider = { $get: da(L) }; var r = g(a), x = L.get("$injector"); x.strictDi = b; q(r, function (a) { a && x.invoke(a) }); return x
    } function Ve() {
        var a = !0; this.disableAutoScrolling = function () { a = !1 }; this.$get = ["$window", "$location", "$rootScope", function (b, d, c) {
            function e(a) { var b = null; Array.prototype.some.call(a, function (a) { if ("a" === oa(a)) return b = a, !0 }); return b } function f(a) {
                if (a) {
                    a.scrollIntoView();
                    var c; c = g.yOffset; D(c) ? c = c() : Pb(c) ? (c = c[0], c = "fixed" !== b.getComputedStyle(c).position ? 0 : c.getBoundingClientRect().bottom) : R(c) || (c = 0); c && (a = a.getBoundingClientRect().top, b.scrollBy(0, a - c))
                } else b.scrollTo(0, 0)
            } function g(a) { a = y(a) ? a : d.hash(); var b; a ? (b = h.getElementById(a)) ? f(b) : (b = e(h.getElementsByName(a))) ? f(b) : "top" === a && f(null) : f(null) } var h = b.document; a && c.$watch(function () { return d.hash() }, function (a, b) { a === b && "" === a || Nf(function () { c.$evalAsync(g) }) }); return g
        }]
    } function ib(a, b) {
        if (!a && !b) return "";
        if (!a) return b; if (!b) return a; M(a) && (a = a.join(" ")); M(b) && (b = b.join(" ")); return a + " " + b
    } function Wf(a) { y(a) && (a = a.split(" ")); var b = V(); q(a, function (a) { a.length && (b[a] = !0) }); return b } function Ja(a) { return J(a) ? a : {} } function Xf(a, b, d, c) {
        function e(a) { try { a.apply(null, Aa.call(arguments, 1)) } finally { if (L--, 0 === L) for (; x.length;) try { x.pop()() } catch (b) { d.error(b) } } } function f() { t = null; g(); h() } function g() { r = G(); r = z(r) ? null : r; na(r, I) && (r = I); I = r } function h() {
            if (v !== k.url() || w !== r) v = k.url(), w = r, q(C, function (a) {
                a(k.url(),
                r)
            })
        } var k = this, l = a.location, m = a.history, n = a.setTimeout, p = a.clearTimeout, F = {}; k.isMock = !1; var L = 0, x = []; k.$$completeOutstandingRequest = e; k.$$incOutstandingRequestCount = function () { L++ }; k.notifyWhenNoOutstandingRequests = function (a) { 0 === L ? a() : x.push(a) }; var r, w, v = l.href, Q = b.find("base"), t = null, G = c.history ? function () { try { return m.state } catch (a) { } } : E; g(); w = r; k.url = function (b, d, e) {
            z(e) && (e = null); l !== a.location && (l = a.location); m !== a.history && (m = a.history); if (b) {
                var f = w === e; if (v === b && (!c.history || f)) return k;
                var h = v && Ka(v) === Ka(b); v = b; w = e; if (!c.history || h && f) { if (!h || t) t = b; d ? l.replace(b) : h ? (d = l, e = b.indexOf("#"), e = -1 === e ? "" : b.substr(e), d.hash = e) : l.href = b; l.href !== b && (t = b) } else m[d ? "replaceState" : "pushState"](e, "", b), g(), w = r; return k
            } return t || l.href.replace(/%27/g, "'")
        }; k.state = function () { return r }; var C = [], K = !1, I = null; k.onUrlChange = function (b) { if (!K) { if (c.history) H(a).on("popstate", f); H(a).on("hashchange", f); K = !0 } C.push(b); return b }; k.$$applicationDestroyed = function () { H(a).off("hashchange popstate", f) };
        k.$$checkUrlChange = h; k.baseHref = function () { var a = Q.attr("href"); return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : "" }; k.defer = function (a, b) { var c; L++; c = n(function () { delete F[c]; e(a) }, b || 0); F[c] = !0; return c }; k.defer.cancel = function (a) { return F[a] ? (delete F[a], p(a), e(E), !0) : !1 }
    } function bf() { this.$get = ["$window", "$log", "$sniffer", "$document", function (a, b, d, c) { return new Xf(a, c, b, d) }] } function cf() {
        this.$get = function () {
            function a(a, c) {
                function e(a) {
                    a != n && (p ? p == a && (p = a.n) : p = a, f(a.n, a.p), f(a, n), n = a, n.n =
                    null)
                } function f(a, b) { a != b && (a && (a.p = b), b && (b.n = a)) } if (a in b) throw O("$cacheFactory")("iid", a); var g = 0, h = S({}, c, { id: a }), k = V(), l = c && c.capacity || Number.MAX_VALUE, m = V(), n = null, p = null; return b[a] = {
                    put: function (a, b) { if (!z(b)) { if (l < Number.MAX_VALUE) { var c = m[a] || (m[a] = { key: a }); e(c) } a in k || g++; k[a] = b; g > l && this.remove(p.key); return b } }, get: function (a) { if (l < Number.MAX_VALUE) { var b = m[a]; if (!b) return; e(b) } return k[a] }, remove: function (a) {
                        if (l < Number.MAX_VALUE) {
                            var b = m[a]; if (!b) return; b == n && (n = b.p); b == p && (p =
                            b.n); f(b.n, b.p); delete m[a]
                        } a in k && (delete k[a], g--)
                    }, removeAll: function () { k = V(); g = 0; m = V(); n = p = null }, destroy: function () { m = h = k = null; delete b[a] }, info: function () { return S({}, h, { size: g }) }
                }
            } var b = {}; a.info = function () { var a = {}; q(b, function (b, e) { a[e] = b.info() }); return a }; a.get = function (a) { return b[a] }; return a
        }
    } function yf() { this.$get = ["$cacheFactory", function (a) { return a("templates") }] } function Cc(a, b) {
        function d(a, b, c) {
            var d = /^\s*([@&<]|=(\*?))(\??)\s*(\w*)\s*$/, e = {}; q(a, function (a, f) {
                if (a in m) e[f] =
                m[a]; else { var g = a.match(d); if (!g) throw ga("iscp", b, f, a, c ? "controller bindings definition" : "isolate scope definition"); e[f] = { mode: g[1][0], collection: "*" === g[2], optional: "?" === g[3], attrName: g[4] || f }; g[4] && (m[a] = e[f]) }
            }); return e
        } function c(a) { var b = a.charAt(0); if (!b || b !== N(b)) throw ga("baddir", a); if (a !== a.trim()) throw ga("baddir", a); } var e = {}, f = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/, g = /(([\w\-]+)(?:\:([^;]+))?;?)/, h = $d("ngSrc,ngSrcset,src,srcset"), k = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/, l = /^(on[a-z]+|formaction)$/,
        m = V(); this.directive = function L(b, d) {
            Ta(b, "directive"); y(b) ? (c(b), tb(d, "directiveFactory"), e.hasOwnProperty(b) || (e[b] = [], a.factory(b + "Directive", ["$injector", "$exceptionHandler", function (a, c) { var d = []; q(e[b], function (e, f) { try { var g = a.invoke(e); D(g) ? g = { compile: da(g) } : !g.compile && g.link && (g.compile = da(g.link)); g.priority = g.priority || 0; g.index = f; g.name = g.name || b; g.require = g.require || g.controller && g.name; g.restrict = g.restrict || "EA"; g.$$moduleName = e.$$moduleName; d.push(g) } catch (h) { c(h) } }); return d }])),
            e[b].push(d)) : q(b, qc(L)); return this
        }; this.component = function (a, b) {
            function c(a) { function e(b) { return D(b) || M(b) ? function (c, d) { return a.invoke(b, this, { $element: c, $attrs: d }) } : b } var f = b.template || b.templateUrl ? b.template : ""; return { controller: d, controllerAs: Uc(b.controller) || b.controllerAs || "$ctrl", template: e(f), templateUrl: e(b.templateUrl), transclude: b.transclude, scope: {}, bindToController: b.bindings || {}, restrict: "E", require: b.require } } var d = b.controller || E; q(b, function (a, b) {
                "$" === b.charAt(0) && (c[b] =
                a, d[b] = a)
            }); c.$inject = ["$injector"]; return this.directive(a, c)
        }; this.aHrefSanitizationWhitelist = function (a) { return A(a) ? (b.aHrefSanitizationWhitelist(a), this) : b.aHrefSanitizationWhitelist() }; this.imgSrcSanitizationWhitelist = function (a) { return A(a) ? (b.imgSrcSanitizationWhitelist(a), this) : b.imgSrcSanitizationWhitelist() }; var n = !0; this.debugInfoEnabled = function (a) { return A(a) ? (n = a, this) : n }; var p = 10; this.onChangesTtl = function (a) { return arguments.length ? (p = a, this) : p }; this.$get = ["$injector", "$interpolate",
        "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function (a, b, c, m, v, Q, t, G, C, K) {
            function I() { try { if (!--pa) throw $ = u, ga("infchng", p); t.$apply(function () { for (var a = 0, b = $.length; a < b; ++a) $[a](); $ = u }) } finally { pa++ } } function qa(a, b) { if (b) { var c = Object.keys(b), d, e, f; d = 0; for (e = c.length; d < e; d++) f = c[d], this[f] = b[f] } else this.$attr = {}; this.$$element = a } function Ca(a, b, c) {
                la.innerHTML = "<span " + b + ">"; b = la.firstChild.attributes; var d = b[0]; b.removeNamedItem(d.name);
                d.value = c; a.attributes.setNamedItem(d)
            } function B(a, b) { try { a.addClass(b) } catch (c) { } } function ba(a, b, c, d, e) {
                a instanceof H || (a = H(a)); for (var f = /\S+/, g = 0, h = a.length; g < h; g++) { var k = a[g]; k.nodeType === Pa && k.nodeValue.match(f) && Mc(k, a[g] = P.createElement("span")) } var l = xa(a, b, a, c, d, e); ba.$$addScopeClass(a); var m = null; return function (b, c, d) {
                    tb(b, "scope"); e && e.needsNewScope && (b = b.$parent.$new()); d = d || {}; var f = d.parentBoundTranscludeFn, g = d.transcludeControllers; d = d.futureParentElement; f && f.$$boundTransclude &&
                    (f = f.$$boundTransclude); m || (m = (d = d && d[0]) ? "foreignobject" !== oa(d) && ka.call(d).match(/SVG/) ? "svg" : "html" : "html"); d = "html" !== m ? H(ca(m, H("<div>").append(a).html())) : c ? Ra.clone.call(a) : a; if (g) for (var h in g) d.data("$" + h + "Controller", g[h].instance); ba.$$addScopeInfo(d, b); c && c(d, b); l && l(b, d, d, f); return d
                }
            } function xa(a, b, c, d, e, f) {
                function g(a, c, d, e) {
                    var f, k, l, m, n, p, G; if (r) for (G = Array(c.length), m = 0; m < h.length; m += 3) f = h[m], G[f] = c[f]; else G = c; m = 0; for (n = h.length; m < n;) k = G[h[m++]], c = h[m++], f = h[m++], c ? (c.scope ?
                    (l = a.$new(), ba.$$addScopeInfo(H(k), l)) : l = a, p = c.transcludeOnThisElement ? s(a, c.transclude, e) : !c.templateOnThisElement && e ? e : !e && b ? s(a, b) : null, c(f, l, k, d, p)) : f && f(a, k.childNodes, u, e)
                } for (var h = [], k, l, m, n, r, p = 0; p < a.length; p++) {
                    k = new qa; l = A(a[p], [], k, 0 === p ? d : u, e); (f = l.length ? ra(l, a[p], k, b, c, null, [], [], f) : null) && f.scope && ba.$$addScopeClass(k.$$element); k = f && f.terminal || !(m = a[p].childNodes) || !m.length ? null : xa(m, f ? (f.transcludeOnThisElement || !f.templateOnThisElement) && f.transclude : b); if (f || k) h.push(p, f, k),
                    n = !0, r = r || f; f = null
                } return n ? g : null
            } function s(a, b, c) { function d(e, f, g, h, k) { e || (e = a.$new(!1, k), e.$$transcluded = !0); return b(e, f, { parentBoundTranscludeFn: c, transcludeControllers: g, futureParentElement: h }) } var e = d.$$slots = V(), f; for (f in b.$$slots) e[f] = b.$$slots[f] ? s(a, b.$$slots[f], c) : null; return d } function A(a, b, c, d, e) {
                var h = c.$attr, k; switch (a.nodeType) {
                    case 1: Fa(b, ya(oa(a)), "E", d, e); for (var l, m, n, r = a.attributes, p = 0, G = r && r.length; p < G; p++) {
                        var v = !1, C = !1; l = r[p]; k = l.name; m = W(l.value); l = ya(k); if (n = za.test(l)) k =
                        k.replace(Vc, "").substr(8).replace(/_(.)/g, function (a, b) { return b.toUpperCase() }); (l = l.match(Ba)) && R(l[1]) && (v = k, C = k.substr(0, k.length - 5) + "end", k = k.substr(0, k.length - 6)); l = ya(k.toLowerCase()); h[l] = k; if (n || !c.hasOwnProperty(l)) c[l] = m, Rc(a, l) && (c[l] = !0); fa(a, b, m, l, n); Fa(b, l, "A", d, e, v, C)
                    } a = a.className; J(a) && (a = a.animVal); if (y(a) && "" !== a) for (; k = g.exec(a) ;) l = ya(k[2]), Fa(b, l, "C", d, e) && (c[l] = W(k[3])), a = a.substr(k.index + k[0].length); break; case Pa: if (11 === Da) for (; a.parentNode && a.nextSibling && a.nextSibling.nodeType ===
                    Pa;) a.nodeValue += a.nextSibling.nodeValue, a.parentNode.removeChild(a.nextSibling); Y(b, a.nodeValue); break; case 8: try { if (k = f.exec(a.nodeValue)) l = ya(k[1]), Fa(b, l, "M", d, e) && (c[l] = W(k[2])) } catch (w) { }
                } b.sort(Z); return b
            } function Wc(a, b, c) { var d = [], e = 0; if (b && a.hasAttribute && a.hasAttribute(b)) { do { if (!a) throw ga("uterdir", b, c); 1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--); d.push(a); a = a.nextSibling } while (0 < e) } else d.push(a); return H(d) } function O(a, b, c) {
                return function (d, e, f, g, h) {
                    e = Wc(e[0],
                    b, c); return a(d, e, f, g, h)
                }
            } function Zb(a, b, c, d, e, f) { var g; return a ? ba(b, c, d, e, f) : function () { g || (g = ba(b, c, d, e, f), b = c = f = null); return g.apply(this, arguments) } } function ra(a, b, d, e, f, g, h, k, l) {
                function m(a, b, c, d) { if (a) { c && (a = O(a, c, d)); a.require = B.require; a.directiveName = L; if (C === B || B.$$isolateScope) a = ia(a, { isolateScope: !0 }); h.push(a) } if (b) { c && (b = O(b, c, d)); b.require = B.require; b.directiveName = L; if (C === B || B.$$isolateScope) b = ia(b, { isolateScope: !0 }); k.push(b) } } function n(a, c, e, f, g) {
                    function l(a, b, c, d) {
                        var e;
                        ab(a) || (d = c, c = b, b = a, a = u); Ca && (e = K); c || (c = Ca ? t.parent() : t); if (d) { var f = g.$$slots[d]; if (f) return f(a, b, e, c, s); if (z(f)) throw ga("noslot", d, wa(t)); } else return g(a, b, e, c, s)
                    } var m, r, p, B, I, K, x, t; b === e ? (f = d, t = d.$$element) : (t = H(e), f = new qa(t, d)); I = c; C ? B = c.$new(!0) : G && (I = c.$parent); g && (x = l, x.$$boundTransclude = g, x.isSlotFilled = function (a) { return !!g.$$slots[a] }); v && (K = T(t, f, x, v, B, c, C)); C && (ba.$$addScopeInfo(t, B, !0, !(w && (w === C || w === C.$$originalDirective))), ba.$$addScopeClass(t, !0), B.$$isolateBindings = C.$$isolateBindings,
                    (p = ha(c, f, B, B.$$isolateBindings, C)) && B.$on("$destroy", p)); for (r in K) { p = v[r]; var Va = K[r], Q = p.$$bindings.bindToController; Va.identifier && Q && (m = ha(I, f, Va.instance, Q, p)); var L = Va(); L !== Va.instance && (Va.instance = L, t.data("$" + p.name + "Controller", L), m && m(), m = ha(I, f, Va.instance, Q, p)) } q(v, function (a, b) { var c = a.require; a.bindToController && !M(c) && J(c) && S(K[b].instance, jb(b, c, t, K)) }); q(K, function (a) { var b = a.instance; D(b.$onInit) && b.$onInit(); D(b.$onDestroy) && I.$on("$destroy", function () { b.$onDestroy() }) }); m =
                    0; for (r = h.length; m < r; m++) p = h[m], ja(p, p.isolateScope ? B : c, t, f, p.require && jb(p.directiveName, p.require, t, K), x); var s = c; C && (C.template || null === C.templateUrl) && (s = B); a && a(s, e.childNodes, u, g); for (m = k.length - 1; 0 <= m; m--) p = k[m], ja(p, p.isolateScope ? B : c, t, f, p.require && jb(p.directiveName, p.require, t, K), x); q(K, function (a) { a = a.instance; D(a.$postLink) && a.$postLink() })
                } l = l || {}; for (var p = -Number.MAX_VALUE, G = l.newScopeDirective, v = l.controllerDirectives, C = l.newIsolateScopeDirective, w = l.templateDirective, I = l.nonTlbTranscludeDirective,
                K = !1, x = !1, Ca = l.hasElementTranscludeDirective, t = d.$$element = H(b), B, L, Q, s = e, xa, Ea = !1, E = !1, y, ra = 0, N = a.length; ra < N; ra++) {
                    B = a[ra]; var R = B.$$start, Fa = B.$$end; R && (t = Wc(b, R, Fa)); Q = u; if (p > B.priority) break; if (y = B.scope) B.templateUrl || (J(y) ? (X("new/isolated scope", C || G, B, t), C = B) : X("new/isolated scope", C, B, t)), G = G || B; L = B.name; if (!Ea && (B.replace && (B.templateUrl || B.template) || B.transclude && !B.$$tlb)) { for (y = ra + 1; Ea = a[y++];) if (Ea.transclude && !Ea.$$tlb || Ea.replace && (Ea.templateUrl || Ea.template)) { E = !0; break } Ea = !0 } !B.templateUrl &&
                    B.controller && (y = B.controller, v = v || V(), X("'" + L + "' controller", v[L], B, t), v[L] = B); if (y = B.transclude) if (K = !0, B.$$tlb || (X("transclusion", I, B, t), I = B), "element" == y) Ca = !0, p = B.priority, Q = t, t = d.$$element = H(ba.$$createComment(L, d[L])), b = t[0], da(f, Aa.call(Q, 0), b), Q[0].$$parentNode = Q[0].parentNode, s = Zb(E, Q, e, p, g && g.name, { nonTlbTranscludeDirective: I }); else {
                        var P = V(); Q = H(Wb(b)).contents(); if (J(y)) {
                            Q = []; var Z = V(), Y = V(); q(y, function (a, b) { var c = "?" === a.charAt(0); a = c ? a.substring(1) : a; Z[a] = b; P[b] = null; Y[b] = c }); q(t.contents(),
                            function (a) { var b = Z[ya(oa(a))]; b ? (Y[b] = !0, P[b] = P[b] || [], P[b].push(a)) : Q.push(a) }); q(Y, function (a, b) { if (!a) throw ga("reqslot", b); }); for (var $ in P) P[$] && (P[$] = Zb(E, P[$], e))
                        } t.empty(); s = Zb(E, Q, e, u, u, { needsNewScope: B.$$isolateScope || B.$$newScope }); s.$$slots = P
                    } if (B.template) if (x = !0, X("template", w, B, t), w = B, y = D(B.template) ? B.template(t, d) : B.template, y = ua(y), B.replace) {
                        g = B; Q = Ub.test(y) ? Xc(ca(B.templateNamespace, W(y))) : []; b = Q[0]; if (1 != Q.length || 1 !== b.nodeType) throw ga("tplrt", L, ""); da(f, t, b); N = { $attr: {} };
                        y = A(b, [], N); var ea = a.splice(ra + 1, a.length - (ra + 1)); (C || G) && Yc(y, C, G); a = a.concat(y).concat(ea); U(d, N); N = a.length
                    } else t.html(y); if (B.templateUrl) x = !0, X("template", w, B, t), w = B, B.replace && (g = B), n = aa(a.splice(ra, a.length - ra), t, d, f, K && s, h, k, { controllerDirectives: v, newScopeDirective: G !== B && G, newIsolateScopeDirective: C, templateDirective: w, nonTlbTranscludeDirective: I }), N = a.length; else if (B.compile) try { xa = B.compile(t, d, s), D(xa) ? m(null, xa, R, Fa) : xa && m(xa.pre, xa.post, R, Fa) } catch (fa) { c(fa, wa(t)) } B.terminal && (n.terminal =
                    !0, p = Math.max(p, B.priority))
                } n.scope = G && !0 === G.scope; n.transcludeOnThisElement = K; n.templateOnThisElement = x; n.transclude = s; l.hasElementTranscludeDirective = Ca; return n
            } function jb(a, b, c, d) {
                var e; if (y(b)) { var f = b.match(k); b = b.substring(f[0].length); var g = f[1] || f[3], f = "?" === f[2]; "^^" === g ? c = c.parent() : e = (e = d && d[b]) && e.instance; if (!e) { var h = "$" + b + "Controller"; e = g ? c.inheritedData(h) : c.data(h) } if (!e && !f) throw ga("ctreq", b, a); } else if (M(b)) for (e = [], g = 0, f = b.length; g < f; g++) e[g] = jb(a, b[g], c, d); else J(b) && (e =
                {}, q(b, function (b, f) { e[f] = jb(a, b, c, d) })); return e || null
            } function T(a, b, c, d, e, f, g) { var h = V(), k; for (k in d) { var l = d[k], m = { $scope: l === g || l.$$isolateScope ? e : f, $element: a, $attrs: b, $transclude: c }, n = l.controller; "@" == n && (n = b[l.name]); m = Q(n, m, !0, l.controllerAs); h[l.name] = m; a.data("$" + l.name + "Controller", m.instance) } return h } function Yc(a, b, c) { for (var d = 0, e = a.length; d < e; d++) a[d] = Qb(a[d], { $$isolateScope: b, $$newScope: c }) } function Fa(b, f, g, h, k, l, m) {
                if (f === k) return null; k = null; if (e.hasOwnProperty(f)) {
                    var n; f =
                    a.get(f + "Directive"); for (var p = 0, G = f.length; p < G; p++) try {
                        if (n = f[p], (z(h) || h > n.priority) && -1 != n.restrict.indexOf(g)) {
                            l && (n = Qb(n, { $$start: l, $$end: m })); if (!n.$$bindings) {
                                var v = n, C = n, w = n.name, B = { isolateScope: null, bindToController: null }; J(C.scope) && (!0 === C.bindToController ? (B.bindToController = d(C.scope, w, !0), B.isolateScope = {}) : B.isolateScope = d(C.scope, w, !1)); J(C.bindToController) && (B.bindToController = d(C.bindToController, w, !0)); if (J(B.bindToController)) {
                                    var I = C.controller, K = C.controllerAs; if (!I) throw ga("noctrl",
                                    w); if (!Uc(I, K)) throw ga("noident", w);
                                } var x = v.$$bindings = B; J(x.isolateScope) && (n.$$isolateBindings = x.isolateScope)
                            } b.push(n); k = n
                        }
                    } catch (t) { c(t) }
                } return k
            } function R(b) { if (e.hasOwnProperty(b)) for (var c = a.get(b + "Directive"), d = 0, f = c.length; d < f; d++) if (b = c[d], b.multiElement) return !0; return !1 } function U(a, b) {
                var c = b.$attr, d = a.$attr, e = a.$$element; q(a, function (d, e) { "$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e])) }); q(b, function (b, f) {
                    "class" == f ? (B(e, b), a["class"] = (a["class"] ?
                    a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f])
                })
            } function aa(a, b, c, d, e, f, g, h) {
                var k = [], l, n, p = b[0], r = a.shift(), G = Qb(r, { templateUrl: null, transclude: null, replace: null, $$originalDirective: r }), v = D(r.templateUrl) ? r.templateUrl(b, c) : r.templateUrl, C = r.templateNamespace; b.empty(); m(v).then(function (m) {
                    var w, I; m = ua(m); if (r.replace) {
                        m = Ub.test(m) ? Xc(ca(C, W(m))) : []; w = m[0]; if (1 != m.length || 1 !==
                        w.nodeType) throw ga("tplrt", r.name, v); m = { $attr: {} }; da(d, b, w); var K = A(w, [], m); J(r.scope) && Yc(K, !0); a = K.concat(a); U(c, m)
                    } else w = p, b.html(m); a.unshift(G); l = ra(a, w, c, e, b, r, f, g, h); q(d, function (a, c) { a == w && (d[c] = b[0]) }); for (n = xa(b[0].childNodes, e) ; k.length;) { m = k.shift(); I = k.shift(); var x = k.shift(), t = k.shift(), K = b[0]; if (!m.$$destroyed) { if (I !== p) { var qa = I.className; h.hasElementTranscludeDirective && r.replace || (K = Wb(w)); da(x, H(I), K); B(H(K), qa) } I = l.transcludeOnThisElement ? s(m, l.transclude, t) : t; l(n, m, K, d, I) } } k =
                    null
                }); return function (a, b, c, d, e) { a = e; b.$$destroyed || (k ? k.push(b, c, d, a) : (l.transcludeOnThisElement && (a = s(b, l.transclude, e)), l(n, b, c, d, a))) }
            } function Z(a, b) { var c = b.priority - a.priority; return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index } function X(a, b, c, d) { function e(a) { return a ? " (module: " + a + ")" : "" } if (b) throw ga("multidir", b.name, e(b.$$moduleName), c.name, e(c.$$moduleName), a, wa(d)); } function Y(a, c) {
                var d = b(c, !0); d && a.push({
                    priority: 0, compile: function (a) {
                        a = a.parent(); var b = !!a.length;
                        b && ba.$$addBindingClass(a); return function (a, c) { var e = c.parent(); b || ba.$$addBindingClass(e); ba.$$addBindingInfo(e, d.expressions); a.$watch(d, function (a) { c[0].nodeValue = a }) }
                    }
                })
            } function ca(a, b) { a = N(a || "html"); switch (a) { case "svg": case "math": var c = P.createElement("div"); c.innerHTML = "<" + a + ">" + b + "</" + a + ">"; return c.childNodes[0].childNodes; default: return b } } function ea(a, b) { if ("srcdoc" == b) return G.HTML; var c = oa(a); if ("xlinkHref" == b || "form" == c && "action" == b || "img" != c && ("src" == b || "ngSrc" == b)) return G.RESOURCE_URL }
            function fa(a, c, d, e, f) { var g = ea(a, e); f = h[e] || f; var k = b(d, !0, g, f); if (k) { if ("multiple" === e && "select" === oa(a)) throw ga("selmulti", wa(a)); c.push({ priority: 100, compile: function () { return { pre: function (a, c, h) { c = h.$$observers || (h.$$observers = V()); if (l.test(e)) throw ga("nodomevents"); var m = h[e]; m !== d && (k = m && b(m, !0, g, f), d = m); k && (h[e] = k(a), (c[e] || (c[e] = [])).$$inter = !0, (h.$$observers && h.$$observers[e].$$scope || a).$watch(k, function (a, b) { "class" === e && a != b ? h.$updateClass(a, b) : h.$set(e, a) })) } } } }) } } function da(a, b,
            c) { var d = b[0], e = b.length, f = d.parentNode, g, h; if (a) for (g = 0, h = a.length; g < h; g++) if (a[g] == d) { a[g++] = c; h = g + e - 1; for (var k = a.length; g < k; g++, h++) h < k ? a[g] = a[h] : delete a[g]; a.length -= e - 1; a.context === d && (a.context = c); break } f && f.replaceChild(c, d); a = P.createDocumentFragment(); for (g = 0; g < e; g++) a.appendChild(b[g]); H.hasData(d) && (H.data(c, H.data(d)), H(d).off("$destroy")); H.cleanData(a.querySelectorAll("*")); for (g = 1; g < e; g++) delete b[g]; b[0] = c; b.length = 1 } function ia(a, b) {
                return S(function () { return a.apply(null, arguments) },
                a, b)
            } function ja(a, b, d, e, f, g) { try { a(b, d, e, f, g) } catch (h) { c(h, wa(d)) } } function ha(a, c, d, e, f) {
                function g(b, c, e) { D(d.$onChanges) && c !== e && ($ || (a.$$postDigest(I), $ = []), l || (l = {}, $.push(h)), l[b] && (e = l[b].previousValue), l[b] = { previousValue: e, currentValue: c }) } function h() { d.$onChanges(l); l = u } var k = [], l; q(e, function (e, h) {
                    var l = e.attrName, m = e.optional, n, r, p, G; switch (e.mode) {
                        case "@": m || va.call(c, l) || (d[h] = c[l] = void 0); c.$observe(l, function (a) { y(a) && (g(h, a, d[h]), d[h] = a) }); c.$$observers[l].$$scope = a; n = c[l]; y(n) ?
                        d[h] = b(n)(a) : Oa(n) && (d[h] = n); break; case "=": if (!va.call(c, l)) { if (m) break; c[l] = void 0 } if (m && !c[l]) break; r = v(c[l]); G = r.literal ? na : function (a, b) { return a === b || a !== a && b !== b }; p = r.assign || function () { n = d[h] = r(a); throw ga("nonassign", c[l], l, f.name); }; n = d[h] = r(a); m = function (b) { G(b, d[h]) || (G(b, n) ? p(a, b = d[h]) : d[h] = b); return n = b }; m.$stateful = !0; m = e.collection ? a.$watchCollection(c[l], m) : a.$watch(v(c[l], m), null, r.literal); k.push(m); break; case "<": if (!va.call(c, l)) { if (m) break; c[l] = void 0 } if (m && !c[l]) break; r = v(c[l]);
                            d[h] = r(a); m = a.$watch(r, function (a) { g(h, a, d[h]); d[h] = a }, r.literal); k.push(m); break; case "&": r = c.hasOwnProperty(l) ? v(c[l]) : E; if (r === E && m) break; d[h] = function (b) { return r(a, b) }
                    }
                }); return k.length && function () { for (var a = 0, b = k.length; a < b; ++a) k[a]() }
            } var ma = /^\w/, la = P.createElement("div"), pa = p, $; qa.prototype = {
                $normalize: ya, $addClass: function (a) { a && 0 < a.length && C.addClass(this.$$element, a) }, $removeClass: function (a) { a && 0 < a.length && C.removeClass(this.$$element, a) }, $updateClass: function (a, b) {
                    var c = Zc(a, b); c &&
                    c.length && C.addClass(this.$$element, c); (c = Zc(b, a)) && c.length && C.removeClass(this.$$element, c)
                }, $set: function (a, b, d, e) {
                    var f = Rc(this.$$element[0], a), g = $c[a], h = a; f ? (this.$$element.prop(a, b), e = f) : g && (this[g] = b, h = g); this[a] = b; e ? this.$attr[a] = e : (e = this.$attr[a]) || (this.$attr[a] = e = zc(a, "-")); f = oa(this.$$element); if ("a" === f && ("href" === a || "xlinkHref" === a) || "img" === f && "src" === a) this[a] = b = K(b, "src" === a); else if ("img" === f && "srcset" === a) {
                        for (var f = "", g = W(b), k = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, k = /\s/.test(g) ?
                            k : /(,)/, g = g.split(k), k = Math.floor(g.length / 2), l = 0; l < k; l++) var m = 2 * l, f = f + K(W(g[m]), !0), f = f + (" " + W(g[m + 1])); g = W(g[2 * l]).split(/\s/); f += K(W(g[0]), !0); 2 === g.length && (f += " " + W(g[1])); this[a] = b = f
                    } !1 !== d && (null === b || z(b) ? this.$$element.removeAttr(e) : ma.test(e) ? this.$$element.attr(e, b) : Ca(this.$$element[0], e, b)); (a = this.$$observers) && q(a[h], function (a) { try { a(b) } catch (d) { c(d) } })
                }, $observe: function (a, b) {
                    var c = this, d = c.$$observers || (c.$$observers = V()), e = d[a] || (d[a] = []); e.push(b); t.$evalAsync(function () {
                        e.$$inter ||
                        !c.hasOwnProperty(a) || z(c[a]) || b(c[a])
                    }); return function () { bb(e, b) }
                }
            }; var sa = b.startSymbol(), ta = b.endSymbol(), ua = "{{" == sa && "}}" == ta ? $a : function (a) { return a.replace(/\{\{/g, sa).replace(/}}/g, ta) }, za = /^ngAttr[A-Z]/, Ba = /^(.+)Start$/; ba.$$addBindingInfo = n ? function (a, b) { var c = a.data("$binding") || []; M(b) ? c = c.concat(b) : c.push(b); a.data("$binding", c) } : E; ba.$$addBindingClass = n ? function (a) { B(a, "ng-binding") } : E; ba.$$addScopeInfo = n ? function (a, b, c, d) {
                a.data(c ? d ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope",
                b)
            } : E; ba.$$addScopeClass = n ? function (a, b) { B(a, b ? "ng-isolate-scope" : "ng-scope") } : E; ba.$$createComment = function (a, b) { var c = ""; n && (c = " " + (a || "") + ": " + (b || "") + " "); return P.createComment(c) }; return ba
        }]
    } function ya(a) { return fb(a.replace(Vc, "")) } function Zc(a, b) { var d = "", c = a.split(/\s+/), e = b.split(/\s+/), f = 0; a: for (; f < c.length; f++) { for (var g = c[f], h = 0; h < e.length; h++) if (g == e[h]) continue a; d += (0 < d.length ? " " : "") + g } return d } function Xc(a) {
        a = H(a); var b = a.length; if (1 >= b) return a; for (; b--;) 8 === a[b].nodeType &&
        Yf.call(a, b, 1); return a
    } function Uc(a, b) { if (b && y(b)) return b; if (y(a)) { var d = ad.exec(a); if (d) return d[3] } } function df() {
        var a = {}, b = !1; this.has = function (b) { return a.hasOwnProperty(b) }; this.register = function (b, c) { Ta(b, "controller"); J(b) ? S(a, b) : a[b] = c }; this.allowGlobals = function () { b = !0 }; this.$get = ["$injector", "$window", function (d, c) {
            function e(a, b, c, d) { if (!a || !J(a.$scope)) throw O("$controller")("noscp", d, b); a.$scope[b] = c } return function (f, g, h, k) {
                var l, m, n; h = !0 === h; k && y(k) && (n = k); if (y(f)) {
                    k = f.match(ad);
                    if (!k) throw Zf("ctrlfmt", f); m = k[1]; n = n || k[3]; f = a.hasOwnProperty(m) ? a[m] : Bc(g.$scope, m, !0) || (b ? Bc(c, m, !0) : u); Sa(f, m, !0)
                } if (h) return h = (M(f) ? f[f.length - 1] : f).prototype, l = Object.create(h || null), n && e(g, n, l, m || f.name), S(function () { var a = d.invoke(f, l, g, m); a !== l && (J(a) || D(a)) && (l = a, n && e(g, n, l, m || f.name)); return l }, { instance: l, identifier: n }); l = d.instantiate(f, g, m); n && e(g, n, l, m || f.name); return l
            }
        }]
    } function ef() { this.$get = ["$window", function (a) { return H(a.document) }] } function ff() {
        this.$get = ["$log", function (a) {
            return function (b,
            d) { a.error.apply(a, arguments) }
        }]
    } function $b(a) { return J(a) ? fa(a) ? a.toISOString() : db(a) : a } function lf() { this.$get = function () { return function (a) { if (!a) return ""; var b = []; pc(a, function (a, c) { null === a || z(a) || (M(a) ? q(a, function (a) { b.push(ja(c) + "=" + ja($b(a))) }) : b.push(ja(c) + "=" + ja($b(a)))) }); return b.join("&") } } } function mf() {
        this.$get = function () {
            return function (a) {
                function b(a, e, f) {
                    null === a || z(a) || (M(a) ? q(a, function (a, c) { b(a, e + "[" + (J(a) ? c : "") + "]") }) : J(a) && !fa(a) ? pc(a, function (a, c) {
                        b(a, e + (f ? "" : "[") + c + (f ?
                        "" : "]"))
                    }) : d.push(ja(e) + "=" + ja($b(a))))
                } if (!a) return ""; var d = []; b(a, "", !0); return d.join("&")
            }
        }
    } function ac(a, b) { if (y(a)) { var d = a.replace($f, "").trim(); if (d) { var c = b("Content-Type"); (c = c && 0 === c.indexOf(bd)) || (c = (c = d.match(ag)) && bg[c[0]].test(d)); c && (a = uc(d)) } } return a } function cd(a) { var b = V(), d; y(a) ? q(a.split("\n"), function (a) { d = a.indexOf(":"); var e = N(W(a.substr(0, d))); a = W(a.substr(d + 1)); e && (b[e] = b[e] ? b[e] + ", " + a : a) }) : J(a) && q(a, function (a, d) { var f = N(d), g = W(a); f && (b[f] = b[f] ? b[f] + ", " + g : g) }); return b }
    function dd(a) { var b; return function (d) { b || (b = cd(a)); return d ? (d = b[N(d)], void 0 === d && (d = null), d) : b } } function ed(a, b, d, c) { if (D(c)) return c(a, b, d); q(c, function (c) { a = c(a, b, d) }); return a } function kf() {
        var a = this.defaults = {
            transformResponse: [ac], transformRequest: [function (a) { return J(a) && "[object File]" !== ka.call(a) && "[object Blob]" !== ka.call(a) && "[object FormData]" !== ka.call(a) ? db(a) : a }], headers: { common: { Accept: "application/json, text/plain, */*" }, post: ia(bc), put: ia(bc), patch: ia(bc) }, xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN", paramSerializer: "$httpParamSerializer"
        }, b = !1; this.useApplyAsync = function (a) { return A(a) ? (b = !!a, this) : b }; var d = !0; this.useLegacyPromiseExtensions = function (a) { return A(a) ? (d = !!a, this) : d }; var c = this.interceptors = []; this.$get = ["$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function (e, f, g, h, k, l) {
            function m(b) {
                function c(a) { var b = S({}, a); b.data = ed(a.data, a.headers, a.status, f.transformResponse); a = a.status; return 200 <= a && 300 > a ? b : k.reject(b) } function e(a,
                b) { var c, d = {}; q(a, function (a, e) { D(a) ? (c = a(b), null != c && (d[e] = c)) : d[e] = a }); return d } if (!J(b)) throw O("$http")("badreq", b); if (!y(b.url)) throw O("$http")("badreq", b.url); var f = S({ method: "get", transformRequest: a.transformRequest, transformResponse: a.transformResponse, paramSerializer: a.paramSerializer }, b); f.headers = function (b) { var c = a.headers, d = S({}, b.headers), f, g, h, c = S({}, c.common, c[N(b.method)]); a: for (f in c) { g = N(f); for (h in d) if (N(h) === g) continue a; d[f] = c[f] } return e(d, ia(b)) }(b); f.method = vb(f.method);
                f.paramSerializer = y(f.paramSerializer) ? l.get(f.paramSerializer) : f.paramSerializer; var g = [function (b) { var d = b.headers, e = ed(b.data, dd(d), u, b.transformRequest); z(e) && q(d, function (a, b) { "content-type" === N(b) && delete d[b] }); z(b.withCredentials) && !z(a.withCredentials) && (b.withCredentials = a.withCredentials); return n(b, e).then(c, c) }, u], h = k.when(f); for (q(L, function (a) { (a.request || a.requestError) && g.unshift(a.request, a.requestError); (a.response || a.responseError) && g.push(a.response, a.responseError) }) ; g.length;) {
                    b =
                    g.shift(); var m = g.shift(), h = h.then(b, m)
                } d ? (h.success = function (a) { Sa(a, "fn"); h.then(function (b) { a(b.data, b.status, b.headers, f) }); return h }, h.error = function (a) { Sa(a, "fn"); h.then(null, function (b) { a(b.data, b.status, b.headers, f) }); return h }) : (h.success = fd("success"), h.error = fd("error")); return h
            } function n(c, d) {
                function g(a, c, d, e) { function f() { l(c, a, d, e) } K && (200 <= a && 300 > a ? K.put(L, [a, c, cd(d), e]) : K.remove(L)); b ? h.$applyAsync(f) : (f(), h.$$phase || h.$apply()) } function l(a, b, d, e) {
                    b = -1 <= b ? b : 0; (200 <= b && 300 > b ? G.resolve :
                    G.reject)({ data: a, status: b, headers: dd(d), config: c, statusText: e })
                } function n(a) { l(a.data, a.status, ia(a.headers()), a.statusText) } function t() { var a = m.pendingRequests.indexOf(c); -1 !== a && m.pendingRequests.splice(a, 1) } var G = k.defer(), C = G.promise, K, I, qa = c.headers, L = p(c.url, c.paramSerializer(c.params)); m.pendingRequests.push(c); C.then(t, t); !c.cache && !a.cache || !1 === c.cache || "GET" !== c.method && "JSONP" !== c.method || (K = J(c.cache) ? c.cache : J(a.cache) ? a.cache : F); K && (I = K.get(L), A(I) ? I && D(I.then) ? I.then(n, n) : M(I) ?
                l(I[1], I[0], ia(I[2]), I[3]) : l(I, 200, {}, "OK") : K.put(L, C)); z(I) && ((I = gd(c.url) ? f()[c.xsrfCookieName || a.xsrfCookieName] : u) && (qa[c.xsrfHeaderName || a.xsrfHeaderName] = I), e(c.method, L, d, g, qa, c.timeout, c.withCredentials, c.responseType)); return C
            } function p(a, b) { 0 < b.length && (a += (-1 == a.indexOf("?") ? "?" : "&") + b); return a } var F = g("$http"); a.paramSerializer = y(a.paramSerializer) ? l.get(a.paramSerializer) : a.paramSerializer; var L = []; q(c, function (a) { L.unshift(y(a) ? l.get(a) : l.invoke(a)) }); m.pendingRequests = []; (function (a) {
                q(arguments,
                function (a) { m[a] = function (b, c) { return m(S({}, c || {}, { method: a, url: b })) } })
            })("get", "delete", "head", "jsonp"); (function (a) { q(arguments, function (a) { m[a] = function (b, c, d) { return m(S({}, d || {}, { method: a, url: b, data: c })) } }) })("post", "put", "patch"); m.defaults = a; return m
        }]
    } function of() { this.$get = function () { return function () { return new T.XMLHttpRequest } } } function nf() { this.$get = ["$browser", "$window", "$document", "$xhrFactory", function (a, b, d, c) { return cg(a, c, a.defer, b.angular.callbacks, d[0]) }] } function cg(a, b, d,
    c, e) {
        function f(a, b, d) { var f = e.createElement("script"), m = null; f.type = "text/javascript"; f.src = a; f.async = !0; m = function (a) { f.removeEventListener("load", m, !1); f.removeEventListener("error", m, !1); e.body.removeChild(f); f = null; var g = -1, F = "unknown"; a && ("load" !== a.type || c[b].called || (a = { type: "error" }), F = a.type, g = "error" === a.type ? 404 : 200); d && d(g, F) }; f.addEventListener("load", m, !1); f.addEventListener("error", m, !1); e.body.appendChild(f); return m } return function (e, h, k, l, m, n, p, F) {
            function L() { w && w(); v && v.abort() }
            function x(b, c, e, f, g) { A(t) && d.cancel(t); w = v = null; b(c, e, f, g); a.$$completeOutstandingRequest(E) } a.$$incOutstandingRequestCount(); h = h || a.url(); if ("jsonp" == N(e)) { var r = "_" + (c.counter++).toString(36); c[r] = function (a) { c[r].data = a; c[r].called = !0 }; var w = f(h.replace("JSON_CALLBACK", "angular.callbacks." + r), r, function (a, b) { x(l, a, c[r].data, "", b); c[r] = E }) } else {
                var v = b(e, h); v.open(e, h, !0); q(m, function (a, b) { A(a) && v.setRequestHeader(b, a) }); v.onload = function () {
                    var a = v.statusText || "", b = "response" in v ? v.response : v.responseText,
                    c = 1223 === v.status ? 204 : v.status; 0 === c && (c = b ? 200 : "file" == sa(h).protocol ? 404 : 0); x(l, c, b, v.getAllResponseHeaders(), a)
                }; e = function () { x(l, -1, null, null, "") }; v.onerror = e; v.onabort = e; p && (v.withCredentials = !0); if (F) try { v.responseType = F } catch (Q) { if ("json" !== F) throw Q; } v.send(z(k) ? null : k)
            } if (0 < n) var t = d(L, n); else n && D(n.then) && n.then(L)
        }
    } function hf() {
        var a = "{{", b = "}}"; this.startSymbol = function (b) { return b ? (a = b, this) : a }; this.endSymbol = function (a) { return a ? (b = a, this) : b }; this.$get = ["$parse", "$exceptionHandler",
        "$sce", function (d, c, e) {
            function f(a) { return "\\\\\\" + a } function g(c) { return c.replace(n, a).replace(p, b) } function h(a, b, c, d) { var e; return e = a.$watch(function (a) { e(); return d(a) }, b, c) } function k(f, k, n, r) {
                function p(a) { try { var b = a; a = n ? e.getTrusted(n, b) : e.valueOf(b); var d; if (r && !A(a)) d = a; else if (null == a) d = ""; else { switch (typeof a) { case "string": break; case "number": a = "" + a; break; default: a = db(a) } d = a } return d } catch (g) { c(La.interr(f, g)) } } if (!f.length || -1 === f.indexOf(a)) {
                    var v; k || (k = g(f), v = da(k), v.exp = f, v.expressions =
                    [], v.$$watchDelegate = h); return v
                } r = !!r; var q, t, G = 0, C = [], K = []; v = f.length; for (var I = [], qa = []; G < v;) if (-1 != (q = f.indexOf(a, G)) && -1 != (t = f.indexOf(b, q + l))) G !== q && I.push(g(f.substring(G, q))), G = f.substring(q + l, t), C.push(G), K.push(d(G, p)), G = t + m, qa.push(I.length), I.push(""); else { G !== v && I.push(g(f.substring(G))); break } n && 1 < I.length && La.throwNoconcat(f); if (!k || C.length) {
                    var Ca = function (a) { for (var b = 0, c = C.length; b < c; b++) { if (r && z(a[b])) return; I[qa[b]] = a[b] } return I.join("") }; return S(function (a) {
                        var b = 0, d = C.length,
                        e = Array(d); try { for (; b < d; b++) e[b] = K[b](a); return Ca(e) } catch (g) { c(La.interr(f, g)) }
                    }, { exp: f, expressions: C, $$watchDelegate: function (a, b) { var c; return a.$watchGroup(K, function (d, e) { var f = Ca(d); D(b) && b.call(this, f, d !== e ? c : f, a); c = f }) } })
                }
            } var l = a.length, m = b.length, n = new RegExp(a.replace(/./g, f), "g"), p = new RegExp(b.replace(/./g, f), "g"); k.startSymbol = function () { return a }; k.endSymbol = function () { return b }; return k
        }]
    } function jf() {
        this.$get = ["$rootScope", "$window", "$q", "$$q", "$browser", function (a, b, d, c, e) {
            function f(f,
            k, l, m) { function n() { p ? f.apply(null, F) : f(r) } var p = 4 < arguments.length, F = p ? Aa.call(arguments, 4) : [], q = b.setInterval, x = b.clearInterval, r = 0, w = A(m) && !m, v = (w ? c : d).defer(), Q = v.promise; l = A(l) ? l : 0; Q.$$intervalId = q(function () { w ? e.defer(n) : a.$evalAsync(n); v.notify(r++); 0 < l && r >= l && (v.resolve(r), x(Q.$$intervalId), delete g[Q.$$intervalId]); w || a.$apply() }, k); g[Q.$$intervalId] = v; return Q } var g = {}; f.cancel = function (a) {
                return a && a.$$intervalId in g ? (g[a.$$intervalId].reject("canceled"), b.clearInterval(a.$$intervalId),
                delete g[a.$$intervalId], !0) : !1
            }; return f
        }]
    } function cc(a) { a = a.split("/"); for (var b = a.length; b--;) a[b] = rb(a[b]); return a.join("/") } function hd(a, b) { var d = sa(a); b.$$protocol = d.protocol; b.$$host = d.hostname; b.$$port = Y(d.port) || dg[d.protocol] || null } function id(a, b) {
        var d = "/" !== a.charAt(0); d && (a = "/" + a); var c = sa(a); b.$$path = decodeURIComponent(d && "/" === c.pathname.charAt(0) ? c.pathname.substring(1) : c.pathname); b.$$search = xc(c.search); b.$$hash = decodeURIComponent(c.hash); b.$$path && "/" != b.$$path.charAt(0) && (b.$$path =
        "/" + b.$$path)
    } function la(a, b) { if (0 === b.indexOf(a)) return b.substr(a.length) } function Ka(a) { var b = a.indexOf("#"); return -1 == b ? a : a.substr(0, b) } function kb(a) { return a.replace(/(#.+)|#$/, "$1") } function dc(a, b, d) {
        this.$$html5 = !0; d = d || ""; hd(a, this); this.$$parse = function (a) { var d = la(b, a); if (!y(d)) throw Fb("ipthprfx", a, b); id(d, this); this.$$path || (this.$$path = "/"); this.$$compose() }; this.$$compose = function () {
            var a = Sb(this.$$search), d = this.$$hash ? "#" + rb(this.$$hash) : ""; this.$$url = cc(this.$$path) + (a ? "?" + a : "") +
            d; this.$$absUrl = b + this.$$url.substr(1)
        }; this.$$parseLinkUrl = function (c, e) { if (e && "#" === e[0]) return this.hash(e.slice(1)), !0; var f, g; A(f = la(a, c)) ? (g = f, g = A(f = la(d, f)) ? b + (la("/", f) || f) : a + g) : A(f = la(b, c)) ? g = b + f : b == c + "/" && (g = b); g && this.$$parse(g); return !!g }
    } function ec(a, b, d) {
        hd(a, this); this.$$parse = function (c) {
            var e = la(a, c) || la(b, c), f; z(e) || "#" !== e.charAt(0) ? this.$$html5 ? f = e : (f = "", z(e) && (a = c, this.replace())) : (f = la(d, e), z(f) && (f = e)); id(f, this); c = this.$$path; var e = a, g = /^\/[A-Z]:(\/.*)/; 0 === f.indexOf(e) &&
            (f = f.replace(e, "")); g.exec(f) || (c = (f = g.exec(c)) ? f[1] : c); this.$$path = c; this.$$compose()
        }; this.$$compose = function () { var b = Sb(this.$$search), e = this.$$hash ? "#" + rb(this.$$hash) : ""; this.$$url = cc(this.$$path) + (b ? "?" + b : "") + e; this.$$absUrl = a + (this.$$url ? d + this.$$url : "") }; this.$$parseLinkUrl = function (b, d) { return Ka(a) == Ka(b) ? (this.$$parse(b), !0) : !1 }
    } function jd(a, b, d) {
        this.$$html5 = !0; ec.apply(this, arguments); this.$$parseLinkUrl = function (c, e) {
            if (e && "#" === e[0]) return this.hash(e.slice(1)), !0; var f, g; a == Ka(c) ?
            f = c : (g = la(b, c)) ? f = a + d + g : b === c + "/" && (f = b); f && this.$$parse(f); return !!f
        }; this.$$compose = function () { var b = Sb(this.$$search), e = this.$$hash ? "#" + rb(this.$$hash) : ""; this.$$url = cc(this.$$path) + (b ? "?" + b : "") + e; this.$$absUrl = a + d + this.$$url }
    } function Gb(a) { return function () { return this[a] } } function kd(a, b) { return function (d) { if (z(d)) return this[a]; this[a] = b(d); this.$$compose(); return this } } function pf() {
        var a = "", b = { enabled: !1, requireBase: !0, rewriteLinks: !0 }; this.hashPrefix = function (b) {
            return A(b) ? (a = b, this) :
            a
        }; this.html5Mode = function (a) { return Oa(a) ? (b.enabled = a, this) : J(a) ? (Oa(a.enabled) && (b.enabled = a.enabled), Oa(a.requireBase) && (b.requireBase = a.requireBase), Oa(a.rewriteLinks) && (b.rewriteLinks = a.rewriteLinks), this) : b }; this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function (d, c, e, f, g) {
            function h(a, b, d) { var e = l.url(), f = l.$$state; try { c.url(a, b, d), l.$$state = c.state() } catch (g) { throw l.url(e), l.$$state = f, g; } } function k(a, b) {
                d.$broadcast("$locationChangeSuccess", l.absUrl(), a, l.$$state,
                b)
            } var l, m; m = c.baseHref(); var n = c.url(), p; if (b.enabled) { if (!m && b.requireBase) throw Fb("nobase"); p = n.substring(0, n.indexOf("/", n.indexOf("//") + 2)) + (m || "/"); m = e.history ? dc : jd } else p = Ka(n), m = ec; var F = p.substr(0, Ka(p).lastIndexOf("/") + 1); l = new m(p, F, "#" + a); l.$$parseLinkUrl(n, n); l.$$state = c.state(); var q = /^\s*(javascript|mailto):/i; f.on("click", function (a) {
                if (b.rewriteLinks && !a.ctrlKey && !a.metaKey && !a.shiftKey && 2 != a.which && 2 != a.button) {
                    for (var e = H(a.target) ; "a" !== oa(e[0]) ;) if (e[0] === f[0] || !(e = e.parent())[0]) return;
                    var h = e.prop("href"), k = e.attr("href") || e.attr("xlink:href"); J(h) && "[object SVGAnimatedString]" === h.toString() && (h = sa(h.animVal).href); q.test(h) || !h || e.attr("target") || a.isDefaultPrevented() || !l.$$parseLinkUrl(h, k) || (a.preventDefault(), l.absUrl() != c.url() && (d.$apply(), g.angular["ff-684208-preventDefault"] = !0))
                }
            }); kb(l.absUrl()) != kb(n) && c.url(l.absUrl(), !0); var x = !0; c.onUrlChange(function (a, b) {
                z(la(F, a)) ? g.location.href = a : (d.$evalAsync(function () {
                    var c = l.absUrl(), e = l.$$state, f; a = kb(a); l.$$parse(a);
                    l.$$state = b; f = d.$broadcast("$locationChangeStart", a, c, b, e).defaultPrevented; l.absUrl() === a && (f ? (l.$$parse(c), l.$$state = e, h(c, !1, e)) : (x = !1, k(c, e)))
                }), d.$$phase || d.$digest())
            }); d.$watch(function () {
                var a = kb(c.url()), b = kb(l.absUrl()), f = c.state(), g = l.$$replace, m = a !== b || l.$$html5 && e.history && f !== l.$$state; if (x || m) x = !1, d.$evalAsync(function () {
                    var b = l.absUrl(), c = d.$broadcast("$locationChangeStart", b, a, l.$$state, f).defaultPrevented; l.absUrl() === b && (c ? (l.$$parse(a), l.$$state = f) : (m && h(b, g, f === l.$$state ? null :
                    l.$$state), k(a, f)))
                }); l.$$replace = !1
            }); return l
        }]
    } function qf() {
        var a = !0, b = this; this.debugEnabled = function (b) { return A(b) ? (a = b, this) : a }; this.$get = ["$window", function (d) {
            function c(a) { a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)); return a } function e(a) {
                var b = d.console || {}, e = b[a] || b.log || E; a = !1; try { a = !!e.apply } catch (k) { } return a ? function () {
                    var a = []; q(arguments, function (b) { a.push(c(b)) });
                    return e.apply(b, a)
                } : function (a, b) { e(a, null == b ? "" : b) }
            } return { log: e("log"), info: e("info"), warn: e("warn"), error: e("error"), debug: function () { var c = e("debug"); return function () { a && c.apply(b, arguments) } }() }
        }]
    } function Wa(a, b) { if ("__defineGetter__" === a || "__defineSetter__" === a || "__lookupGetter__" === a || "__lookupSetter__" === a || "__proto__" === a) throw ca("isecfld", b); return a } function eg(a) { return a + "" } function ta(a, b) {
        if (a) {
            if (a.constructor === a) throw ca("isecfn", b); if (a.window === a) throw ca("isecwindow", b); if (a.children &&
            (a.nodeName || a.prop && a.attr && a.find)) throw ca("isecdom", b); if (a === Object) throw ca("isecobj", b);
        } return a
    } function ld(a, b) { if (a) { if (a.constructor === a) throw ca("isecfn", b); if (a === fg || a === gg || a === hg) throw ca("isecff", b); } } function Hb(a, b) { if (a && (a === (0).constructor || a === (!1).constructor || a === "".constructor || a === {}.constructor || a === [].constructor || a === Function.constructor)) throw ca("isecaf", b); } function ig(a, b) { return "undefined" !== typeof a ? a : b } function md(a, b) {
        return "undefined" === typeof a ? b : "undefined" ===
        typeof b ? a : a + b
    } function aa(a, b) {
        var d, c; switch (a.type) {
            case s.Program: d = !0; q(a.body, function (a) { aa(a.expression, b); d = d && a.expression.constant }); a.constant = d; break; case s.Literal: a.constant = !0; a.toWatch = []; break; case s.UnaryExpression: aa(a.argument, b); a.constant = a.argument.constant; a.toWatch = a.argument.toWatch; break; case s.BinaryExpression: aa(a.left, b); aa(a.right, b); a.constant = a.left.constant && a.right.constant; a.toWatch = a.left.toWatch.concat(a.right.toWatch); break; case s.LogicalExpression: aa(a.left,
            b); aa(a.right, b); a.constant = a.left.constant && a.right.constant; a.toWatch = a.constant ? [] : [a]; break; case s.ConditionalExpression: aa(a.test, b); aa(a.alternate, b); aa(a.consequent, b); a.constant = a.test.constant && a.alternate.constant && a.consequent.constant; a.toWatch = a.constant ? [] : [a]; break; case s.Identifier: a.constant = !1; a.toWatch = [a]; break; case s.MemberExpression: aa(a.object, b); a.computed && aa(a.property, b); a.constant = a.object.constant && (!a.computed || a.property.constant); a.toWatch = [a]; break; case s.CallExpression: d =
            a.filter ? !b(a.callee.name).$stateful : !1; c = []; q(a.arguments, function (a) { aa(a, b); d = d && a.constant; a.constant || c.push.apply(c, a.toWatch) }); a.constant = d; a.toWatch = a.filter && !b(a.callee.name).$stateful ? c : [a]; break; case s.AssignmentExpression: aa(a.left, b); aa(a.right, b); a.constant = a.left.constant && a.right.constant; a.toWatch = [a]; break; case s.ArrayExpression: d = !0; c = []; q(a.elements, function (a) { aa(a, b); d = d && a.constant; a.constant || c.push.apply(c, a.toWatch) }); a.constant = d; a.toWatch = c; break; case s.ObjectExpression: d =
            !0; c = []; q(a.properties, function (a) { aa(a.value, b); d = d && a.value.constant; a.value.constant || c.push.apply(c, a.value.toWatch) }); a.constant = d; a.toWatch = c; break; case s.ThisExpression: a.constant = !1; a.toWatch = []; break; case s.LocalsExpression: a.constant = !1, a.toWatch = []
        }
    } function nd(a) { if (1 == a.length) { a = a[0].expression; var b = a.toWatch; return 1 !== b.length ? b : b[0] !== a ? b : u } } function od(a) { return a.type === s.Identifier || a.type === s.MemberExpression } function pd(a) {
        if (1 === a.body.length && od(a.body[0].expression)) return {
            type: s.AssignmentExpression,
            left: a.body[0].expression, right: { type: s.NGValueParameter }, operator: "="
        }
    } function qd(a) { return 0 === a.body.length || 1 === a.body.length && (a.body[0].expression.type === s.Literal || a.body[0].expression.type === s.ArrayExpression || a.body[0].expression.type === s.ObjectExpression) } function rd(a, b) { this.astBuilder = a; this.$filter = b } function sd(a, b) { this.astBuilder = a; this.$filter = b } function Ib(a) { return "constructor" == a } function fc(a) { return D(a.valueOf) ? a.valueOf() : jg.call(a) } function rf() {
        var a = V(), b = V(), d = {
            "true": !0,
            "false": !1, "null": null, undefined: u
        }; this.addLiteral = function (a, b) { d[a] = b }; this.$get = ["$filter", function (c) {
            function e(d, e, g) {
                var p, t, G; g = g || x; switch (typeof d) {
                    case "string": G = d = d.trim(); var C = g ? b : a; p = C[G]; if (!p) { ":" === d.charAt(0) && ":" === d.charAt(1) && (t = !0, d = d.substring(2)); p = g ? L : F; var K = new gc(p); p = (new hc(K, c, p)).parse(d); p.constant ? p.$$watchDelegate = m : t ? p.$$watchDelegate = p.literal ? l : k : p.inputs && (p.$$watchDelegate = h); g && (p = f(p)); C[G] = p } return n(p, e); case "function": return n(d, e); default: return n(E,
                    e)
                }
            } function f(a) { function b(c, d, e, f) { var g = x; x = !0; try { return a(c, d, e, f) } finally { x = g } } if (!a) return a; b.$$watchDelegate = a.$$watchDelegate; b.assign = f(a.assign); b.constant = a.constant; b.literal = a.literal; for (var c = 0; a.inputs && c < a.inputs.length; ++c) a.inputs[c] = f(a.inputs[c]); b.inputs = a.inputs; return b } function g(a, b) { return null == a || null == b ? a === b : "object" === typeof a && (a = fc(a), "object" === typeof a) ? !1 : a === b || a !== a && b !== b } function h(a, b, c, d, e) {
                var f = d.inputs, h; if (1 === f.length) {
                    var k = g, f = f[0]; return a.$watch(function (a) {
                        var b =
                        f(a); g(b, k) || (h = d(a, u, u, [b]), k = b && fc(b)); return h
                    }, b, c, e)
                } for (var l = [], m = [], n = 0, p = f.length; n < p; n++) l[n] = g, m[n] = null; return a.$watch(function (a) { for (var b = !1, c = 0, e = f.length; c < e; c++) { var k = f[c](a); if (b || (b = !g(k, l[c]))) m[c] = k, l[c] = k && fc(k) } b && (h = d(a, u, u, m)); return h }, b, c, e)
            } function k(a, b, c, d) { var e, f; return e = a.$watch(function (a) { return d(a) }, function (a, c, d) { f = a; D(b) && b.apply(this, arguments); A(a) && d.$$postDigest(function () { A(f) && e() }) }, c) } function l(a, b, c, d) {
                function e(a) {
                    var b = !0; q(a, function (a) {
                        A(a) ||
                        (b = !1)
                    }); return b
                } var f, g; return f = a.$watch(function (a) { return d(a) }, function (a, c, d) { g = a; D(b) && b.call(this, a, c, d); e(a) && d.$$postDigest(function () { e(g) && f() }) }, c)
            } function m(a, b, c, d) { var e; return e = a.$watch(function (a) { e(); return d(a) }, b, c) } function n(a, b) {
                if (!b) return a; var c = a.$$watchDelegate, d = !1, c = c !== l && c !== k ? function (c, e, f, g) { f = d && g ? g[0] : a(c, e, f, g); return b(f, c, e) } : function (c, d, e, f) { e = a(c, d, e, f); c = b(e, c, d); return A(e) ? c : e }; a.$$watchDelegate && a.$$watchDelegate !== h ? c.$$watchDelegate = a.$$watchDelegate :
                b.$stateful || (c.$$watchDelegate = h, d = !a.inputs, c.inputs = a.inputs ? a.inputs : [a]); return c
            } var p = Ga().noUnsafeEval, F = { csp: p, expensiveChecks: !1, literals: pa(d) }, L = { csp: p, expensiveChecks: !0, literals: pa(d) }, x = !1; e.$$runningExpensiveChecks = function () { return x }; return e
        }]
    } function tf() { this.$get = ["$rootScope", "$exceptionHandler", function (a, b) { return td(function (b) { a.$evalAsync(b) }, b) }] } function uf() { this.$get = ["$browser", "$exceptionHandler", function (a, b) { return td(function (b) { a.defer(b) }, b) }] } function td(a,
    b) {
        function d() { this.$$state = { status: 0 } } function c(a, b) { return function (c) { b.call(a, c) } } function e(c) { !c.processScheduled && c.pending && (c.processScheduled = !0, a(function () { var a, d, e; e = c.pending; c.processScheduled = !1; c.pending = u; for (var f = 0, g = e.length; f < g; ++f) { d = e[f][0]; a = e[f][c.status]; try { D(a) ? d.resolve(a(c.value)) : 1 === c.status ? d.resolve(c.value) : d.reject(c.value) } catch (h) { d.reject(h), b(h) } } })) } function f() { this.promise = new d } var g = O("$q", TypeError); S(d.prototype, {
            then: function (a, b, c) {
                if (z(a) && z(b) &&
                z(c)) return this; var d = new f; this.$$state.pending = this.$$state.pending || []; this.$$state.pending.push([d, a, b, c]); 0 < this.$$state.status && e(this.$$state); return d.promise
            }, "catch": function (a) { return this.then(null, a) }, "finally": function (a, b) { return this.then(function (b) { return k(b, !0, a) }, function (b) { return k(b, !1, a) }, b) }
        }); S(f.prototype, {
            resolve: function (a) { this.promise.$$state.status || (a === this.promise ? this.$$reject(g("qcycle", a)) : this.$$resolve(a)) }, $$resolve: function (a) {
                function d(a) { k || (k = !0, h.$$resolve(a)) }
                function f(a) { k || (k = !0, h.$$reject(a)) } var g, h = this, k = !1; try { if (J(a) || D(a)) g = a && a.then; D(g) ? (this.promise.$$state.status = -1, g.call(a, d, f, c(this, this.notify))) : (this.promise.$$state.value = a, this.promise.$$state.status = 1, e(this.promise.$$state)) } catch (l) { f(l), b(l) }
            }, reject: function (a) { this.promise.$$state.status || this.$$reject(a) }, $$reject: function (a) { this.promise.$$state.value = a; this.promise.$$state.status = 2; e(this.promise.$$state) }, notify: function (c) {
                var d = this.promise.$$state.pending; 0 >= this.promise.$$state.status &&
                d && d.length && a(function () { for (var a, e, f = 0, g = d.length; f < g; f++) { e = d[f][0]; a = d[f][3]; try { e.notify(D(a) ? a(c) : c) } catch (h) { b(h) } } })
            }
        }); var h = function (a, b) { var c = new f; b ? c.resolve(a) : c.reject(a); return c.promise }, k = function (a, b, c) { var d = null; try { D(c) && (d = c()) } catch (e) { return h(e, !1) } return d && D(d.then) ? d.then(function () { return h(a, b) }, function (a) { return h(a, !1) }) : h(a, b) }, l = function (a, b, c, d) { var e = new f; e.resolve(a); return e.promise.then(b, c, d) }, m = function (a) {
            if (!D(a)) throw g("norslvr", a); var b = new f; a(function (a) { b.resolve(a) },
            function (a) { b.reject(a) }); return b.promise
        }; m.prototype = d.prototype; m.defer = function () { var a = new f; a.resolve = c(a, a.resolve); a.reject = c(a, a.reject); a.notify = c(a, a.notify); return a }; m.reject = function (a) { var b = new f; b.reject(a); return b.promise }; m.when = l; m.resolve = l; m.all = function (a) { var b = new f, c = 0, d = M(a) ? [] : {}; q(a, function (a, e) { c++; l(a).then(function (a) { d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d)) }, function (a) { d.hasOwnProperty(e) || b.reject(a) }) }); 0 === c && b.resolve(d); return b.promise }; return m
    } function Df() {
        this.$get =
        ["$window", "$timeout", function (a, b) { var d = a.requestAnimationFrame || a.webkitRequestAnimationFrame, c = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame, e = !!d, f = e ? function (a) { var b = d(a); return function () { c(b) } } : function (a) { var c = b(a, 16.66, !1); return function () { b.cancel(c) } }; f.supported = e; return f }]
    } function sf() {
        function a(a) {
            function b() {
                this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null; this.$$listeners = {}; this.$$listenerCount = {}; this.$$watchersCount =
                0; this.$id = ++qb; this.$$ChildScope = null
            } b.prototype = a; return b
        } var b = 10, d = O("$rootScope"), c = null, e = null; this.digestTtl = function (a) { arguments.length && (b = a); return b }; this.$get = ["$exceptionHandler", "$parse", "$browser", function (f, g, h) {
            function k(a) { a.currentScope.$$destroyed = !0 } function l(a) { 9 === Da && (a.$$childHead && l(a.$$childHead), a.$$nextSibling && l(a.$$nextSibling)); a.$parent = a.$$nextSibling = a.$$prevSibling = a.$$childHead = a.$$childTail = a.$root = a.$$watchers = null } function m() {
                this.$id = ++qb; this.$$phase =
                this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null; this.$root = this; this.$$destroyed = !1; this.$$listeners = {}; this.$$listenerCount = {}; this.$$watchersCount = 0; this.$$isolateBindings = null
            } function n(a) { if (w.$$phase) throw d("inprog", w.$$phase); w.$$phase = a } function p(a, b) { do a.$$watchersCount += b; while (a = a.$parent) } function F(a, b, c) { do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent) } function s() { } function x() {
                for (; t.length;) try { t.shift()() } catch (a) { f(a) } e =
                null
            } function r() { null === e && (e = h.defer(function () { w.$apply(x) })) } m.prototype = {
                constructor: m, $new: function (b, c) { var d; c = c || this; b ? (d = new m, d.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = a(this)), d = new this.$$ChildScope); d.$parent = c; d.$$prevSibling = c.$$childTail; c.$$childHead ? (c.$$childTail.$$nextSibling = d, c.$$childTail = d) : c.$$childHead = c.$$childTail = d; (b || c != this) && d.$on("$destroy", k); return d }, $watch: function (a, b, d, e) {
                    var f = g(a); if (f.$$watchDelegate) return f.$$watchDelegate(this, b, d, f,
                    a); var h = this, k = h.$$watchers, l = { fn: b, last: s, get: f, exp: e || a, eq: !!d }; c = null; D(b) || (l.fn = E); k || (k = h.$$watchers = []); k.unshift(l); p(this, 1); return function () { 0 <= bb(k, l) && p(h, -1); c = null }
                }, $watchGroup: function (a, b) {
                    function c() { h = !1; k ? (k = !1, b(e, e, g)) : b(e, d, g) } var d = Array(a.length), e = Array(a.length), f = [], g = this, h = !1, k = !0; if (!a.length) { var l = !0; g.$evalAsync(function () { l && b(e, e, g) }); return function () { l = !1 } } if (1 === a.length) return this.$watch(a[0], function (a, c, f) { e[0] = a; d[0] = c; b(e, a === c ? e : d, f) }); q(a, function (a,
                    b) { var k = g.$watch(a, function (a, f) { e[b] = a; d[b] = f; h || (h = !0, g.$evalAsync(c)) }); f.push(k) }); return function () { for (; f.length;) f.shift()() }
                }, $watchCollection: function (a, b) {
                    function c(a) {
                        e = a; var b, d, g, h; if (!z(e)) {
                            if (J(e)) if (za(e)) for (f !== n && (f = n, v = f.length = 0, l++), a = e.length, v !== a && (l++, f.length = v = a), b = 0; b < a; b++) h = f[b], g = e[b], d = h !== h && g !== g, d || h === g || (l++, f[b] = g); else {
                                f !== p && (f = p = {}, v = 0, l++); a = 0; for (b in e) va.call(e, b) && (a++, g = e[b], h = f[b], b in f ? (d = h !== h && g !== g, d || h === g || (l++, f[b] = g)) : (v++, f[b] = g, l++)); if (v >
                                a) for (b in l++, f) va.call(e, b) || (v--, delete f[b])
                            } else f !== e && (f = e, l++); return l
                        }
                    } c.$stateful = !0; var d = this, e, f, h, k = 1 < b.length, l = 0, m = g(a, c), n = [], p = {}, r = !0, v = 0; return this.$watch(m, function () { r ? (r = !1, b(e, e, d)) : b(e, h, d); if (k) if (J(e)) if (za(e)) { h = Array(e.length); for (var a = 0; a < e.length; a++) h[a] = e[a] } else for (a in h = {}, e) va.call(e, a) && (h[a] = e[a]); else h = e })
                }, $digest: function () {
                    var a, g, k, l, m, p, r, q, t = b, F, A = [], z, y; n("$digest"); h.$$checkUrlChange(); this === w && null !== e && (h.defer.cancel(e), x()); c = null; do {
                        q = !1;
                        for (F = this; v.length;) { try { y = v.shift(), y.scope.$eval(y.expression, y.locals) } catch (E) { f(E) } c = null }a: do {
                            if (p = F.$$watchers) for (r = p.length; r--;) try { if (a = p[r]) if (m = a.get, (g = m(F)) !== (k = a.last) && !(a.eq ? na(g, k) : "number" === typeof g && "number" === typeof k && isNaN(g) && isNaN(k))) q = !0, c = a, a.last = a.eq ? pa(g, null) : g, l = a.fn, l(g, k === s ? g : k, F), 5 > t && (z = 4 - t, A[z] || (A[z] = []), A[z].push({ msg: D(a.exp) ? "fn: " + (a.exp.name || a.exp.toString()) : a.exp, newVal: g, oldVal: k })); else if (a === c) { q = !1; break a } } catch (H) { f(H) } if (!(p = F.$$watchersCount &&
                            F.$$childHead || F !== this && F.$$nextSibling)) for (; F !== this && !(p = F.$$nextSibling) ;) F = F.$parent
                        } while (F = p); if ((q || v.length) && !t--) throw w.$$phase = null, d("infdig", b, A);
                    } while (q || v.length); for (w.$$phase = null; u.length;) try { u.shift()() } catch (J) { f(J) }
                }, $destroy: function () {
                    if (!this.$$destroyed) {
                        var a = this.$parent; this.$broadcast("$destroy"); this.$$destroyed = !0; this === w && h.$$applicationDestroyed(); p(this, -this.$$watchersCount); for (var b in this.$$listenerCount) F(this, this.$$listenerCount[b], b); a && a.$$childHead ==
                        this && (a.$$childHead = this.$$nextSibling); a && a.$$childTail == this && (a.$$childTail = this.$$prevSibling); this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling); this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling); this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = E; this.$on = this.$watch = this.$watchGroup = function () { return E }; this.$$listeners = {}; this.$$nextSibling = null; l(this)
                    }
                }, $eval: function (a, b) { return g(a)(this, b) }, $evalAsync: function (a, b) {
                    w.$$phase ||
                    v.length || h.defer(function () { v.length && w.$digest() }); v.push({ scope: this, expression: g(a), locals: b })
                }, $$postDigest: function (a) { u.push(a) }, $apply: function (a) { try { n("$apply"); try { return this.$eval(a) } finally { w.$$phase = null } } catch (b) { f(b) } finally { try { w.$digest() } catch (c) { throw f(c), c; } } }, $applyAsync: function (a) { function b() { c.$eval(a) } var c = this; a && t.push(b); a = g(a); r() }, $on: function (a, b) {
                    var c = this.$$listeners[a]; c || (this.$$listeners[a] = c = []); c.push(b); var d = this; do d.$$listenerCount[a] || (d.$$listenerCount[a] =
                    0), d.$$listenerCount[a]++; while (d = d.$parent); var e = this; return function () { var d = c.indexOf(b); -1 !== d && (c[d] = null, F(e, 1, a)) }
                }, $emit: function (a, b) {
                    var c = [], d, e = this, g = !1, h = { name: a, targetScope: e, stopPropagation: function () { g = !0 }, preventDefault: function () { h.defaultPrevented = !0 }, defaultPrevented: !1 }, k = cb([h], arguments, 1), l, m; do { d = e.$$listeners[a] || c; h.currentScope = e; l = 0; for (m = d.length; l < m; l++) if (d[l]) try { d[l].apply(null, k) } catch (n) { f(n) } else d.splice(l, 1), l--, m--; if (g) return h.currentScope = null, h; e = e.$parent } while (e);
                    h.currentScope = null; return h
                }, $broadcast: function (a, b) {
                    var c = this, d = this, e = { name: a, targetScope: this, preventDefault: function () { e.defaultPrevented = !0 }, defaultPrevented: !1 }; if (!this.$$listenerCount[a]) return e; for (var g = cb([e], arguments, 1), h, k; c = d;) { e.currentScope = c; d = c.$$listeners[a] || []; h = 0; for (k = d.length; h < k; h++) if (d[h]) try { d[h].apply(null, g) } catch (l) { f(l) } else d.splice(h, 1), h--, k--; if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling)) for (; c !== this && !(d = c.$$nextSibling) ;) c = c.$parent } e.currentScope =
                    null; return e
                }
            }; var w = new m, v = w.$$asyncQueue = [], u = w.$$postDigestQueue = [], t = w.$$applyAsyncQueue = []; return w
        }]
    } function le() { var a = /^\s*(https?|ftp|mailto|tel|file):/, b = /^\s*((https?|ftp|file|blob):|data:image\/)/; this.aHrefSanitizationWhitelist = function (b) { return A(b) ? (a = b, this) : a }; this.imgSrcSanitizationWhitelist = function (a) { return A(a) ? (b = a, this) : b }; this.$get = function () { return function (d, c) { var e = c ? b : a, f; f = sa(d).href; return "" === f || f.match(e) ? d : "unsafe:" + f } } } function kg(a) {
        if ("self" === a) return a;
        if (y(a)) { if (-1 < a.indexOf("***")) throw ua("iwcard", a); a = ud(a).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"); return new RegExp("^" + a + "$") } if (Za(a)) return new RegExp("^" + a.source + "$"); throw ua("imatcher");
    } function vd(a) { var b = []; A(a) && q(a, function (a) { b.push(kg(a)) }); return b } function wf() {
        this.SCE_CONTEXTS = ma; var a = ["self"], b = []; this.resourceUrlWhitelist = function (b) { arguments.length && (a = vd(b)); return a }; this.resourceUrlBlacklist = function (a) { arguments.length && (b = vd(a)); return b }; this.$get = ["$injector",
        function (d) {
            function c(a, b) { return "self" === a ? gd(b) : !!a.exec(b.href) } function e(a) { var b = function (a) { this.$$unwrapTrustedValue = function () { return a } }; a && (b.prototype = new a); b.prototype.valueOf = function () { return this.$$unwrapTrustedValue() }; b.prototype.toString = function () { return this.$$unwrapTrustedValue().toString() }; return b } var f = function (a) { throw ua("unsafe"); }; d.has("$sanitize") && (f = d.get("$sanitize")); var g = e(), h = {}; h[ma.HTML] = e(g); h[ma.CSS] = e(g); h[ma.URL] = e(g); h[ma.JS] = e(g); h[ma.RESOURCE_URL] =
            e(h[ma.URL]); return {
                trustAs: function (a, b) { var c = h.hasOwnProperty(a) ? h[a] : null; if (!c) throw ua("icontext", a, b); if (null === b || z(b) || "" === b) return b; if ("string" !== typeof b) throw ua("itype", a); return new c(b) }, getTrusted: function (d, e) {
                    if (null === e || z(e) || "" === e) return e; var g = h.hasOwnProperty(d) ? h[d] : null; if (g && e instanceof g) return e.$$unwrapTrustedValue(); if (d === ma.RESOURCE_URL) {
                        var g = sa(e.toString()), n, p, q = !1; n = 0; for (p = a.length; n < p; n++) if (c(a[n], g)) { q = !0; break } if (q) for (n = 0, p = b.length; n < p; n++) if (c(b[n],
                        g)) { q = !1; break } if (q) return e; throw ua("insecurl", e.toString());
                    } if (d === ma.HTML) return f(e); throw ua("unsafe");
                }, valueOf: function (a) { return a instanceof g ? a.$$unwrapTrustedValue() : a }
            }
        }]
    } function vf() {
        var a = !0; this.enabled = function (b) { arguments.length && (a = !!b); return a }; this.$get = ["$parse", "$sceDelegate", function (b, d) {
            if (a && 8 > Da) throw ua("iequirks"); var c = ia(ma); c.isEnabled = function () { return a }; c.trustAs = d.trustAs; c.getTrusted = d.getTrusted; c.valueOf = d.valueOf; a || (c.trustAs = c.getTrusted = function (a, b) { return b },
            c.valueOf = $a); c.parseAs = function (a, d) { var e = b(d); return e.literal && e.constant ? e : b(d, function (b) { return c.getTrusted(a, b) }) }; var e = c.parseAs, f = c.getTrusted, g = c.trustAs; q(ma, function (a, b) { var d = N(b); c[fb("parse_as_" + d)] = function (b) { return e(a, b) }; c[fb("get_trusted_" + d)] = function (b) { return f(a, b) }; c[fb("trust_as_" + d)] = function (b) { return g(a, b) } }); return c
        }]
    } function xf() {
        this.$get = ["$window", "$document", function (a, b) {
            var d = {}, c = !(a.chrome && a.chrome.app && a.chrome.app.runtime) && a.history && a.history.pushState,
            e = Y((/android (\d+)/.exec(N((a.navigator || {}).userAgent)) || [])[1]), f = /Boxee/i.test((a.navigator || {}).userAgent), g = b[0] || {}, h, k = /^(Moz|webkit|ms)(?=[A-Z])/, l = g.body && g.body.style, m = !1, n = !1; if (l) { for (var p in l) if (m = k.exec(p)) { h = m[0]; h = h.substr(0, 1).toUpperCase() + h.substr(1); break } h || (h = "WebkitOpacity" in l && "webkit"); m = !!("transition" in l || h + "Transition" in l); n = !!("animation" in l || h + "Animation" in l); !e || m && n || (m = y(l.webkitTransition), n = y(l.webkitAnimation)) } return {
                history: !(!c || 4 > e || f), hasEvent: function (a) {
                    if ("input" ===
                    a && 11 >= Da) return !1; if (z(d[a])) { var b = g.createElement("div"); d[a] = "on" + a in b } return d[a]
                }, csp: Ga(), vendorPrefix: h, transitions: m, animations: n, android: e
            }
        }]
    } function zf() {
        var a; this.httpOptions = function (b) { return b ? (a = b, this) : a }; this.$get = ["$templateCache", "$http", "$q", "$sce", function (b, d, c, e) {
            function f(g, h) {
                f.totalPendingRequests++; y(g) && b.get(g) || (g = e.getTrustedResourceUrl(g)); var k = d.defaults && d.defaults.transformResponse; M(k) ? k = k.filter(function (a) { return a !== ac }) : k === ac && (k = null); return d.get(g,
                S({ cache: b, transformResponse: k }, a))["finally"](function () { f.totalPendingRequests-- }).then(function (a) { b.put(g, a.data); return a.data }, function (a) { if (!h) throw lg("tpload", g, a.status, a.statusText); return c.reject(a) })
            } f.totalPendingRequests = 0; return f
        }]
    } function Af() {
        this.$get = ["$rootScope", "$browser", "$location", function (a, b, d) {
            return {
                findBindings: function (a, b, d) {
                    a = a.getElementsByClassName("ng-binding"); var g = []; q(a, function (a) {
                        var c = ea.element(a).data("$binding"); c && q(c, function (c) {
                            d ? (new RegExp("(^|\\s)" +
                            ud(b) + "(\\s|\\||$)")).test(c) && g.push(a) : -1 != c.indexOf(b) && g.push(a)
                        })
                    }); return g
                }, findModels: function (a, b, d) { for (var g = ["ng-", "data-ng-", "ng\\:"], h = 0; h < g.length; ++h) { var k = a.querySelectorAll("[" + g[h] + "model" + (d ? "=" : "*=") + '"' + b + '"]'); if (k.length) return k } }, getLocation: function () { return d.url() }, setLocation: function (b) { b !== d.url() && (d.url(b), a.$digest()) }, whenStable: function (a) { b.notifyWhenNoOutstandingRequests(a) }
            }
        }]
    } function Bf() {
        this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler",
        function (a, b, d, c, e) { function f(f, k, l) { D(f) || (l = k, k = f, f = E); var m = Aa.call(arguments, 3), n = A(l) && !l, p = (n ? c : d).defer(), q = p.promise, s; s = b.defer(function () { try { p.resolve(f.apply(null, m)) } catch (b) { p.reject(b), e(b) } finally { delete g[q.$$timeoutId] } n || a.$apply() }, k); q.$$timeoutId = s; g[s] = p; return q } var g = {}; f.cancel = function (a) { return a && a.$$timeoutId in g ? (g[a.$$timeoutId].reject("canceled"), delete g[a.$$timeoutId], b.defer.cancel(a.$$timeoutId)) : !1 }; return f }]
    } function sa(a) {
        Da && (Z.setAttribute("href", a), a =
        Z.href); Z.setAttribute("href", a); return { href: Z.href, protocol: Z.protocol ? Z.protocol.replace(/:$/, "") : "", host: Z.host, search: Z.search ? Z.search.replace(/^\?/, "") : "", hash: Z.hash ? Z.hash.replace(/^#/, "") : "", hostname: Z.hostname, port: Z.port, pathname: "/" === Z.pathname.charAt(0) ? Z.pathname : "/" + Z.pathname }
    } function gd(a) { a = y(a) ? sa(a) : a; return a.protocol === wd.protocol && a.host === wd.host } function Cf() { this.$get = da(T) } function xd(a) {
        function b(a) { try { return decodeURIComponent(a) } catch (b) { return a } } var d = a[0] || {},
        c = {}, e = ""; return function () { var a, g, h, k, l; a = d.cookie || ""; if (a !== e) for (e = a, a = e.split("; "), c = {}, h = 0; h < a.length; h++) g = a[h], k = g.indexOf("="), 0 < k && (l = b(g.substring(0, k)), z(c[l]) && (c[l] = b(g.substring(k + 1)))); return c }
    } function Gf() { this.$get = xd } function Jc(a) {
        function b(d, c) { if (J(d)) { var e = {}; q(d, function (a, c) { e[c] = b(c, a) }); return e } return a.factory(d + "Filter", c) } this.register = b; this.$get = ["$injector", function (a) { return function (b) { return a.get(b + "Filter") } }]; b("currency", yd); b("date", zd); b("filter", mg);
        b("json", ng); b("limitTo", og); b("lowercase", pg); b("number", Ad); b("orderBy", Bd); b("uppercase", qg)
    } function mg() { return function (a, b, d) { if (!za(a)) { if (null == a) return a; throw O("filter")("notarray", a); } var c; switch (ic(b)) { case "function": break; case "boolean": case "null": case "number": case "string": c = !0; case "object": b = rg(b, d, c); break; default: return a } return Array.prototype.filter.call(a, b) } } function rg(a, b, d) {
        var c = J(a) && "$" in a; !0 === b ? b = na : D(b) || (b = function (a, b) {
            if (z(a)) return !1; if (null === a || null === b) return a ===
            b; if (J(b) || J(a) && !rc(a)) return !1; a = N("" + a); b = N("" + b); return -1 !== a.indexOf(b)
        }); return function (e) { return c && !J(e) ? Ma(e, a.$, b, !1) : Ma(e, a, b, d) }
    } function Ma(a, b, d, c, e) {
        var f = ic(a), g = ic(b); if ("string" === g && "!" === b.charAt(0)) return !Ma(a, b.substring(1), d, c); if (M(a)) return a.some(function (a) { return Ma(a, b, d, c) }); switch (f) {
            case "object": var h; if (c) { for (h in a) if ("$" !== h.charAt(0) && Ma(a[h], b, d, !0)) return !0; return e ? !1 : Ma(a, b, d, !1) } if ("object" === g) {
                for (h in b) if (e = b[h], !D(e) && !z(e) && (f = "$" === h, !Ma(f ? a : a[h],
                e, d, f, f))) return !1; return !0
            } return d(a, b); case "function": return !1; default: return d(a, b)
        }
    } function ic(a) { return null === a ? "null" : typeof a } function yd(a) { var b = a.NUMBER_FORMATS; return function (a, c, e) { z(c) && (c = b.CURRENCY_SYM); z(e) && (e = b.PATTERNS[1].maxFrac); return null == a ? a : Cd(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, e).replace(/\u00A4/g, c) } } function Ad(a) { var b = a.NUMBER_FORMATS; return function (a, c) { return null == a ? a : Cd(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c) } } function sg(a) {
        var b = 0, d, c, e, f, g; -1 <
        (c = a.indexOf(Dd)) && (a = a.replace(Dd, "")); 0 < (e = a.search(/e/i)) ? (0 > c && (c = e), c += +a.slice(e + 1), a = a.substring(0, e)) : 0 > c && (c = a.length); for (e = 0; a.charAt(e) == jc; e++); if (e == (g = a.length)) d = [0], c = 1; else { for (g--; a.charAt(g) == jc;) g--; c -= e; d = []; for (f = 0; e <= g; e++, f++) d[f] = +a.charAt(e) } c > Ed && (d = d.splice(0, Ed - 1), b = c - 1, c = 1); return { d: d, e: b, i: c }
    } function tg(a, b, d, c) {
        var e = a.d, f = e.length - a.i; b = z(b) ? Math.min(Math.max(d, f), c) : +b; d = b + a.i; c = e[d]; if (0 < d) { e.splice(Math.max(a.i, d)); for (var g = d; g < e.length; g++) e[g] = 0 } else for (f =
        Math.max(0, f), a.i = 1, e.length = Math.max(1, d = b + 1), e[0] = 0, g = 1; g < d; g++) e[g] = 0; if (5 <= c) if (0 > d - 1) { for (c = 0; c > d; c--) e.unshift(0), a.i++; e.unshift(1); a.i++ } else e[d - 1]++; for (; f < Math.max(0, b) ; f++) e.push(0); if (b = e.reduceRight(function (a, b, c, d) { b += a; d[c] = b % 10; return Math.floor(b / 10) }, 0)) e.unshift(b), a.i++
    } function Cd(a, b, d, c, e) {
        if (!y(a) && !R(a) || isNaN(a)) return ""; var f = !isFinite(a), g = !1, h = Math.abs(a) + "", k = ""; if (f) k = "\u221e"; else {
            g = sg(h); tg(g, e, b.minFrac, b.maxFrac); k = g.d; h = g.i; e = g.e; f = []; for (g = k.reduce(function (a,
            b) { return a && !b }, !0) ; 0 > h;) k.unshift(0), h++; 0 < h ? f = k.splice(h) : (f = k, k = [0]); h = []; for (k.length >= b.lgSize && h.unshift(k.splice(-b.lgSize).join("")) ; k.length > b.gSize;) h.unshift(k.splice(-b.gSize).join("")); k.length && h.unshift(k.join("")); k = h.join(d); f.length && (k += c + f.join("")); e && (k += "e+" + e)
        } return 0 > a && !g ? b.negPre + k + b.negSuf : b.posPre + k + b.posSuf
    } function Jb(a, b, d, c) { var e = ""; if (0 > a || c && 0 >= a) c ? a = -a + 1 : (a = -a, e = "-"); for (a = "" + a; a.length < b;) a = jc + a; d && (a = a.substr(a.length - b)); return e + a } function X(a, b, d, c, e) {
        d =
        d || 0; return function (f) { f = f["get" + a](); if (0 < d || f > -d) f += d; 0 === f && -12 == d && (f = 12); return Jb(f, b, c, e) }
    } function lb(a, b, d) { return function (c, e) { var f = c["get" + a](), g = vb((d ? "STANDALONE" : "") + (b ? "SHORT" : "") + a); return e[g][f] } } function Fd(a) { var b = (new Date(a, 0, 1)).getDay(); return new Date(a, 0, (4 >= b ? 5 : 12) - b) } function Gd(a) { return function (b) { var d = Fd(b.getFullYear()); b = +new Date(b.getFullYear(), b.getMonth(), b.getDate() + (4 - b.getDay())) - +d; b = 1 + Math.round(b / 6048E5); return Jb(b, a) } } function kc(a, b) {
        return 0 >= a.getFullYear() ?
        b.ERAS[0] : b.ERAS[1]
    } function zd(a) {
        function b(a) { var b; if (b = a.match(d)) { a = new Date(0); var f = 0, g = 0, h = b[8] ? a.setUTCFullYear : a.setFullYear, k = b[8] ? a.setUTCHours : a.setHours; b[9] && (f = Y(b[9] + b[10]), g = Y(b[9] + b[11])); h.call(a, Y(b[1]), Y(b[2]) - 1, Y(b[3])); f = Y(b[4] || 0) - f; g = Y(b[5] || 0) - g; h = Y(b[6] || 0); b = Math.round(1E3 * parseFloat("0." + (b[7] || 0))); k.call(a, f, g, h, b) } return a } var d = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/; return function (c, d, f) {
            var g = "", h =
            [], k, l; d = d || "mediumDate"; d = a.DATETIME_FORMATS[d] || d; y(c) && (c = ug.test(c) ? Y(c) : b(c)); R(c) && (c = new Date(c)); if (!fa(c) || !isFinite(c.getTime())) return c; for (; d;) (l = vg.exec(d)) ? (h = cb(h, l, 1), d = h.pop()) : (h.push(d), d = null); var m = c.getTimezoneOffset(); f && (m = vc(f, m), c = Rb(c, f, !0)); q(h, function (b) { k = wg[b]; g += k ? k(c, a.DATETIME_FORMATS, m) : "''" === b ? "'" : b.replace(/(^'|'$)/g, "").replace(/''/g, "'") }); return g
        }
    } function ng() { return function (a, b) { z(b) && (b = 2); return db(a, b) } } function og() {
        return function (a, b, d) {
            b = Infinity ===
            Math.abs(Number(b)) ? Number(b) : Y(b); if (isNaN(b)) return a; R(a) && (a = a.toString()); if (!M(a) && !y(a)) return a; d = !d || isNaN(d) ? 0 : Y(d); d = 0 > d ? Math.max(0, a.length + d) : d; return 0 <= b ? a.slice(d, d + b) : 0 === d ? a.slice(b, a.length) : a.slice(Math.max(0, d + b), d)
        }
    } function Bd(a) {
        function b(b, d) {
            d = d ? -1 : 1; return b.map(function (b) {
                var c = 1, h = $a; if (D(b)) h = b; else if (y(b)) { if ("+" == b.charAt(0) || "-" == b.charAt(0)) c = "-" == b.charAt(0) ? -1 : 1, b = b.substring(1); if ("" !== b && (h = a(b), h.constant)) var k = h(), h = function (a) { return a[k] } } return {
                    get: h,
                    descending: c * d
                }
            })
        } function d(a) { switch (typeof a) { case "number": case "boolean": case "string": return !0; default: return !1 } } return function (a, e, f) {
            if (null == a) return a; if (!za(a)) throw O("orderBy")("notarray", a); M(e) || (e = [e]); 0 === e.length && (e = ["+"]); var g = b(e, f); g.push({ get: function () { return {} }, descending: f ? -1 : 1 }); a = Array.prototype.map.call(a, function (a, b) {
                return {
                    value: a, predicateValues: g.map(function (c) {
                        var e = c.get(a); c = typeof e; if (null === e) c = "string", e = "null"; else if ("string" === c) e = e.toLowerCase(); else if ("object" ===
                        c) a: { if ("function" === typeof e.valueOf && (e = e.valueOf(), d(e))) break a; if (rc(e) && (e = e.toString(), d(e))) break a; e = b } return { value: e, type: c }
                    })
                }
            }); a.sort(function (a, b) { for (var c = 0, d = 0, e = g.length; d < e; ++d) { var c = a.predicateValues[d], f = b.predicateValues[d], q = 0; c.type === f.type ? c.value !== f.value && (q = c.value < f.value ? -1 : 1) : q = c.type < f.type ? -1 : 1; if (c = q * g[d].descending) break } return c }); return a = a.map(function (a) { return a.value })
        }
    } function Na(a) { D(a) && (a = { link: a }); a.restrict = a.restrict || "AC"; return da(a) } function Hd(a,
    b, d, c, e) {
        var f = this, g = []; f.$error = {}; f.$$success = {}; f.$pending = u; f.$name = e(b.name || b.ngForm || "")(d); f.$dirty = !1; f.$pristine = !0; f.$valid = !0; f.$invalid = !1; f.$submitted = !1; f.$$parentForm = Kb; f.$rollbackViewValue = function () { q(g, function (a) { a.$rollbackViewValue() }) }; f.$commitViewValue = function () { q(g, function (a) { a.$commitViewValue() }) }; f.$addControl = function (a) { Ta(a.$name, "input"); g.push(a); a.$name && (f[a.$name] = a); a.$$parentForm = f }; f.$$renameControl = function (a, b) {
            var c = a.$name; f[c] === a && delete f[c]; f[b] =
            a; a.$name = b
        }; f.$removeControl = function (a) { a.$name && f[a.$name] === a && delete f[a.$name]; q(f.$pending, function (b, c) { f.$setValidity(c, null, a) }); q(f.$error, function (b, c) { f.$setValidity(c, null, a) }); q(f.$$success, function (b, c) { f.$setValidity(c, null, a) }); bb(g, a); a.$$parentForm = Kb }; Id({ ctrl: this, $element: a, set: function (a, b, c) { var d = a[b]; d ? -1 === d.indexOf(c) && d.push(c) : a[b] = [c] }, unset: function (a, b, c) { var d = a[b]; d && (bb(d, c), 0 === d.length && delete a[b]) }, $animate: c }); f.$setDirty = function () {
            c.removeClass(a, Xa); c.addClass(a,
            Lb); f.$dirty = !0; f.$pristine = !1; f.$$parentForm.$setDirty()
        }; f.$setPristine = function () { c.setClass(a, Xa, Lb + " ng-submitted"); f.$dirty = !1; f.$pristine = !0; f.$submitted = !1; q(g, function (a) { a.$setPristine() }) }; f.$setUntouched = function () { q(g, function (a) { a.$setUntouched() }) }; f.$setSubmitted = function () { c.addClass(a, "ng-submitted"); f.$submitted = !0; f.$$parentForm.$setSubmitted() }
    } function lc(a) { a.$formatters.push(function (b) { return a.$isEmpty(b) ? b : b.toString() }) } function mb(a, b, d, c, e, f) {
        var g = N(b[0].type); if (!e.android) {
            var h =
            !1; b.on("compositionstart", function () { h = !0 }); b.on("compositionend", function () { h = !1; l() })
        } var k, l = function (a) { k && (f.defer.cancel(k), k = null); if (!h) { var e = b.val(); a = a && a.type; "password" === g || d.ngTrim && "false" === d.ngTrim || (e = W(e)); (c.$viewValue !== e || "" === e && c.$$hasNativeValidators) && c.$setViewValue(e, a) } }; if (e.hasEvent("input")) b.on("input", l); else {
            var m = function (a, b, c) { k || (k = f.defer(function () { k = null; b && b.value === c || l(a) })) }; b.on("keydown", function (a) {
                var b = a.keyCode; 91 === b || 15 < b && 19 > b || 37 <= b && 40 >= b ||
                m(a, this, this.value)
            }); if (e.hasEvent("paste")) b.on("paste cut", m)
        } b.on("change", l); if (Jd[g] && c.$$hasNativeValidators && g === d.type) b.on("keydown wheel mousedown", function (a) { if (!k) { var b = this.validity, c = b.badInput, d = b.typeMismatch; k = f.defer(function () { k = null; b.badInput === c && b.typeMismatch === d || l(a) }) } }); c.$render = function () { var a = c.$isEmpty(c.$viewValue) ? "" : c.$viewValue; b.val() !== a && b.val(a) }
    } function Mb(a, b) {
        return function (d, c) {
            var e, f; if (fa(d)) return d; if (y(d)) {
                '"' == d.charAt(0) && '"' == d.charAt(d.length -
                1) && (d = d.substring(1, d.length - 1)); if (xg.test(d)) return new Date(d); a.lastIndex = 0; if (e = a.exec(d)) return e.shift(), f = c ? { yyyy: c.getFullYear(), MM: c.getMonth() + 1, dd: c.getDate(), HH: c.getHours(), mm: c.getMinutes(), ss: c.getSeconds(), sss: c.getMilliseconds() / 1E3 } : { yyyy: 1970, MM: 1, dd: 1, HH: 0, mm: 0, ss: 0, sss: 0 }, q(e, function (a, c) { c < b.length && (f[b[c]] = +a) }), new Date(f.yyyy, f.MM - 1, f.dd, f.HH, f.mm, f.ss || 0, 1E3 * f.sss || 0)
            } return NaN
        }
    } function nb(a, b, d, c) {
        return function (e, f, g, h, k, l, m) {
            function n(a) {
                return a && !(a.getTime &&
                a.getTime() !== a.getTime())
            } function p(a) { return A(a) && !fa(a) ? d(a) || u : a } Kd(e, f, g, h); mb(e, f, g, h, k, l); var q = h && h.$options && h.$options.timezone, s; h.$$parserName = a; h.$parsers.push(function (a) { return h.$isEmpty(a) ? null : b.test(a) ? (a = d(a, s), q && (a = Rb(a, q)), a) : u }); h.$formatters.push(function (a) { if (a && !fa(a)) throw ob("datefmt", a); if (n(a)) return (s = a) && q && (s = Rb(s, q, !0)), m("date")(a, c, q); s = null; return "" }); if (A(g.min) || g.ngMin) {
                var x; h.$validators.min = function (a) { return !n(a) || z(x) || d(a) >= x }; g.$observe("min", function (a) {
                    x =
                    p(a); h.$validate()
                })
            } if (A(g.max) || g.ngMax) { var r; h.$validators.max = function (a) { return !n(a) || z(r) || d(a) <= r }; g.$observe("max", function (a) { r = p(a); h.$validate() }) }
        }
    } function Kd(a, b, d, c) { (c.$$hasNativeValidators = J(b[0].validity)) && c.$parsers.push(function (a) { var c = b.prop("validity") || {}; return c.badInput || c.typeMismatch ? u : a }) } function Ld(a, b, d, c, e) { if (A(c)) { a = a(c); if (!a.constant) throw ob("constexpr", d, c); return a(b) } return e } function mc(a, b) {
        a = "ngClass" + a; return ["$animate", function (d) {
            function c(a, b) {
                var c =
                [], d = 0; a: for (; d < a.length; d++) { for (var e = a[d], m = 0; m < b.length; m++) if (e == b[m]) continue a; c.push(e) } return c
            } function e(a) { var b = []; return M(a) ? (q(a, function (a) { b = b.concat(e(a)) }), b) : y(a) ? a.split(" ") : J(a) ? (q(a, function (a, c) { a && (b = b.concat(c.split(" "))) }), b) : a } return {
                restrict: "AC", link: function (f, g, h) {
                    function k(a, b) { var c = g.data("$classCounts") || V(), d = []; q(a, function (a) { if (0 < b || c[a]) c[a] = (c[a] || 0) + b, c[a] === +(0 < b) && d.push(a) }); g.data("$classCounts", c); return d.join(" ") } function l(a) {
                        if (!0 === b || f.$index %
                        2 === b) { var l = e(a || []); if (!m) { var q = k(l, 1); h.$addClass(q) } else if (!na(a, m)) { var s = e(m), q = c(l, s), l = c(s, l), q = k(q, 1), l = k(l, -1); q && q.length && d.addClass(g, q); l && l.length && d.removeClass(g, l) } } m = ia(a)
                    } var m; f.$watch(h[a], l, !0); h.$observe("class", function (b) { l(f.$eval(h[a])) }); "ngClass" !== a && f.$watch("$index", function (c, d) { var g = c & 1; if (g !== (d & 1)) { var l = e(f.$eval(h[a])); g === b ? (g = k(l, 1), h.$addClass(g)) : (g = k(l, -1), h.$removeClass(g)) } })
                }
            }
        }]
    } function Id(a) {
        function b(a, b) {
            b && !f[a] ? (k.addClass(e, a), f[a] = !0) : !b &&
            f[a] && (k.removeClass(e, a), f[a] = !1)
        } function d(a, c) { a = a ? "-" + zc(a, "-") : ""; b(pb + a, !0 === c); b(Md + a, !1 === c) } var c = a.ctrl, e = a.$element, f = {}, g = a.set, h = a.unset, k = a.$animate; f[Md] = !(f[pb] = e.hasClass(pb)); c.$setValidity = function (a, e, f) {
            z(e) ? (c.$pending || (c.$pending = {}), g(c.$pending, a, f)) : (c.$pending && h(c.$pending, a, f), Nd(c.$pending) && (c.$pending = u)); Oa(e) ? e ? (h(c.$error, a, f), g(c.$$success, a, f)) : (g(c.$error, a, f), h(c.$$success, a, f)) : (h(c.$error, a, f), h(c.$$success, a, f)); c.$pending ? (b(Od, !0), c.$valid = c.$invalid =
            u, d("", null)) : (b(Od, !1), c.$valid = Nd(c.$error), c.$invalid = !c.$valid, d("", c.$valid)); e = c.$pending && c.$pending[a] ? u : c.$error[a] ? !1 : c.$$success[a] ? !0 : null; d(a, e); c.$$parentForm.$setValidity(a, e, c)
        }
    } function Nd(a) { if (a) for (var b in a) if (a.hasOwnProperty(b)) return !1; return !0 } var yg = /^\/(.+)\/([a-z]*)$/, va = Object.prototype.hasOwnProperty, N = function (a) { return y(a) ? a.toLowerCase() : a }, vb = function (a) { return y(a) ? a.toUpperCase() : a }, Da, H, $, Aa = [].slice, Yf = [].splice, zg = [].push, ka = Object.prototype.toString, sc = Object.getPrototypeOf,
    Ba = O("ng"), ea = T.angular || (T.angular = {}), Tb, qb = 0; Da = P.documentMode; E.$inject = []; $a.$inject = []; var M = Array.isArray, Zd = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/, W = function (a) { return y(a) ? a.trim() : a }, ud = function (a) { return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") }, Ga = function () {
        if (!A(Ga.rules)) {
            var a = P.querySelector("[ng-csp]") || P.querySelector("[data-ng-csp]"); if (a) {
                var b = a.getAttribute("ng-csp") || a.getAttribute("data-ng-csp");
                Ga.rules = { noUnsafeEval: !b || -1 !== b.indexOf("no-unsafe-eval"), noInlineStyle: !b || -1 !== b.indexOf("no-inline-style") }
            } else { a = Ga; try { new Function(""), b = !1 } catch (d) { b = !0 } a.rules = { noUnsafeEval: b, noInlineStyle: !1 } }
        } return Ga.rules
    }, sb = function () { if (A(sb.name_)) return sb.name_; var a, b, d = Qa.length, c, e; for (b = 0; b < d; ++b) if (c = Qa[b], a = P.querySelector("[" + c.replace(":", "\\:") + "jq]")) { e = a.getAttribute(c + "jq"); break } return sb.name_ = e }, be = /:/g, Qa = ["ng-", "data-ng-", "ng:", "x-ng-"], ge = /[A-Z]/g, Ac = !1, Pa = 3, ke = {
        full: "1.5.3",
        major: 1, minor: 5, dot: 3, codeName: "diplohaplontic-meiosis"
    }; U.expando = "ng339"; var hb = U.cache = {}, Mf = 1; U._data = function (a) { return this.cache[a[this.expando]] || {} }; var Hf = /([\:\-\_]+(.))/g, If = /^moz([A-Z])/, zb = { mouseleave: "mouseout", mouseenter: "mouseover" }, Vb = O("jqLite"), Lf = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, Ub = /<|&#?\w+;/, Jf = /<([\w:-]+)/, Kf = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, ha = {
        option: [1, '<select multiple="multiple">', "</select>"], thead: [1, "<table>", "</table>"], col: [2,
        "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""]
    }; ha.optgroup = ha.option; ha.tbody = ha.tfoot = ha.colgroup = ha.caption = ha.thead; ha.th = ha.td; var Rf = Node.prototype.contains || function (a) { return !!(this.compareDocumentPosition(a) & 16) }, Ra = U.prototype = {
        ready: function (a) { function b() { d || (d = !0, a()) } var d = !1; "complete" === P.readyState ? setTimeout(b) : (this.on("DOMContentLoaded", b), U(T).on("load", b)) }, toString: function () {
            var a =
            []; q(this, function (b) { a.push("" + b) }); return "[" + a.join(", ") + "]"
        }, eq: function (a) { return 0 <= a ? H(this[a]) : H(this[this.length + a]) }, length: 0, push: zg, sort: [].sort, splice: [].splice
    }, Eb = {}; q("multiple selected checked disabled readOnly required open".split(" "), function (a) { Eb[N(a)] = a }); var Sc = {}; q("input select option textarea button form details".split(" "), function (a) { Sc[a] = !0 }); var $c = { ngMinlength: "minlength", ngMaxlength: "maxlength", ngMin: "min", ngMax: "max", ngPattern: "pattern" }; q({
        data: Xb, removeData: gb,
        hasData: function (a) { for (var b in hb[a.ng339]) return !0; return !1 }, cleanData: function (a) { for (var b = 0, d = a.length; b < d; b++) gb(a[b]) }
    }, function (a, b) { U[b] = a }); q({
        data: Xb, inheritedData: Db, scope: function (a) { return H.data(a, "$scope") || Db(a.parentNode || a, ["$isolateScope", "$scope"]) }, isolateScope: function (a) { return H.data(a, "$isolateScope") || H.data(a, "$isolateScopeNoTemplate") }, controller: Pc, injector: function (a) { return Db(a, "$injector") }, removeAttr: function (a, b) { a.removeAttribute(b) }, hasClass: Ab, css: function (a,
        b, d) { b = fb(b); if (A(d)) a.style[b] = d; else return a.style[b] }, attr: function (a, b, d) { var c = a.nodeType; if (c !== Pa && 2 !== c && 8 !== c) if (c = N(b), Eb[c]) if (A(d)) d ? (a[b] = !0, a.setAttribute(b, c)) : (a[b] = !1, a.removeAttribute(c)); else return a[b] || (a.attributes.getNamedItem(b) || E).specified ? c : u; else if (A(d)) a.setAttribute(b, d); else if (a.getAttribute) return a = a.getAttribute(b, 2), null === a ? u : a }, prop: function (a, b, d) { if (A(d)) a[b] = d; else return a[b] }, text: function () {
            function a(a, d) {
                if (z(d)) {
                    var c = a.nodeType; return 1 === c || c ===
                    Pa ? a.textContent : ""
                } a.textContent = d
            } a.$dv = ""; return a
        }(), val: function (a, b) { if (z(b)) { if (a.multiple && "select" === oa(a)) { var d = []; q(a.options, function (a) { a.selected && d.push(a.value || a.text) }); return 0 === d.length ? null : d } return a.value } a.value = b }, html: function (a, b) { if (z(b)) return a.innerHTML; xb(a, !0); a.innerHTML = b }, empty: Qc
    }, function (a, b) {
        U.prototype[b] = function (b, c) {
            var e, f, g = this.length; if (a !== Qc && z(2 == a.length && a !== Ab && a !== Pc ? b : c)) {
                if (J(b)) {
                    for (e = 0; e < g; e++) if (a === Xb) a(this[e], b); else for (f in b) a(this[e],
                    f, b[f]); return this
                } e = a.$dv; g = z(e) ? Math.min(g, 1) : g; for (f = 0; f < g; f++) { var h = a(this[f], b, c); e = e ? e + h : h } return e
            } for (e = 0; e < g; e++) a(this[e], b, c); return this
        }
    }); q({
        removeData: gb, on: function (a, b, d, c) {
            if (A(c)) throw Vb("onargs"); if (Kc(a)) {
                c = yb(a, !0); var e = c.events, f = c.handle; f || (f = c.handle = Of(a, e)); c = 0 <= b.indexOf(" ") ? b.split(" ") : [b]; for (var g = c.length, h = function (b, c, g) { var h = e[b]; h || (h = e[b] = [], h.specialHandlerWrapper = c, "$destroy" === b || g || a.addEventListener(b, f, !1)); h.push(d) }; g--;) b = c[g], zb[b] ? (h(zb[b], Qf),
                h(b, u, !0)) : h(b)
            }
        }, off: Oc, one: function (a, b, d) { a = H(a); a.on(b, function e() { a.off(b, d); a.off(b, e) }); a.on(b, d) }, replaceWith: function (a, b) { var d, c = a.parentNode; xb(a); q(new U(b), function (b) { d ? c.insertBefore(b, d.nextSibling) : c.replaceChild(b, a); d = b }) }, children: function (a) { var b = []; q(a.childNodes, function (a) { 1 === a.nodeType && b.push(a) }); return b }, contents: function (a) { return a.contentDocument || a.childNodes || [] }, append: function (a, b) { var d = a.nodeType; if (1 === d || 11 === d) { b = new U(b); for (var d = 0, c = b.length; d < c; d++) a.appendChild(b[d]) } },
        prepend: function (a, b) { if (1 === a.nodeType) { var d = a.firstChild; q(new U(b), function (b) { a.insertBefore(b, d) }) } }, wrap: function (a, b) { Mc(a, H(b).eq(0).clone()[0]) }, remove: Yb, detach: function (a) { Yb(a, !0) }, after: function (a, b) { var d = a, c = a.parentNode; b = new U(b); for (var e = 0, f = b.length; e < f; e++) { var g = b[e]; c.insertBefore(g, d.nextSibling); d = g } }, addClass: Cb, removeClass: Bb, toggleClass: function (a, b, d) { b && q(b.split(" "), function (b) { var e = d; z(e) && (e = !Ab(a, b)); (e ? Cb : Bb)(a, b) }) }, parent: function (a) {
            return (a = a.parentNode) &&
            11 !== a.nodeType ? a : null
        }, next: function (a) { return a.nextElementSibling }, find: function (a, b) { return a.getElementsByTagName ? a.getElementsByTagName(b) : [] }, clone: Wb, triggerHandler: function (a, b, d) {
            var c, e, f = b.type || b, g = yb(a); if (g = (g = g && g.events) && g[f]) c = {
                preventDefault: function () { this.defaultPrevented = !0 }, isDefaultPrevented: function () { return !0 === this.defaultPrevented }, stopImmediatePropagation: function () { this.immediatePropagationStopped = !0 }, isImmediatePropagationStopped: function () { return !0 === this.immediatePropagationStopped },
                stopPropagation: E, type: f, target: a
            }, b.type && (c = S(c, b)), b = ia(g), e = d ? [c].concat(d) : [c], q(b, function (b) { c.isImmediatePropagationStopped() || b.apply(a, e) })
        }
    }, function (a, b) { U.prototype[b] = function (b, c, e) { for (var f, g = 0, h = this.length; g < h; g++) z(f) ? (f = a(this[g], b, c, e), A(f) && (f = H(f))) : Nc(f, a(this[g], b, c, e)); return A(f) ? f : this }; U.prototype.bind = U.prototype.on; U.prototype.unbind = U.prototype.off }); Ua.prototype = {
        put: function (a, b) { this[Ha(a, this.nextUid)] = b }, get: function (a) { return this[Ha(a, this.nextUid)] }, remove: function (a) {
            var b =
            this[a = Ha(a, this.nextUid)]; delete this[a]; return b
        }
    }; var Ff = [function () { this.$get = [function () { return Ua }] }], Tf = /^([^\(]+?)=>/, Uf = /^[^\(]*\(\s*([^\)]*)\)/m, Ag = /,/, Bg = /^\s*(_?)(\S+?)\1\s*$/, Sf = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, Ia = O("$injector"); eb.$$annotate = function (a, b, d) {
        var c; if ("function" === typeof a) { if (!(c = a.$inject)) { c = []; if (a.length) { if (b) throw y(d) && d || (d = a.name || Vf(a)), Ia("strictdi", d); b = Tc(a); q(b[1].split(Ag), function (a) { a.replace(Bg, function (a, b, d) { c.push(d) }) }) } a.$inject = c } } else M(a) ?
        (b = a.length - 1, Sa(a[b], "fn"), c = a.slice(0, b)) : Sa(a, "fn", !0); return c
    }; var Pd = O("$animate"), Ye = function () { this.$get = E }, Ze = function () {
        var a = new Ua, b = []; this.$get = ["$$AnimateRunner", "$rootScope", function (d, c) {
            function e(a, b, c) { var d = !1; b && (b = y(b) ? b.split(" ") : M(b) ? b : [], q(b, function (b) { b && (d = !0, a[b] = c) })); return d } function f() {
                q(b, function (b) {
                    var c = a.get(b); if (c) {
                        var d = Wf(b.attr("class")), e = "", f = ""; q(c, function (a, b) { a !== !!d[b] && (a ? e += (e.length ? " " : "") + b : f += (f.length ? " " : "") + b) }); q(b, function (a) {
                            e && Cb(a,
                            e); f && Bb(a, f)
                        }); a.remove(b)
                    }
                }); b.length = 0
            } return { enabled: E, on: E, off: E, pin: E, push: function (g, h, k, l) { l && l(); k = k || {}; k.from && g.css(k.from); k.to && g.css(k.to); if (k.addClass || k.removeClass) if (h = k.addClass, l = k.removeClass, k = a.get(g) || {}, h = e(k, h, !0), l = e(k, l, !1), h || l) a.put(g, k), b.push(g), 1 === b.length && c.$$postDigest(f); g = new d; g.complete(); return g } }
        }]
    }, We = ["$provide", function (a) {
        var b = this; this.$$registeredAnimations = Object.create(null); this.register = function (d, c) {
            if (d && "." !== d.charAt(0)) throw Pd("notcsel",
            d); var e = d + "-animation"; b.$$registeredAnimations[d.substr(1)] = e; a.factory(e, c)
        }; this.classNameFilter = function (a) { if (1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null) && /(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString())) throw Pd("nongcls", "ng-animate"); return this.$$classNameFilter }; this.$get = ["$$animateQueue", function (a) {
            function b(a, c, d) {
                if (d) {
                    var h; a: { for (h = 0; h < d.length; h++) { var k = d[h]; if (1 === k.nodeType) { h = k; break a } } h = void 0 } !h || h.parentNode || h.previousElementSibling ||
                    (d = null)
                } d ? d.after(a) : c.prepend(a)
            } return {
                on: a.on, off: a.off, pin: a.pin, enabled: a.enabled, cancel: function (a) { a.end && a.end() }, enter: function (e, f, g, h) { f = f && H(f); g = g && H(g); f = f || g.parent(); b(e, f, g); return a.push(e, "enter", Ja(h)) }, move: function (e, f, g, h) { f = f && H(f); g = g && H(g); f = f || g.parent(); b(e, f, g); return a.push(e, "move", Ja(h)) }, leave: function (b, c) { return a.push(b, "leave", Ja(c), function () { b.remove() }) }, addClass: function (b, c, g) { g = Ja(g); g.addClass = ib(g.addclass, c); return a.push(b, "addClass", g) }, removeClass: function (b,
                c, g) { g = Ja(g); g.removeClass = ib(g.removeClass, c); return a.push(b, "removeClass", g) }, setClass: function (b, c, g, h) { h = Ja(h); h.addClass = ib(h.addClass, c); h.removeClass = ib(h.removeClass, g); return a.push(b, "setClass", h) }, animate: function (b, c, g, h, k) { k = Ja(k); k.from = k.from ? S(k.from, c) : c; k.to = k.to ? S(k.to, g) : g; k.tempClasses = ib(k.tempClasses, h || "ng-inline-animate"); return a.push(b, "animate", k) }
            }
        }]
    }], af = function () {
        this.$get = ["$$rAF", function (a) {
            function b(b) {
                d.push(b); 1 < d.length || a(function () {
                    for (var a = 0; a < d.length; a++) d[a]();
                    d = []
                })
            } var d = []; return function () { var a = !1; b(function () { a = !0 }); return function (d) { a ? d() : b(d) } }
        }]
    }, $e = function () {
        this.$get = ["$q", "$sniffer", "$$animateAsyncRun", "$document", "$timeout", function (a, b, d, c, e) {
            function f(a) { this.setHost(a); var b = d(); this._doneCallbacks = []; this._tick = function (a) { var d = c[0]; d && d.hidden ? e(a, 0, !1) : b(a) }; this._state = 0 } f.chain = function (a, b) { function c() { if (d === a.length) b(!0); else a[d](function (a) { !1 === a ? b(!1) : (d++, c()) }) } var d = 0; c() }; f.all = function (a, b) {
                function c(f) {
                    e = e && f; ++d ===
                    a.length && b(e)
                } var d = 0, e = !0; q(a, function (a) { a.done(c) })
            }; f.prototype = {
                setHost: function (a) { this.host = a || {} }, done: function (a) { 2 === this._state ? a() : this._doneCallbacks.push(a) }, progress: E, getPromise: function () { if (!this.promise) { var b = this; this.promise = a(function (a, c) { b.done(function (b) { !1 === b ? c() : a() }) }) } return this.promise }, then: function (a, b) { return this.getPromise().then(a, b) }, "catch": function (a) { return this.getPromise()["catch"](a) }, "finally": function (a) { return this.getPromise()["finally"](a) }, pause: function () {
                    this.host.pause &&
                    this.host.pause()
                }, resume: function () { this.host.resume && this.host.resume() }, end: function () { this.host.end && this.host.end(); this._resolve(!0) }, cancel: function () { this.host.cancel && this.host.cancel(); this._resolve(!1) }, complete: function (a) { var b = this; 0 === b._state && (b._state = 1, b._tick(function () { b._resolve(a) })) }, _resolve: function (a) { 2 !== this._state && (q(this._doneCallbacks, function (b) { b(a) }), this._doneCallbacks.length = 0, this._state = 2) }
            }; return f
        }]
    }, Xe = function () {
        this.$get = ["$$rAF", "$q", "$$AnimateRunner",
        function (a, b, d) { return function (b, e) { function f() { a(function () { g.addClass && (b.addClass(g.addClass), g.addClass = null); g.removeClass && (b.removeClass(g.removeClass), g.removeClass = null); g.to && (b.css(g.to), g.to = null); h || k.complete(); h = !0 }); return k } var g = e || {}; g.$$prepared || (g = pa(g)); g.cleanupStyles && (g.from = g.to = null); g.from && (b.css(g.from), g.from = null); var h, k = new d; return { start: f, end: f } } }]
    }, ga = O("$compile"); Cc.$inject = ["$provide", "$$sanitizeUriProvider"]; var Vc = /^((?:x|data)[\:\-_])/i, Zf = O("$controller"),
    ad = /^(\S+)(\s+as\s+([\w$]+))?$/, gf = function () { this.$get = ["$document", function (a) { return function (b) { b ? !b.nodeType && b instanceof H && (b = b[0]) : b = a[0].body; return b.offsetWidth + 1 } }] }, bd = "application/json", bc = { "Content-Type": bd + ";charset=utf-8" }, ag = /^\[|^\{(?!\{)/, bg = { "[": /]$/, "{": /}$/ }, $f = /^\)\]\}',?\n/, Cg = O("$http"), fd = function (a) { return function () { throw Cg("legacy", a); } }, La = ea.$interpolateMinErr = O("$interpolate"); La.throwNoconcat = function (a) { throw La("noconcat", a); }; La.interr = function (a, b) {
        return La("interr",
        a, b.toString())
    }; var Dg = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, dg = { http: 80, https: 443, ftp: 21 }, Fb = O("$location"), Eg = {
        $$html5: !1, $$replace: !1, absUrl: Gb("$$absUrl"), url: function (a) { if (z(a)) return this.$$url; var b = Dg.exec(a); (b[1] || "" === a) && this.path(decodeURIComponent(b[1])); (b[2] || b[1] || "" === a) && this.search(b[3] || ""); this.hash(b[5] || ""); return this }, protocol: Gb("$$protocol"), host: Gb("$$host"), port: Gb("$$port"), path: kd("$$path", function (a) { a = null !== a ? a.toString() : ""; return "/" == a.charAt(0) ? a : "/" + a }), search: function (a,
        b) { switch (arguments.length) { case 0: return this.$$search; case 1: if (y(a) || R(a)) a = a.toString(), this.$$search = xc(a); else if (J(a)) a = pa(a, {}), q(a, function (b, c) { null == b && delete a[c] }), this.$$search = a; else throw Fb("isrcharg"); break; default: z(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b } this.$$compose(); return this }, hash: kd("$$hash", function (a) { return null !== a ? a.toString() : "" }), replace: function () { this.$$replace = !0; return this }
    }; q([jd, ec, dc], function (a) {
        a.prototype = Object.create(Eg); a.prototype.state =
        function (b) { if (!arguments.length) return this.$$state; if (a !== dc || !this.$$html5) throw Fb("nostate"); this.$$state = z(b) ? null : b; return this }
    }); var ca = O("$parse"), fg = Function.prototype.call, gg = Function.prototype.apply, hg = Function.prototype.bind, Nb = V(); q("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function (a) { Nb[a] = !0 }); var Fg = { n: "\n", f: "\f", r: "\r", t: "\t", v: "\v", "'": "'", '"': '"' }, gc = function (a) { this.options = a }; gc.prototype = {
        constructor: gc, lex: function (a) {
            this.text = a; this.index = 0; for (this.tokens =
            []; this.index < this.text.length;) if (a = this.text.charAt(this.index), '"' === a || "'" === a) this.readString(a); else if (this.isNumber(a) || "." === a && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdent(a)) this.readIdent(); else if (this.is(a, "(){}[].,;:?")) this.tokens.push({ index: this.index, text: a }), this.index++; else if (this.isWhitespace(a)) this.index++; else {
                var b = a + this.peek(), d = b + this.peek(2), c = Nb[b], e = Nb[d]; Nb[a] || c || e ? (a = e ? d : c ? b : a, this.tokens.push({ index: this.index, text: a, operator: !0 }), this.index +=
                a.length) : this.throwError("Unexpected next character ", this.index, this.index + 1)
            } return this.tokens
        }, is: function (a, b) { return -1 !== b.indexOf(a) }, peek: function (a) { a = a || 1; return this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1 }, isNumber: function (a) { return "0" <= a && "9" >= a && "string" === typeof a }, isWhitespace: function (a) { return " " === a || "\r" === a || "\t" === a || "\n" === a || "\v" === a || "\u00a0" === a }, isIdent: function (a) { return "a" <= a && "z" >= a || "A" <= a && "Z" >= a || "_" === a || "$" === a }, isExpOperator: function (a) {
            return "-" ===
            a || "+" === a || this.isNumber(a)
        }, throwError: function (a, b, d) { d = d || this.index; b = A(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, d) + "]" : " " + d; throw ca("lexerr", a, b, this.text); }, readNumber: function () {
            for (var a = "", b = this.index; this.index < this.text.length;) {
                var d = N(this.text.charAt(this.index)); if ("." == d || this.isNumber(d)) a += d; else {
                    var c = this.peek(); if ("e" == d && this.isExpOperator(c)) a += d; else if (this.isExpOperator(d) && c && this.isNumber(c) && "e" == a.charAt(a.length - 1)) a += d; else if (!this.isExpOperator(d) ||
                    c && this.isNumber(c) || "e" != a.charAt(a.length - 1)) break; else this.throwError("Invalid exponent")
                } this.index++
            } this.tokens.push({ index: b, text: a, constant: !0, value: Number(a) })
        }, readIdent: function () { for (var a = this.index; this.index < this.text.length;) { var b = this.text.charAt(this.index); if (!this.isIdent(b) && !this.isNumber(b)) break; this.index++ } this.tokens.push({ index: a, text: this.text.slice(a, this.index), identifier: !0 }) }, readString: function (a) {
            var b = this.index; this.index++; for (var d = "", c = a, e = !1; this.index < this.text.length;) {
                var f =
                this.text.charAt(this.index), c = c + f; if (e) "u" === f ? (e = this.text.substring(this.index + 1, this.index + 5), e.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + e + "]"), this.index += 4, d += String.fromCharCode(parseInt(e, 16))) : d += Fg[f] || f, e = !1; else if ("\\" === f) e = !0; else { if (f === a) { this.index++; this.tokens.push({ index: b, text: c, constant: !0, value: d }); return } d += f } this.index++
            } this.throwError("Unterminated quote", b)
        }
    }; var s = function (a, b) { this.lexer = a; this.options = b }; s.Program = "Program"; s.ExpressionStatement =
    "ExpressionStatement"; s.AssignmentExpression = "AssignmentExpression"; s.ConditionalExpression = "ConditionalExpression"; s.LogicalExpression = "LogicalExpression"; s.BinaryExpression = "BinaryExpression"; s.UnaryExpression = "UnaryExpression"; s.CallExpression = "CallExpression"; s.MemberExpression = "MemberExpression"; s.Identifier = "Identifier"; s.Literal = "Literal"; s.ArrayExpression = "ArrayExpression"; s.Property = "Property"; s.ObjectExpression = "ObjectExpression"; s.ThisExpression = "ThisExpression"; s.LocalsExpression = "LocalsExpression";
    s.NGValueParameter = "NGValueParameter"; s.prototype = {
        ast: function (a) { this.text = a; this.tokens = this.lexer.lex(a); a = this.program(); 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]); return a }, program: function () { for (var a = []; ;) if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.expressionStatement()), !this.expect(";")) return { type: s.Program, body: a } }, expressionStatement: function () { return { type: s.ExpressionStatement, expression: this.filterChain() } }, filterChain: function () {
            for (var a =
            this.expression() ; this.expect("|") ;) a = this.filter(a); return a
        }, expression: function () { return this.assignment() }, assignment: function () { var a = this.ternary(); this.expect("=") && (a = { type: s.AssignmentExpression, left: a, right: this.assignment(), operator: "=" }); return a }, ternary: function () { var a = this.logicalOR(), b, d; return this.expect("?") && (b = this.expression(), this.consume(":")) ? (d = this.expression(), { type: s.ConditionalExpression, test: a, alternate: b, consequent: d }) : a }, logicalOR: function () {
            for (var a = this.logicalAND() ; this.expect("||") ;) a =
            { type: s.LogicalExpression, operator: "||", left: a, right: this.logicalAND() }; return a
        }, logicalAND: function () { for (var a = this.equality() ; this.expect("&&") ;) a = { type: s.LogicalExpression, operator: "&&", left: a, right: this.equality() }; return a }, equality: function () { for (var a = this.relational(), b; b = this.expect("==", "!=", "===", "!==") ;) a = { type: s.BinaryExpression, operator: b.text, left: a, right: this.relational() }; return a }, relational: function () {
            for (var a = this.additive(), b; b = this.expect("<", ">", "<=", ">=") ;) a = {
                type: s.BinaryExpression,
                operator: b.text, left: a, right: this.additive()
            }; return a
        }, additive: function () { for (var a = this.multiplicative(), b; b = this.expect("+", "-") ;) a = { type: s.BinaryExpression, operator: b.text, left: a, right: this.multiplicative() }; return a }, multiplicative: function () { for (var a = this.unary(), b; b = this.expect("*", "/", "%") ;) a = { type: s.BinaryExpression, operator: b.text, left: a, right: this.unary() }; return a }, unary: function () {
            var a; return (a = this.expect("+", "-", "!")) ? { type: s.UnaryExpression, operator: a.text, prefix: !0, argument: this.unary() } :
            this.primary()
        }, primary: function () {
            var a; this.expect("(") ? (a = this.filterChain(), this.consume(")")) : this.expect("[") ? a = this.arrayDeclaration() : this.expect("{") ? a = this.object() : this.selfReferential.hasOwnProperty(this.peek().text) ? a = pa(this.selfReferential[this.consume().text]) : this.options.literals.hasOwnProperty(this.peek().text) ? a = { type: s.Literal, value: this.options.literals[this.consume().text] } : this.peek().identifier ? a = this.identifier() : this.peek().constant ? a = this.constant() : this.throwError("not a primary expression",
            this.peek()); for (var b; b = this.expect("(", "[", ".") ;) "(" === b.text ? (a = { type: s.CallExpression, callee: a, arguments: this.parseArguments() }, this.consume(")")) : "[" === b.text ? (a = { type: s.MemberExpression, object: a, property: this.expression(), computed: !0 }, this.consume("]")) : "." === b.text ? a = { type: s.MemberExpression, object: a, property: this.identifier(), computed: !1 } : this.throwError("IMPOSSIBLE"); return a
        }, filter: function (a) {
            a = [a]; for (var b = { type: s.CallExpression, callee: this.identifier(), arguments: a, filter: !0 }; this.expect(":") ;) a.push(this.expression());
            return b
        }, parseArguments: function () { var a = []; if (")" !== this.peekToken().text) { do a.push(this.expression()); while (this.expect(",")) } return a }, identifier: function () { var a = this.consume(); a.identifier || this.throwError("is not a valid identifier", a); return { type: s.Identifier, name: a.text } }, constant: function () { return { type: s.Literal, value: this.consume().value } }, arrayDeclaration: function () {
            var a = []; if ("]" !== this.peekToken().text) { do { if (this.peek("]")) break; a.push(this.expression()) } while (this.expect(",")) } this.consume("]");
            return { type: s.ArrayExpression, elements: a }
        }, object: function () { var a = [], b; if ("}" !== this.peekToken().text) { do { if (this.peek("}")) break; b = { type: s.Property, kind: "init" }; this.peek().constant ? b.key = this.constant() : this.peek().identifier ? b.key = this.identifier() : this.throwError("invalid key", this.peek()); this.consume(":"); b.value = this.expression(); a.push(b) } while (this.expect(",")) } this.consume("}"); return { type: s.ObjectExpression, properties: a } }, throwError: function (a, b) {
            throw ca("syntax", b.text, a, b.index + 1, this.text,
            this.text.substring(b.index));
        }, consume: function (a) { if (0 === this.tokens.length) throw ca("ueoe", this.text); var b = this.expect(a); b || this.throwError("is unexpected, expecting [" + a + "]", this.peek()); return b }, peekToken: function () { if (0 === this.tokens.length) throw ca("ueoe", this.text); return this.tokens[0] }, peek: function (a, b, d, c) { return this.peekAhead(0, a, b, d, c) }, peekAhead: function (a, b, d, c, e) { if (this.tokens.length > a) { a = this.tokens[a]; var f = a.text; if (f === b || f === d || f === c || f === e || !(b || d || c || e)) return a } return !1 },
        expect: function (a, b, d, c) { return (a = this.peek(a, b, d, c)) ? (this.tokens.shift(), a) : !1 }, selfReferential: { "this": { type: s.ThisExpression }, $locals: { type: s.LocalsExpression } }
    }; rd.prototype = {
        compile: function (a, b) {
            var d = this, c = this.astBuilder.ast(a); this.state = { nextId: 0, filters: {}, expensiveChecks: b, fn: { vars: [], body: [], own: {} }, assign: { vars: [], body: [], own: {} }, inputs: [] }; aa(c, d.$filter); var e = "", f; this.stage = "assign"; if (f = pd(c)) this.state.computing = "assign", e = this.nextId(), this.recurse(f, e), this.return_(e), e = "fn.assign=" +
            this.generateFunction("assign", "s,v,l"); f = nd(c.body); d.stage = "inputs"; q(f, function (a, b) { var c = "fn" + b; d.state[c] = { vars: [], body: [], own: {} }; d.state.computing = c; var e = d.nextId(); d.recurse(a, e); d.return_(e); d.state.inputs.push(c); a.watchId = b }); this.state.computing = "fn"; this.stage = "main"; this.recurse(c); e = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + e + this.watchFns() + "return fn;"; e = (new Function("$filter", "ensureSafeMemberName", "ensureSafeObject",
            "ensureSafeFunction", "getStringValue", "ensureSafeAssignContext", "ifDefined", "plus", "text", e))(this.$filter, Wa, ta, ld, eg, Hb, ig, md, a); this.state = this.stage = u; e.literal = qd(c); e.constant = c.constant; return e
        }, USE: "use", STRICT: "strict", watchFns: function () { var a = [], b = this.state.inputs, d = this; q(b, function (b) { a.push("var " + b + "=" + d.generateFunction(b, "s")) }); b.length && a.push("fn.inputs=[" + b.join(",") + "];"); return a.join("") }, generateFunction: function (a, b) {
            return "function(" + b + "){" + this.varsPrefix(a) + this.body(a) +
            "};"
        }, filterPrefix: function () { var a = [], b = this; q(this.state.filters, function (d, c) { a.push(d + "=$filter(" + b.escape(c) + ")") }); return a.length ? "var " + a.join(",") + ";" : "" }, varsPrefix: function (a) { return this.state[a].vars.length ? "var " + this.state[a].vars.join(",") + ";" : "" }, body: function (a) { return this.state[a].body.join("") }, recurse: function (a, b, d, c, e, f) {
            var g, h, k = this, l, m; c = c || E; if (!f && A(a.watchId)) b = b || this.nextId(), this.if_("i", this.lazyAssign(b, this.computedMember("i", a.watchId)), this.lazyRecurse(a, b, d,
            c, e, !0)); else switch (a.type) {
                case s.Program: q(a.body, function (b, c) { k.recurse(b.expression, u, u, function (a) { h = a }); c !== a.body.length - 1 ? k.current().body.push(h, ";") : k.return_(h) }); break; case s.Literal: m = this.escape(a.value); this.assign(b, m); c(m); break; case s.UnaryExpression: this.recurse(a.argument, u, u, function (a) { h = a }); m = a.operator + "(" + this.ifDefined(h, 0) + ")"; this.assign(b, m); c(m); break; case s.BinaryExpression: this.recurse(a.left, u, u, function (a) { g = a }); this.recurse(a.right, u, u, function (a) { h = a }); m = "+" ===
                a.operator ? this.plus(g, h) : "-" === a.operator ? this.ifDefined(g, 0) + a.operator + this.ifDefined(h, 0) : "(" + g + ")" + a.operator + "(" + h + ")"; this.assign(b, m); c(m); break; case s.LogicalExpression: b = b || this.nextId(); k.recurse(a.left, b); k.if_("&&" === a.operator ? b : k.not(b), k.lazyRecurse(a.right, b)); c(b); break; case s.ConditionalExpression: b = b || this.nextId(); k.recurse(a.test, b); k.if_(b, k.lazyRecurse(a.alternate, b), k.lazyRecurse(a.consequent, b)); c(b); break; case s.Identifier: b = b || this.nextId(); d && (d.context = "inputs" === k.stage ?
                "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", a.name) + "?l:s"), d.computed = !1, d.name = a.name); Wa(a.name); k.if_("inputs" === k.stage || k.not(k.getHasOwnProperty("l", a.name)), function () { k.if_("inputs" === k.stage || "s", function () { e && 1 !== e && k.if_(k.not(k.nonComputedMember("s", a.name)), k.lazyAssign(k.nonComputedMember("s", a.name), "{}")); k.assign(b, k.nonComputedMember("s", a.name)) }) }, b && k.lazyAssign(b, k.nonComputedMember("l", a.name))); (k.state.expensiveChecks || Ib(a.name)) && k.addEnsureSafeObject(b); c(b);
                    break; case s.MemberExpression: g = d && (d.context = this.nextId()) || this.nextId(); b = b || this.nextId(); k.recurse(a.object, g, u, function () {
                        k.if_(k.notNull(g), function () {
                            e && 1 !== e && k.addEnsureSafeAssignContext(g); if (a.computed) h = k.nextId(), k.recurse(a.property, h), k.getStringValue(h), k.addEnsureSafeMemberName(h), e && 1 !== e && k.if_(k.not(k.computedMember(g, h)), k.lazyAssign(k.computedMember(g, h), "{}")), m = k.ensureSafeObject(k.computedMember(g, h)), k.assign(b, m), d && (d.computed = !0, d.name = h); else {
                                Wa(a.property.name); e &&
                                1 !== e && k.if_(k.not(k.nonComputedMember(g, a.property.name)), k.lazyAssign(k.nonComputedMember(g, a.property.name), "{}")); m = k.nonComputedMember(g, a.property.name); if (k.state.expensiveChecks || Ib(a.property.name)) m = k.ensureSafeObject(m); k.assign(b, m); d && (d.computed = !1, d.name = a.property.name)
                            }
                        }, function () { k.assign(b, "undefined") }); c(b)
                    }, !!e); break; case s.CallExpression: b = b || this.nextId(); a.filter ? (h = k.filter(a.callee.name), l = [], q(a.arguments, function (a) { var b = k.nextId(); k.recurse(a, b); l.push(b) }), m = h + "(" +
                    l.join(",") + ")", k.assign(b, m), c(b)) : (h = k.nextId(), g = {}, l = [], k.recurse(a.callee, h, g, function () { k.if_(k.notNull(h), function () { k.addEnsureSafeFunction(h); q(a.arguments, function (a) { k.recurse(a, k.nextId(), u, function (a) { l.push(k.ensureSafeObject(a)) }) }); g.name ? (k.state.expensiveChecks || k.addEnsureSafeObject(g.context), m = k.member(g.context, g.name, g.computed) + "(" + l.join(",") + ")") : m = h + "(" + l.join(",") + ")"; m = k.ensureSafeObject(m); k.assign(b, m) }, function () { k.assign(b, "undefined") }); c(b) })); break; case s.AssignmentExpression: h =
                    this.nextId(); g = {}; if (!od(a.left)) throw ca("lval"); this.recurse(a.left, u, g, function () { k.if_(k.notNull(g.context), function () { k.recurse(a.right, h); k.addEnsureSafeObject(k.member(g.context, g.name, g.computed)); k.addEnsureSafeAssignContext(g.context); m = k.member(g.context, g.name, g.computed) + a.operator + h; k.assign(b, m); c(b || m) }) }, 1); break; case s.ArrayExpression: l = []; q(a.elements, function (a) { k.recurse(a, k.nextId(), u, function (a) { l.push(a) }) }); m = "[" + l.join(",") + "]"; this.assign(b, m); c(m); break; case s.ObjectExpression: l =
                    []; q(a.properties, function (a) { k.recurse(a.value, k.nextId(), u, function (b) { l.push(k.escape(a.key.type === s.Identifier ? a.key.name : "" + a.key.value) + ":" + b) }) }); m = "{" + l.join(",") + "}"; this.assign(b, m); c(m); break; case s.ThisExpression: this.assign(b, "s"); c("s"); break; case s.LocalsExpression: this.assign(b, "l"); c("l"); break; case s.NGValueParameter: this.assign(b, "v"), c("v")
            }
        }, getHasOwnProperty: function (a, b) {
            var d = a + "." + b, c = this.current().own; c.hasOwnProperty(d) || (c[d] = this.nextId(!1, a + "&&(" + this.escape(b) + " in " +
            a + ")")); return c[d]
        }, assign: function (a, b) { if (a) return this.current().body.push(a, "=", b, ";"), a }, filter: function (a) { this.state.filters.hasOwnProperty(a) || (this.state.filters[a] = this.nextId(!0)); return this.state.filters[a] }, ifDefined: function (a, b) { return "ifDefined(" + a + "," + this.escape(b) + ")" }, plus: function (a, b) { return "plus(" + a + "," + b + ")" }, return_: function (a) { this.current().body.push("return ", a, ";") }, if_: function (a, b, d) {
            if (!0 === a) b(); else {
                var c = this.current().body; c.push("if(", a, "){"); b(); c.push("}");
                d && (c.push("else{"), d(), c.push("}"))
            }
        }, not: function (a) { return "!(" + a + ")" }, notNull: function (a) { return a + "!=null" }, nonComputedMember: function (a, b) { return a + "." + b }, computedMember: function (a, b) { return a + "[" + b + "]" }, member: function (a, b, d) { return d ? this.computedMember(a, b) : this.nonComputedMember(a, b) }, addEnsureSafeObject: function (a) { this.current().body.push(this.ensureSafeObject(a), ";") }, addEnsureSafeMemberName: function (a) { this.current().body.push(this.ensureSafeMemberName(a), ";") }, addEnsureSafeFunction: function (a) {
            this.current().body.push(this.ensureSafeFunction(a),
            ";")
        }, addEnsureSafeAssignContext: function (a) { this.current().body.push(this.ensureSafeAssignContext(a), ";") }, ensureSafeObject: function (a) { return "ensureSafeObject(" + a + ",text)" }, ensureSafeMemberName: function (a) { return "ensureSafeMemberName(" + a + ",text)" }, ensureSafeFunction: function (a) { return "ensureSafeFunction(" + a + ",text)" }, getStringValue: function (a) { this.assign(a, "getStringValue(" + a + ")") }, ensureSafeAssignContext: function (a) { return "ensureSafeAssignContext(" + a + ",text)" }, lazyRecurse: function (a, b, d, c, e, f) {
            var g =
            this; return function () { g.recurse(a, b, d, c, e, f) }
        }, lazyAssign: function (a, b) { var d = this; return function () { d.assign(a, b) } }, stringEscapeRegex: /[^ a-zA-Z0-9]/g, stringEscapeFn: function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }, escape: function (a) { if (y(a)) return "'" + a.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'"; if (R(a)) return a.toString(); if (!0 === a) return "true"; if (!1 === a) return "false"; if (null === a) return "null"; if ("undefined" === typeof a) return "undefined"; throw ca("esc"); }, nextId: function (a,
        b) { var d = "v" + this.state.nextId++; a || this.current().vars.push(d + (b ? "=" + b : "")); return d }, current: function () { return this.state[this.state.computing] }
    }; sd.prototype = {
        compile: function (a, b) {
            var d = this, c = this.astBuilder.ast(a); this.expression = a; this.expensiveChecks = b; aa(c, d.$filter); var e, f; if (e = pd(c)) f = this.recurse(e); e = nd(c.body); var g; e && (g = [], q(e, function (a, b) { var c = d.recurse(a); a.input = c; g.push(c); a.watchId = b })); var h = []; q(c.body, function (a) { h.push(d.recurse(a.expression)) }); e = 0 === c.body.length ? E : 1 ===
            c.body.length ? h[0] : function (a, b) { var c; q(h, function (d) { c = d(a, b) }); return c }; f && (e.assign = function (a, b, c) { return f(a, c, b) }); g && (e.inputs = g); e.literal = qd(c); e.constant = c.constant; return e
        }, recurse: function (a, b, d) {
            var c, e, f = this, g; if (a.input) return this.inputs(a.input, a.watchId); switch (a.type) {
                case s.Literal: return this.value(a.value, b); case s.UnaryExpression: return e = this.recurse(a.argument), this["unary" + a.operator](e, b); case s.BinaryExpression: return c = this.recurse(a.left), e = this.recurse(a.right),
                this["binary" + a.operator](c, e, b); case s.LogicalExpression: return c = this.recurse(a.left), e = this.recurse(a.right), this["binary" + a.operator](c, e, b); case s.ConditionalExpression: return this["ternary?:"](this.recurse(a.test), this.recurse(a.alternate), this.recurse(a.consequent), b); case s.Identifier: return Wa(a.name, f.expression), f.identifier(a.name, f.expensiveChecks || Ib(a.name), b, d, f.expression); case s.MemberExpression: return c = this.recurse(a.object, !1, !!d), a.computed || (Wa(a.property.name, f.expression),
                e = a.property.name), a.computed && (e = this.recurse(a.property)), a.computed ? this.computedMember(c, e, b, d, f.expression) : this.nonComputedMember(c, e, f.expensiveChecks, b, d, f.expression); case s.CallExpression: return g = [], q(a.arguments, function (a) { g.push(f.recurse(a)) }), a.filter && (e = this.$filter(a.callee.name)), a.filter || (e = this.recurse(a.callee, !0)), a.filter ? function (a, c, d, f) { for (var n = [], p = 0; p < g.length; ++p) n.push(g[p](a, c, d, f)); a = e.apply(u, n, f); return b ? { context: u, name: u, value: a } : a } : function (a, c, d, m) {
                    var n =
                    e(a, c, d, m), p; if (null != n.value) { ta(n.context, f.expression); ld(n.value, f.expression); p = []; for (var q = 0; q < g.length; ++q) p.push(ta(g[q](a, c, d, m), f.expression)); p = ta(n.value.apply(n.context, p), f.expression) } return b ? { value: p } : p
                }; case s.AssignmentExpression: return c = this.recurse(a.left, !0, 1), e = this.recurse(a.right), function (a, d, g, m) { var n = c(a, d, g, m); a = e(a, d, g, m); ta(n.value, f.expression); Hb(n.context); n.context[n.name] = a; return b ? { value: a } : a }; case s.ArrayExpression: return g = [], q(a.elements, function (a) { g.push(f.recurse(a)) }),
                function (a, c, d, e) { for (var f = [], p = 0; p < g.length; ++p) f.push(g[p](a, c, d, e)); return b ? { value: f } : f }; case s.ObjectExpression: return g = [], q(a.properties, function (a) { g.push({ key: a.key.type === s.Identifier ? a.key.name : "" + a.key.value, value: f.recurse(a.value) }) }), function (a, c, d, e) { for (var f = {}, p = 0; p < g.length; ++p) f[g[p].key] = g[p].value(a, c, d, e); return b ? { value: f } : f }; case s.ThisExpression: return function (a) { return b ? { value: a } : a }; case s.LocalsExpression: return function (a, c) { return b ? { value: c } : c }; case s.NGValueParameter: return function (a,
                c, d) { return b ? { value: d } : d }
            }
        }, "unary+": function (a, b) { return function (d, c, e, f) { d = a(d, c, e, f); d = A(d) ? +d : 0; return b ? { value: d } : d } }, "unary-": function (a, b) { return function (d, c, e, f) { d = a(d, c, e, f); d = A(d) ? -d : 0; return b ? { value: d } : d } }, "unary!": function (a, b) { return function (d, c, e, f) { d = !a(d, c, e, f); return b ? { value: d } : d } }, "binary+": function (a, b, d) { return function (c, e, f, g) { var h = a(c, e, f, g); c = b(c, e, f, g); h = md(h, c); return d ? { value: h } : h } }, "binary-": function (a, b, d) {
            return function (c, e, f, g) {
                var h = a(c, e, f, g); c = b(c, e, f, g);
                h = (A(h) ? h : 0) - (A(c) ? c : 0); return d ? { value: h } : h
            }
        }, "binary*": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) * b(c, e, f, g); return d ? { value: c } : c } }, "binary/": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) / b(c, e, f, g); return d ? { value: c } : c } }, "binary%": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) % b(c, e, f, g); return d ? { value: c } : c } }, "binary===": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) === b(c, e, f, g); return d ? { value: c } : c } }, "binary!==": function (a, b, d) {
            return function (c, e, f, g) {
                c = a(c,
                e, f, g) !== b(c, e, f, g); return d ? { value: c } : c
            }
        }, "binary==": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) == b(c, e, f, g); return d ? { value: c } : c } }, "binary!=": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) != b(c, e, f, g); return d ? { value: c } : c } }, "binary<": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) < b(c, e, f, g); return d ? { value: c } : c } }, "binary>": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) > b(c, e, f, g); return d ? { value: c } : c } }, "binary<=": function (a, b, d) {
            return function (c, e, f, g) {
                c = a(c, e, f,
                g) <= b(c, e, f, g); return d ? { value: c } : c
            }
        }, "binary>=": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) >= b(c, e, f, g); return d ? { value: c } : c } }, "binary&&": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) && b(c, e, f, g); return d ? { value: c } : c } }, "binary||": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) || b(c, e, f, g); return d ? { value: c } : c } }, "ternary?:": function (a, b, d, c) { return function (e, f, g, h) { e = a(e, f, g, h) ? b(e, f, g, h) : d(e, f, g, h); return c ? { value: e } : e } }, value: function (a, b) {
            return function () {
                return b ? {
                    context: u,
                    name: u, value: a
                } : a
            }
        }, identifier: function (a, b, d, c, e) { return function (f, g, h, k) { f = g && a in g ? g : f; c && 1 !== c && f && !f[a] && (f[a] = {}); g = f ? f[a] : u; b && ta(g, e); return d ? { context: f, name: a, value: g } : g } }, computedMember: function (a, b, d, c, e) { return function (f, g, h, k) { var l = a(f, g, h, k), m, n; null != l && (m = b(f, g, h, k), m += "", Wa(m, e), c && 1 !== c && (Hb(l), l && !l[m] && (l[m] = {})), n = l[m], ta(n, e)); return d ? { context: l, name: m, value: n } : n } }, nonComputedMember: function (a, b, d, c, e, f) {
            return function (g, h, k, l) {
                g = a(g, h, k, l); e && 1 !== e && (Hb(g), g && !g[b] &&
                (g[b] = {})); h = null != g ? g[b] : u; (d || Ib(b)) && ta(h, f); return c ? { context: g, name: b, value: h } : h
            }
        }, inputs: function (a, b) { return function (d, c, e, f) { return f ? f[b] : a(d, c, e) } }
    }; var hc = function (a, b, d) { this.lexer = a; this.$filter = b; this.options = d; this.ast = new s(a, d); this.astCompiler = d.csp ? new sd(this.ast, b) : new rd(this.ast, b) }; hc.prototype = { constructor: hc, parse: function (a) { return this.astCompiler.compile(a, this.options.expensiveChecks) } }; var jg = Object.prototype.valueOf, ua = O("$sce"), ma = {
        HTML: "html", CSS: "css", URL: "url",
        RESOURCE_URL: "resourceUrl", JS: "js"
    }, lg = O("$compile"), Z = P.createElement("a"), wd = sa(T.location.href); xd.$inject = ["$document"]; Jc.$inject = ["$provide"]; var Ed = 22, Dd = ".", jc = "0"; yd.$inject = ["$locale"]; Ad.$inject = ["$locale"]; var wg = {
        yyyy: X("FullYear", 4, 0, !1, !0), yy: X("FullYear", 2, 0, !0, !0), y: X("FullYear", 1, 0, !1, !0), MMMM: lb("Month"), MMM: lb("Month", !0), MM: X("Month", 2, 1), M: X("Month", 1, 1), LLLL: lb("Month", !1, !0), dd: X("Date", 2), d: X("Date", 1), HH: X("Hours", 2), H: X("Hours", 1), hh: X("Hours", 2, -12), h: X("Hours", 1, -12),
        mm: X("Minutes", 2), m: X("Minutes", 1), ss: X("Seconds", 2), s: X("Seconds", 1), sss: X("Milliseconds", 3), EEEE: lb("Day"), EEE: lb("Day", !0), a: function (a, b) { return 12 > a.getHours() ? b.AMPMS[0] : b.AMPMS[1] }, Z: function (a, b, d) { a = -1 * d; return a = (0 <= a ? "+" : "") + (Jb(Math[0 < a ? "floor" : "ceil"](a / 60), 2) + Jb(Math.abs(a % 60), 2)) }, ww: Gd(2), w: Gd(1), G: kc, GG: kc, GGG: kc, GGGG: function (a, b) { return 0 >= a.getFullYear() ? b.ERANAMES[0] : b.ERANAMES[1] }
    }, vg = /((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
    ug = /^\-?\d+$/; zd.$inject = ["$locale"]; var pg = da(N), qg = da(vb); Bd.$inject = ["$parse"]; var me = da({ restrict: "E", compile: function (a, b) { if (!b.href && !b.xlinkHref) return function (a, b) { if ("a" === b[0].nodeName.toLowerCase()) { var e = "[object SVGAnimatedString]" === ka.call(b.prop("href")) ? "xlink:href" : "href"; b.on("click", function (a) { b.attr(e) || a.preventDefault() }) } } } }), wb = {}; q(Eb, function (a, b) {
        function d(a, d, e) { a.$watch(e[c], function (a) { e.$set(b, !!a) }) } if ("multiple" != a) {
            var c = ya("ng-" + b), e = d; "checked" === a && (e = function (a,
            b, e) { e.ngModel !== e[c] && d(a, b, e) }); wb[c] = function () { return { restrict: "A", priority: 100, link: e } }
        }
    }); q($c, function (a, b) { wb[b] = function () { return { priority: 100, link: function (a, c, e) { if ("ngPattern" === b && "/" == e.ngPattern.charAt(0) && (c = e.ngPattern.match(yg))) { e.$set("ngPattern", new RegExp(c[1], c[2])); return } a.$watch(e[b], function (a) { e.$set(b, a) }) } } } }); q(["src", "srcset", "href"], function (a) {
        var b = ya("ng-" + a); wb[b] = function () {
            return {
                priority: 99, link: function (d, c, e) {
                    var f = a, g = a; "href" === a && "[object SVGAnimatedString]" ===
                    ka.call(c.prop("href")) && (g = "xlinkHref", e.$attr[g] = "xlink:href", f = null); e.$observe(b, function (b) { b ? (e.$set(g, b), Da && f && c.prop(f, e[g])) : "href" === a && e.$set(g, null) })
                }
            }
        }
    }); var Kb = { $addControl: E, $$renameControl: function (a, b) { a.$name = b }, $removeControl: E, $setValidity: E, $setDirty: E, $setPristine: E, $setSubmitted: E }; Hd.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"]; var Qd = function (a) {
        return ["$timeout", "$parse", function (b, d) {
            function c(a) { return "" === a ? d('this[""]').assign : d(a).assign || E } return {
                name: "form",
                restrict: a ? "EAC" : "E", require: ["form", "^^?form"], controller: Hd, compile: function (d, f) {
                    d.addClass(Xa).addClass(pb); var g = f.name ? "name" : a && f.ngForm ? "ngForm" : !1; return {
                        pre: function (a, d, e, f) {
                            var n = f[0]; if (!("action" in e)) { var p = function (b) { a.$apply(function () { n.$commitViewValue(); n.$setSubmitted() }); b.preventDefault() }; d[0].addEventListener("submit", p, !1); d.on("$destroy", function () { b(function () { d[0].removeEventListener("submit", p, !1) }, 0, !1) }) } (f[1] || n.$$parentForm).$addControl(n); var q = g ? c(n.$name) : E; g &&
                            (q(a, n), e.$observe(g, function (b) { n.$name !== b && (q(a, u), n.$$parentForm.$$renameControl(n, b), q = c(n.$name), q(a, n)) })); d.on("$destroy", function () { n.$$parentForm.$removeControl(n); q(a, u); S(n, Kb) })
                        }
                    }
                }
            }
        }]
    }, ne = Qd(), Ae = Qd(!0), xg = /^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/, Gg = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i, Hg = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    Ig = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, Rd = /^(\d{4,})-(\d{2})-(\d{2})$/, Sd = /^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, nc = /^(\d{4,})-W(\d\d)$/, Td = /^(\d{4,})-(\d\d)$/, Ud = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, Jd = V(); q(["date", "datetime-local", "month", "time", "week"], function (a) { Jd[a] = !0 }); var Vd = {
        text: function (a, b, d, c, e, f) { mb(a, b, d, c, e, f); lc(c) }, date: nb("date", Rd, Mb(Rd, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"), "datetime-local": nb("datetimelocal", Sd, Mb(Sd, "yyyy MM dd HH mm ss sss".split(" ")),
        "yyyy-MM-ddTHH:mm:ss.sss"), time: nb("time", Ud, Mb(Ud, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"), week: nb("week", nc, function (a, b) { if (fa(a)) return a; if (y(a)) { nc.lastIndex = 0; var d = nc.exec(a); if (d) { var c = +d[1], e = +d[2], f = d = 0, g = 0, h = 0, k = Fd(c), e = 7 * (e - 1); b && (d = b.getHours(), f = b.getMinutes(), g = b.getSeconds(), h = b.getMilliseconds()); return new Date(c, 0, k.getDate() + e, d, f, g, h) } } return NaN }, "yyyy-Www"), month: nb("month", Td, Mb(Td, ["yyyy", "MM"]), "yyyy-MM"), number: function (a, b, d, c, e, f) {
            Kd(a, b, d, c); mb(a, b, d, c, e, f); c.$$parserName =
            "number"; c.$parsers.push(function (a) { return c.$isEmpty(a) ? null : Ig.test(a) ? parseFloat(a) : u }); c.$formatters.push(function (a) { if (!c.$isEmpty(a)) { if (!R(a)) throw ob("numfmt", a); a = a.toString() } return a }); if (A(d.min) || d.ngMin) { var g; c.$validators.min = function (a) { return c.$isEmpty(a) || z(g) || a >= g }; d.$observe("min", function (a) { A(a) && !R(a) && (a = parseFloat(a, 10)); g = R(a) && !isNaN(a) ? a : u; c.$validate() }) } if (A(d.max) || d.ngMax) {
                var h; c.$validators.max = function (a) { return c.$isEmpty(a) || z(h) || a <= h }; d.$observe("max", function (a) {
                    A(a) &&
                    !R(a) && (a = parseFloat(a, 10)); h = R(a) && !isNaN(a) ? a : u; c.$validate()
                })
            }
        }, url: function (a, b, d, c, e, f) { mb(a, b, d, c, e, f); lc(c); c.$$parserName = "url"; c.$validators.url = function (a, b) { var d = a || b; return c.$isEmpty(d) || Gg.test(d) } }, email: function (a, b, d, c, e, f) { mb(a, b, d, c, e, f); lc(c); c.$$parserName = "email"; c.$validators.email = function (a, b) { var d = a || b; return c.$isEmpty(d) || Hg.test(d) } }, radio: function (a, b, d, c) {
            z(d.name) && b.attr("name", ++qb); b.on("click", function (a) { b[0].checked && c.$setViewValue(d.value, a && a.type) }); c.$render =
            function () { b[0].checked = d.value == c.$viewValue }; d.$observe("value", c.$render)
        }, checkbox: function (a, b, d, c, e, f, g, h) { var k = Ld(h, a, "ngTrueValue", d.ngTrueValue, !0), l = Ld(h, a, "ngFalseValue", d.ngFalseValue, !1); b.on("click", function (a) { c.$setViewValue(b[0].checked, a && a.type) }); c.$render = function () { b[0].checked = c.$viewValue }; c.$isEmpty = function (a) { return !1 === a }; c.$formatters.push(function (a) { return na(a, k) }); c.$parsers.push(function (a) { return a ? k : l }) }, hidden: E, button: E, submit: E, reset: E, file: E
    }, Dc = ["$browser",
    "$sniffer", "$filter", "$parse", function (a, b, d, c) { return { restrict: "E", require: ["?ngModel"], link: { pre: function (e, f, g, h) { h[0] && (Vd[N(g.type)] || Vd.text)(e, f, g, h[0], b, a, d, c) } } } }], Jg = /^(true|false|\d+)$/, Se = function () { return { restrict: "A", priority: 100, compile: function (a, b) { return Jg.test(b.ngValue) ? function (a, b, e) { e.$set("value", a.$eval(e.ngValue)) } : function (a, b, e) { a.$watch(e.ngValue, function (a) { e.$set("value", a) }) } } } }, se = ["$compile", function (a) {
        return {
            restrict: "AC", compile: function (b) {
                a.$$addBindingClass(b);
                return function (b, c, e) { a.$$addBindingInfo(c, e.ngBind); c = c[0]; b.$watch(e.ngBind, function (a) { c.textContent = z(a) ? "" : a }) }
            }
        }
    }], ue = ["$interpolate", "$compile", function (a, b) { return { compile: function (d) { b.$$addBindingClass(d); return function (c, d, f) { c = a(d.attr(f.$attr.ngBindTemplate)); b.$$addBindingInfo(d, c.expressions); d = d[0]; f.$observe("ngBindTemplate", function (a) { d.textContent = z(a) ? "" : a }) } } } }], te = ["$sce", "$parse", "$compile", function (a, b, d) {
        return {
            restrict: "A", compile: function (c, e) {
                var f = b(e.ngBindHtml), g =
                b(e.ngBindHtml, function (a) { return (a || "").toString() }); d.$$addBindingClass(c); return function (b, c, e) { d.$$addBindingInfo(c, e.ngBindHtml); b.$watch(g, function () { c.html(a.getTrustedHtml(f(b)) || "") }) }
            }
        }
    }], Re = da({ restrict: "A", require: "ngModel", link: function (a, b, d, c) { c.$viewChangeListeners.push(function () { a.$eval(d.ngChange) }) } }), ve = mc("", !0), xe = mc("Odd", 0), we = mc("Even", 1), ye = Na({ compile: function (a, b) { b.$set("ngCloak", u); a.removeClass("ng-cloak") } }), ze = [function () {
        return {
            restrict: "A", scope: !0, controller: "@",
            priority: 500
        }
    }], Ic = {}, Kg = { blur: !0, focus: !0 }; q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (a) { var b = ya("ng-" + a); Ic[b] = ["$parse", "$rootScope", function (d, c) { return { restrict: "A", compile: function (e, f) { var g = d(f[b], null, !0); return function (b, d) { d.on(a, function (d) { var e = function () { g(b, { $event: d }) }; Kg[a] && c.$$phase ? b.$evalAsync(e) : b.$apply(e) }) } } } }] }); var Ce = ["$animate", "$compile", function (a,
    b) { return { multiElement: !0, transclude: "element", priority: 600, terminal: !0, restrict: "A", $$tlb: !0, link: function (d, c, e, f, g) { var h, k, l; d.$watch(e.ngIf, function (d) { d ? k || g(function (d, f) { k = f; d[d.length++] = b.$$createComment("end ngIf", e.ngIf); h = { clone: d }; a.enter(d, c.parent(), c) }) : (l && (l.remove(), l = null), k && (k.$destroy(), k = null), h && (l = ub(h.clone), a.leave(l).then(function () { l = null }), h = null)) }) } } }], De = ["$templateRequest", "$anchorScroll", "$animate", function (a, b, d) {
        return {
            restrict: "ECA", priority: 400, terminal: !0,
            transclude: "element", controller: ea.noop, compile: function (c, e) {
                var f = e.ngInclude || e.src, g = e.onload || "", h = e.autoscroll; return function (c, e, m, n, p) {
                    var q = 0, s, x, r, w = function () { x && (x.remove(), x = null); s && (s.$destroy(), s = null); r && (d.leave(r).then(function () { x = null }), x = r, r = null) }; c.$watch(f, function (f) {
                        var m = function () { !A(h) || h && !c.$eval(h) || b() }, t = ++q; f ? (a(f, !0).then(function (a) {
                            if (!c.$$destroyed && t === q) {
                                var b = c.$new(); n.template = a; a = p(b, function (a) { w(); d.enter(a, null, e).then(m) }); s = b; r = a; s.$emit("$includeContentLoaded",
                                f); c.$eval(g)
                            }
                        }, function () { c.$$destroyed || t !== q || (w(), c.$emit("$includeContentError", f)) }), c.$emit("$includeContentRequested", f)) : (w(), n.template = null)
                    })
                }
            }
        }
    }], Ue = ["$compile", function (a) { return { restrict: "ECA", priority: -400, require: "ngInclude", link: function (b, d, c, e) { ka.call(d[0]).match(/SVG/) ? (d.empty(), a(Lc(e.template, P).childNodes)(b, function (a) { d.append(a) }, { futureParentElement: d })) : (d.html(e.template), a(d.contents())(b)) } } }], Ee = Na({ priority: 450, compile: function () { return { pre: function (a, b, d) { a.$eval(d.ngInit) } } } }),
    Qe = function () { return { restrict: "A", priority: 100, require: "ngModel", link: function (a, b, d, c) { var e = b.attr(d.$attr.ngList) || ", ", f = "false" !== d.ngTrim, g = f ? W(e) : e; c.$parsers.push(function (a) { if (!z(a)) { var b = []; a && q(a.split(g), function (a) { a && b.push(f ? W(a) : a) }); return b } }); c.$formatters.push(function (a) { return M(a) ? a.join(e) : u }); c.$isEmpty = function (a) { return !a || !a.length } } } }, pb = "ng-valid", Md = "ng-invalid", Xa = "ng-pristine", Lb = "ng-dirty", Od = "ng-pending", ob = O("ngModel"), Lg = ["$scope", "$exceptionHandler", "$attrs",
    "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function (a, b, d, c, e, f, g, h, k, l) {
        this.$modelValue = this.$viewValue = Number.NaN; this.$$rawModelValue = u; this.$validators = {}; this.$asyncValidators = {}; this.$parsers = []; this.$formatters = []; this.$viewChangeListeners = []; this.$untouched = !0; this.$touched = !1; this.$pristine = !0; this.$dirty = !1; this.$valid = !0; this.$invalid = !1; this.$error = {}; this.$$success = {}; this.$pending = u; this.$name = l(d.name || "", !1)(a); this.$$parentForm = Kb; var m = e(d.ngModel),
        n = m.assign, p = m, s = n, y = null, x, r = this; this.$$setOptions = function (a) { if ((r.$options = a) && a.getterSetter) { var b = e(d.ngModel + "()"), f = e(d.ngModel + "($$$p)"); p = function (a) { var c = m(a); D(c) && (c = b(a)); return c }; s = function (a, b) { D(m(a)) ? f(a, { $$$p: b }) : n(a, b) } } else if (!m.assign) throw ob("nonassign", d.ngModel, wa(c)); }; this.$render = E; this.$isEmpty = function (a) { return z(a) || "" === a || null === a || a !== a }; this.$$updateEmptyClasses = function (a) {
            r.$isEmpty(a) ? (f.removeClass(c, "ng-not-empty"), f.addClass(c, "ng-empty")) : (f.removeClass(c,
            "ng-empty"), f.addClass(c, "ng-not-empty"))
        }; var w = 0; Id({ ctrl: this, $element: c, set: function (a, b) { a[b] = !0 }, unset: function (a, b) { delete a[b] }, $animate: f }); this.$setPristine = function () { r.$dirty = !1; r.$pristine = !0; f.removeClass(c, Lb); f.addClass(c, Xa) }; this.$setDirty = function () { r.$dirty = !0; r.$pristine = !1; f.removeClass(c, Xa); f.addClass(c, Lb); r.$$parentForm.$setDirty() }; this.$setUntouched = function () { r.$touched = !1; r.$untouched = !0; f.setClass(c, "ng-untouched", "ng-touched") }; this.$setTouched = function () {
            r.$touched =
            !0; r.$untouched = !1; f.setClass(c, "ng-touched", "ng-untouched")
        }; this.$rollbackViewValue = function () { g.cancel(y); r.$viewValue = r.$$lastCommittedViewValue; r.$render() }; this.$validate = function () { if (!R(r.$modelValue) || !isNaN(r.$modelValue)) { var a = r.$$rawModelValue, b = r.$valid, c = r.$modelValue, d = r.$options && r.$options.allowInvalid; r.$$runValidators(a, r.$$lastCommittedViewValue, function (e) { d || b === e || (r.$modelValue = e ? a : u, r.$modelValue !== c && r.$$writeModelToScope()) }) } }; this.$$runValidators = function (a, b, c) {
            function d() {
                var c =
                !0; q(r.$validators, function (d, e) { var g = d(a, b); c = c && g; f(e, g) }); return c ? !0 : (q(r.$asyncValidators, function (a, b) { f(b, null) }), !1)
            } function e() { var c = [], d = !0; q(r.$asyncValidators, function (e, g) { var h = e(a, b); if (!h || !D(h.then)) throw ob("nopromise", h); f(g, u); c.push(h.then(function () { f(g, !0) }, function () { d = !1; f(g, !1) })) }); c.length ? k.all(c).then(function () { g(d) }, E) : g(!0) } function f(a, b) { h === w && r.$setValidity(a, b) } function g(a) { h === w && c(a) } w++; var h = w; (function () {
                var a = r.$$parserName || "parse"; if (z(x)) f(a, null);
                else return x || (q(r.$validators, function (a, b) { f(b, null) }), q(r.$asyncValidators, function (a, b) { f(b, null) })), f(a, x), x; return !0
            })() ? d() ? e() : g(!1) : g(!1)
        }; this.$commitViewValue = function () { var a = r.$viewValue; g.cancel(y); if (r.$$lastCommittedViewValue !== a || "" === a && r.$$hasNativeValidators) r.$$updateEmptyClasses(a), r.$$lastCommittedViewValue = a, r.$pristine && this.$setDirty(), this.$$parseAndValidate() }; this.$$parseAndValidate = function () {
            var b = r.$$lastCommittedViewValue; if (x = z(b) ? u : !0) for (var c = 0; c < r.$parsers.length; c++) if (b =
            r.$parsers[c](b), z(b)) { x = !1; break } R(r.$modelValue) && isNaN(r.$modelValue) && (r.$modelValue = p(a)); var d = r.$modelValue, e = r.$options && r.$options.allowInvalid; r.$$rawModelValue = b; e && (r.$modelValue = b, r.$modelValue !== d && r.$$writeModelToScope()); r.$$runValidators(b, r.$$lastCommittedViewValue, function (a) { e || (r.$modelValue = a ? b : u, r.$modelValue !== d && r.$$writeModelToScope()) })
        }; this.$$writeModelToScope = function () { s(a, r.$modelValue); q(r.$viewChangeListeners, function (a) { try { a() } catch (c) { b(c) } }) }; this.$setViewValue =
        function (a, b) { r.$viewValue = a; r.$options && !r.$options.updateOnDefault || r.$$debounceViewValueCommit(b) }; this.$$debounceViewValueCommit = function (b) { var c = 0, d = r.$options; d && A(d.debounce) && (d = d.debounce, R(d) ? c = d : R(d[b]) ? c = d[b] : R(d["default"]) && (c = d["default"])); g.cancel(y); c ? y = g(function () { r.$commitViewValue() }, c) : h.$$phase ? r.$commitViewValue() : a.$apply(function () { r.$commitViewValue() }) }; a.$watch(function () {
            var b = p(a); if (b !== r.$modelValue && (r.$modelValue === r.$modelValue || b === b)) {
                r.$modelValue = r.$$rawModelValue =
                b; x = u; for (var c = r.$formatters, d = c.length, e = b; d--;) e = c[d](e); r.$viewValue !== e && (r.$$updateEmptyClasses(e), r.$viewValue = r.$$lastCommittedViewValue = e, r.$render(), r.$$runValidators(b, e, E))
            } return b
        })
    }], Pe = ["$rootScope", function (a) {
        return {
            restrict: "A", require: ["ngModel", "^?form", "^?ngModelOptions"], controller: Lg, priority: 1, compile: function (b) {
                b.addClass(Xa).addClass("ng-untouched").addClass(pb); return {
                    pre: function (a, b, e, f) {
                        var g = f[0]; b = f[1] || g.$$parentForm; g.$$setOptions(f[2] && f[2].$options); b.$addControl(g);
                        e.$observe("name", function (a) { g.$name !== a && g.$$parentForm.$$renameControl(g, a) }); a.$on("$destroy", function () { g.$$parentForm.$removeControl(g) })
                    }, post: function (b, c, e, f) { var g = f[0]; if (g.$options && g.$options.updateOn) c.on(g.$options.updateOn, function (a) { g.$$debounceViewValueCommit(a && a.type) }); c.on("blur", function () { g.$touched || (a.$$phase ? b.$evalAsync(g.$setTouched) : b.$apply(g.$setTouched)) }) }
                }
            }
        }
    }], Mg = /(\s+|^)default(\s+|$)/, Te = function () {
        return {
            restrict: "A", controller: ["$scope", "$attrs", function (a,
            b) { var d = this; this.$options = pa(a.$eval(b.ngModelOptions)); A(this.$options.updateOn) ? (this.$options.updateOnDefault = !1, this.$options.updateOn = W(this.$options.updateOn.replace(Mg, function () { d.$options.updateOnDefault = !0; return " " }))) : this.$options.updateOnDefault = !0 }]
        }
    }, Fe = Na({ terminal: !0, priority: 1E3 }), Ng = O("ngOptions"), Og = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
    Ne = ["$compile", "$parse", function (a, b) {
        function d(a, c, d) {
            function e(a, b, c, d, f) { this.selectValue = a; this.viewValue = b; this.label = c; this.group = d; this.disabled = f } function l(a) { var b; if (!p && za(a)) b = a; else { b = []; for (var c in a) a.hasOwnProperty(c) && "$" !== c.charAt(0) && b.push(c) } return b } var m = a.match(Og); if (!m) throw Ng("iexp", a, wa(c)); var n = m[5] || m[7], p = m[6]; a = / as /.test(m[0]) && m[1]; var q = m[9]; c = b(m[2] ? m[1] : n); var s = a && b(a) || c, x = q && b(q), r = q ? function (a, b) { return x(d, b) } : function (a) { return Ha(a) }, w = function (a,
            b) { return r(a, y(a, b)) }, v = b(m[2] || m[1]), u = b(m[3] || ""), t = b(m[4] || ""), G = b(m[8]), C = {}, y = p ? function (a, b) { C[p] = b; C[n] = a; return C } : function (a) { C[n] = a; return C }; return {
                trackBy: q, getTrackByValue: w, getWatchables: b(G, function (a) { var b = []; a = a || []; for (var c = l(a), e = c.length, f = 0; f < e; f++) { var g = a === c ? f : c[f], k = a[g], g = y(k, g), k = r(k, g); b.push(k); if (m[2] || m[1]) k = v(d, g), b.push(k); m[4] && (g = t(d, g), b.push(g)) } return b }), getOptions: function () {
                    for (var a = [], b = {}, c = G(d) || [], f = l(c), g = f.length, m = 0; m < g; m++) {
                        var n = c === f ? m : f[m], p =
                        y(c[n], n), x = s(d, p), n = r(x, p), C = v(d, p), A = u(d, p), p = t(d, p), x = new e(n, x, C, A, p); a.push(x); b[n] = x
                    } return { items: a, selectValueMap: b, getOptionFromViewValue: function (a) { return b[w(a)] }, getViewValueFromOption: function (a) { return q ? ea.copy(a.viewValue) : a.viewValue } }
                }
            }
        } var c = P.createElement("option"), e = P.createElement("optgroup"); return {
            restrict: "A", terminal: !0, require: ["select", "ngModel"], link: {
                pre: function (a, b, c, d) { d[0].registerOption = E }, post: function (b, g, h, k) {
                    function l(a, b) {
                        a.element = b; b.disabled = a.disabled;
                        a.label !== b.label && (b.label = a.label, b.textContent = a.label); a.value !== b.value && (b.value = a.selectValue)
                    } function m(a, b, c, d) { b && N(b.nodeName) === c ? c = b : (c = d.cloneNode(!1), b ? a.insertBefore(c, b) : a.appendChild(c)); return c } function n(a) { for (var b; a;) b = a.nextSibling, Yb(a), a = b } function p(a) { var b = w && w[0], c = G && G[0]; if (b || c) for (; a && (a === b || a === c || 8 === a.nodeType || "option" === oa(a) && "" === a.value) ;) a = a.nextSibling; return a } function s() {
                        var a = C && u.readValue(); C = z.getOptions(); var b = {}, d = g[0].firstChild; t && g.prepend(w);
                        d = p(d); C.items.forEach(function (a) { var f, h; A(a.group) ? (f = b[a.group], f || (f = m(g[0], d, "optgroup", e), d = f.nextSibling, f.label = a.group, f = b[a.group] = { groupElement: f, currentOptionElement: f.firstChild }), h = m(f.groupElement, f.currentOptionElement, "option", c), l(a, h), f.currentOptionElement = h.nextSibling) : (h = m(g[0], d, "option", c), l(a, h), d = h.nextSibling) }); Object.keys(b).forEach(function (a) { n(b[a].currentOptionElement) }); n(d); x.$render(); if (!x.$isEmpty(a)) {
                            var f = u.readValue(); (z.trackBy || r ? na(a, f) : a === f) || (x.$setViewValue(f),
                            x.$render())
                        }
                    } var u = k[0], x = k[1], r = h.multiple, w; k = 0; for (var v = g.children(), y = v.length; k < y; k++) if ("" === v[k].value) { w = v.eq(k); break } var t = !!w, G = H(c.cloneNode(!1)); G.val("?"); var C, z = d(h.ngOptions, g, b); r ? (x.$isEmpty = function (a) { return !a || 0 === a.length }, u.writeValue = function (a) { C.items.forEach(function (a) { a.element.selected = !1 }); a && a.forEach(function (a) { (a = C.getOptionFromViewValue(a)) && !a.disabled && (a.element.selected = !0) }) }, u.readValue = function () {
                        var a = g.val() || [], b = []; q(a, function (a) {
                            (a = C.selectValueMap[a]) &&
                            !a.disabled && b.push(C.getViewValueFromOption(a))
                        }); return b
                    }, z.trackBy && b.$watchCollection(function () { if (M(x.$viewValue)) return x.$viewValue.map(function (a) { return z.getTrackByValue(a) }) }, function () { x.$render() })) : (u.writeValue = function (a) {
                        var b = C.getOptionFromViewValue(a); b && !b.disabled ? (g[0].value !== b.selectValue && (G.remove(), t || w.remove(), g[0].value = b.selectValue, b.element.selected = !0), b.element.setAttribute("selected", "selected")) : null === a || t ? (G.remove(), t || g.prepend(w), g.val(""), w.prop("selected",
                        !0), w.attr("selected", !0)) : (t || w.remove(), g.prepend(G), g.val("?"), G.prop("selected", !0), G.attr("selected", !0))
                    }, u.readValue = function () { var a = C.selectValueMap[g.val()]; return a && !a.disabled ? (t || w.remove(), G.remove(), C.getViewValueFromOption(a)) : null }, z.trackBy && b.$watch(function () { return z.getTrackByValue(x.$viewValue) }, function () { x.$render() })); t ? (w.remove(), a(w)(b), w.removeClass("ng-scope")) : w = H(c.cloneNode(!1)); s(); b.$watchCollection(z.getWatchables, s)
                }
            }
        }
    }], Ge = ["$locale", "$interpolate", "$log", function (a,
    b, d) {
        var c = /{}/g, e = /^when(Minus)?(.+)$/; return {
            link: function (f, g, h) {
                function k(a) { g.text(a || "") } var l = h.count, m = h.$attr.when && g.attr(h.$attr.when), n = h.offset || 0, p = f.$eval(m) || {}, s = {}, u = b.startSymbol(), x = b.endSymbol(), r = u + l + "-" + n + x, w = ea.noop, v; q(h, function (a, b) { var c = e.exec(b); c && (c = (c[1] ? "-" : "") + N(c[2]), p[c] = g.attr(h.$attr[b])) }); q(p, function (a, d) { s[d] = b(a.replace(c, r)) }); f.$watch(l, function (b) {
                    var c = parseFloat(b), e = isNaN(c); e || c in p || (c = a.pluralCat(c - n)); c === v || e && R(v) && isNaN(v) || (w(), e = s[c], z(e) ?
                    (null != b && d.debug("ngPluralize: no rule defined for '" + c + "' in " + m), w = E, k()) : w = f.$watch(e, k), v = c)
                })
            }
        }
    }], He = ["$parse", "$animate", "$compile", function (a, b, d) {
        var c = O("ngRepeat"), e = function (a, b, c, d, e, m, n) { a[c] = d; e && (a[e] = m); a.$index = b; a.$first = 0 === b; a.$last = b === n - 1; a.$middle = !(a.$first || a.$last); a.$odd = !(a.$even = 0 === (b & 1)) }; return {
            restrict: "A", multiElement: !0, transclude: "element", priority: 1E3, terminal: !0, $$tlb: !0, compile: function (f, g) {
                var h = g.ngRepeat, k = d.$$createComment("end ngRepeat", h), l = h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                if (!l) throw c("iexp", h); var m = l[1], n = l[2], p = l[3], s = l[4], l = m.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/); if (!l) throw c("iidexp", m); var y = l[3] || l[1], x = l[2]; if (p && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(p) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(p))) throw c("badident", p); var r, w, v, z, t = { $id: Ha }; s ? r = a(s) : (v = function (a, b) { return Ha(b) }, z = function (a) { return a }); return function (a, d, f, g, l) {
                    r && (w = function (b, c, d) {
                        x && (t[x] = b); t[y] = c; t.$index =
                        d; return r(a, t)
                    }); var m = V(); a.$watchCollection(n, function (f) {
                        var g, n, r = d[0], s, t = V(), A, E, H, D, I, F, J; p && (a[p] = f); if (za(f)) I = f, n = w || v; else for (J in n = w || z, I = [], f) va.call(f, J) && "$" !== J.charAt(0) && I.push(J); A = I.length; J = Array(A); for (g = 0; g < A; g++) if (E = f === I ? g : I[g], H = f[E], D = n(E, H, g), m[D]) F = m[D], delete m[D], t[D] = F, J[g] = F; else { if (t[D]) throw q(J, function (a) { a && a.scope && (m[a.id] = a) }), c("dupes", h, D, H); J[g] = { id: D, scope: u, clone: u }; t[D] = !0 } for (s in m) {
                            F = m[s]; D = ub(F.clone); b.leave(D); if (D[0].parentNode) for (g = 0, n = D.length; g <
                            n; g++) D[g].$$NG_REMOVED = !0; F.scope.$destroy()
                        } for (g = 0; g < A; g++) if (E = f === I ? g : I[g], H = f[E], F = J[g], F.scope) { s = r; do s = s.nextSibling; while (s && s.$$NG_REMOVED); F.clone[0] != s && b.move(ub(F.clone), null, r); r = F.clone[F.clone.length - 1]; e(F.scope, g, y, H, x, E, A) } else l(function (a, c) { F.scope = c; var d = k.cloneNode(!1); a[a.length++] = d; b.enter(a, null, r); r = d; F.clone = a; t[F.id] = F; e(F.scope, g, y, H, x, E, A) }); m = t
                    })
                }
            }
        }
    }], Ie = ["$animate", function (a) {
        return {
            restrict: "A", multiElement: !0, link: function (b, d, c) {
                b.$watch(c.ngShow, function (b) {
                    a[b ?
                    "removeClass" : "addClass"](d, "ng-hide", { tempClasses: "ng-hide-animate" })
                })
            }
        }
    }], Be = ["$animate", function (a) { return { restrict: "A", multiElement: !0, link: function (b, d, c) { b.$watch(c.ngHide, function (b) { a[b ? "addClass" : "removeClass"](d, "ng-hide", { tempClasses: "ng-hide-animate" }) }) } } }], Je = Na(function (a, b, d) { a.$watch(d.ngStyle, function (a, d) { d && a !== d && q(d, function (a, c) { b.css(c, "") }); a && b.css(a) }, !0) }), Ke = ["$animate", "$compile", function (a, b) {
        return {
            require: "ngSwitch", controller: ["$scope", function () { this.cases = {} }],
            link: function (d, c, e, f) {
                var g = [], h = [], k = [], l = [], m = function (a, b) { return function () { a.splice(b, 1) } }; d.$watch(e.ngSwitch || e.on, function (c) {
                    var d, e; d = 0; for (e = k.length; d < e; ++d) a.cancel(k[d]); d = k.length = 0; for (e = l.length; d < e; ++d) { var s = ub(h[d].clone); l[d].$destroy(); (k[d] = a.leave(s)).then(m(k, d)) } h.length = 0; l.length = 0; (g = f.cases["!" + c] || f.cases["?"]) && q(g, function (c) {
                        c.transclude(function (d, e) {
                            l.push(e); var f = c.element; d[d.length++] = b.$$createComment("end ngSwitchWhen"); h.push({ clone: d }); a.enter(d, f.parent(),
                            f)
                        })
                    })
                })
            }
        }
    }], Le = Na({ transclude: "element", priority: 1200, require: "^ngSwitch", multiElement: !0, link: function (a, b, d, c, e) { c.cases["!" + d.ngSwitchWhen] = c.cases["!" + d.ngSwitchWhen] || []; c.cases["!" + d.ngSwitchWhen].push({ transclude: e, element: b }) } }), Me = Na({ transclude: "element", priority: 1200, require: "^ngSwitch", multiElement: !0, link: function (a, b, d, c, e) { c.cases["?"] = c.cases["?"] || []; c.cases["?"].push({ transclude: e, element: b }) } }), Pg = O("ngTransclude"), Oe = Na({
        restrict: "EAC", link: function (a, b, d, c, e) {
            d.ngTransclude ===
            d.$attr.ngTransclude && (d.ngTransclude = ""); if (!e) throw Pg("orphan", wa(b)); e(function (a) { a.length && (b.empty(), b.append(a)) }, null, d.ngTransclude || d.ngTranscludeSlot)
        }
    }), oe = ["$templateCache", function (a) { return { restrict: "E", terminal: !0, compile: function (b, d) { "text/ng-template" == d.type && a.put(d.id, b[0].text) } } }], Qg = { $setViewValue: E, $render: E }, Rg = ["$element", "$scope", function (a, b) {
        var d = this, c = new Ua; d.ngModelCtrl = Qg; d.unknownOption = H(P.createElement("option")); d.renderUnknownOption = function (b) {
            b = "? " + Ha(b) +
            " ?"; d.unknownOption.val(b); a.prepend(d.unknownOption); a.val(b)
        }; b.$on("$destroy", function () { d.renderUnknownOption = E }); d.removeUnknownOption = function () { d.unknownOption.parent() && d.unknownOption.remove() }; d.readValue = function () { d.removeUnknownOption(); return a.val() }; d.writeValue = function (b) { d.hasOption(b) ? (d.removeUnknownOption(), a.val(b), "" === b && d.emptyOption.prop("selected", !0)) : null == b && d.emptyOption ? (d.removeUnknownOption(), a.val("")) : d.renderUnknownOption(b) }; d.addOption = function (a, b) {
            if (8 !==
            b[0].nodeType) { Ta(a, '"option value"'); "" === a && (d.emptyOption = b); var g = c.get(a) || 0; c.put(a, g + 1); d.ngModelCtrl.$render(); b[0].hasAttribute("selected") && (b[0].selected = !0) }
        }; d.removeOption = function (a) { var b = c.get(a); b && (1 === b ? (c.remove(a), "" === a && (d.emptyOption = u)) : c.put(a, b - 1)) }; d.hasOption = function (a) { return !!c.get(a) }; d.registerOption = function (a, b, c, h, k) {
            if (h) { var l; c.$observe("value", function (a) { A(l) && d.removeOption(l); l = a; d.addOption(a, b) }) } else k ? a.$watch(k, function (a, e) {
                c.$set("value", a); e !==
                a && d.removeOption(e); d.addOption(a, b)
            }) : d.addOption(c.value, b); b.on("$destroy", function () { d.removeOption(c.value); d.ngModelCtrl.$render() })
        }
    }], pe = function () {
        return {
            restrict: "E", require: ["select", "?ngModel"], controller: Rg, priority: 1, link: {
                pre: function (a, b, d, c) {
                    var e = c[1]; if (e) {
                        var f = c[0]; f.ngModelCtrl = e; b.on("change", function () { a.$apply(function () { e.$setViewValue(f.readValue()) }) }); if (d.multiple) {
                            f.readValue = function () { var a = []; q(b.find("option"), function (b) { b.selected && a.push(b.value) }); return a };
                            f.writeValue = function (a) { var c = new Ua(a); q(b.find("option"), function (a) { a.selected = A(c.get(a.value)) }) }; var g, h = NaN; a.$watch(function () { h !== e.$viewValue || na(g, e.$viewValue) || (g = ia(e.$viewValue), e.$render()); h = e.$viewValue }); e.$isEmpty = function (a) { return !a || 0 === a.length }
                        }
                    }
                }, post: function (a, b, d, c) { var e = c[1]; if (e) { var f = c[0]; e.$render = function () { f.writeValue(e.$viewValue) } } }
            }
        }
    }, re = ["$interpolate", function (a) {
        return {
            restrict: "E", priority: 100, compile: function (b, d) {
                if (A(d.value)) var c = a(d.value, !0); else {
                    var e =
                    a(b.text(), !0); e || d.$set("value", b.text())
                } return function (a, b, d) { var k = b.parent(); (k = k.data("$selectController") || k.parent().data("$selectController")) && k.registerOption(a, b, d, c, e) }
            }
        }
    }], qe = da({ restrict: "E", terminal: !1 }), Fc = function () { return { restrict: "A", require: "?ngModel", link: function (a, b, d, c) { c && (d.required = !0, c.$validators.required = function (a, b) { return !d.required || !c.$isEmpty(b) }, d.$observe("required", function () { c.$validate() })) } } }, Ec = function () {
        return {
            restrict: "A", require: "?ngModel", link: function (a,
            b, d, c) { if (c) { var e, f = d.ngPattern || d.pattern; d.$observe("pattern", function (a) { y(a) && 0 < a.length && (a = new RegExp("^" + a + "$")); if (a && !a.test) throw O("ngPattern")("noregexp", f, a, wa(b)); e = a || u; c.$validate() }); c.$validators.pattern = function (a, b) { return c.$isEmpty(b) || z(e) || e.test(b) } } }
        }
    }, Hc = function () {
        return {
            restrict: "A", require: "?ngModel", link: function (a, b, d, c) {
                if (c) {
                    var e = -1; d.$observe("maxlength", function (a) { a = Y(a); e = isNaN(a) ? -1 : a; c.$validate() }); c.$validators.maxlength = function (a, b) {
                        return 0 > e || c.$isEmpty(b) ||
                        b.length <= e
                    }
                }
            }
        }
    }, Gc = function () { return { restrict: "A", require: "?ngModel", link: function (a, b, d, c) { if (c) { var e = 0; d.$observe("minlength", function (a) { e = Y(a) || 0; c.$validate() }); c.$validators.minlength = function (a, b) { return c.$isEmpty(b) || b.length >= e } } } } }; T.angular.bootstrap ? T.console && console.log("WARNING: Tried to load angular more than once.") : (he(), je(ea), ea.module("ngLocale", [], ["$provide", function (a) {
        function b(a) { a += ""; var b = a.indexOf("."); return -1 == b ? 0 : a.length - b - 1 } a.value("$locale", {
            DATETIME_FORMATS: {
                AMPMS: ["AM",
                "PM"], DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), ERANAMES: ["Before Christ", "Anno Domini"], ERAS: ["BC", "AD"], FIRSTDAYOFWEEK: 6, MONTH: "January February March April May June July August September October November December".split(" "), SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "), SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), STANDALONEMONTH: "January February March April May June July August September October November December".split(" "), WEEKENDRANGE: [5,
                6], fullDate: "EEEE, MMMM d, y", longDate: "MMMM d, y", medium: "MMM d, y h:mm:ss a", mediumDate: "MMM d, y", mediumTime: "h:mm:ss a", "short": "M/d/yy h:mm a", shortDate: "M/d/yy", shortTime: "h:mm a"
            }, NUMBER_FORMATS: { CURRENCY_SYM: "$", DECIMAL_SEP: ".", GROUP_SEP: ",", PATTERNS: [{ gSize: 3, lgSize: 3, maxFrac: 3, minFrac: 0, minInt: 1, negPre: "-", negSuf: "", posPre: "", posSuf: "" }, { gSize: 3, lgSize: 3, maxFrac: 2, minFrac: 2, minInt: 1, negPre: "-\u00a4", negSuf: "", posPre: "\u00a4", posSuf: "" }] }, id: "en-us", localeID: "en_US", pluralCat: function (a,
            c) { var e = a | 0, f = c; u === f && (f = Math.min(b(a), 3)); Math.pow(10, f); return 1 == e && 0 == f ? "one" : "other" }
        })
    }]), H(P).ready(function () { de(P, yc) }))
})(window, document); !window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
//# sourceMappingURL=angular.min.js.map;
/*
 AngularJS v1.5.3
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (x, n, y) {
    'use strict'; function s(f, k) { var e = !1, a = !1; this.ngClickOverrideEnabled = function (b) { return n.isDefined(b) ? (b && !a && (a = !0, t.$$moduleName = "ngTouch", k.directive("ngClick", t), f.decorator("ngClickDirective", ["$delegate", function (a) { if (e) a.shift(); else for (var b = a.length - 1; 0 <= b;) { if ("ngTouch" === a[b].$$moduleName) { a.splice(b, 1); break } b-- } return a }])), e = b, this) : e }; this.$get = function () { return { ngClickOverrideEnabled: function () { return e } } } } function v(f, k, e) {
        p.directive(f, ["$parse", "$swipe", function (a,
        b) { return function (l, u, g) { function h(c) { if (!d) return !1; var a = Math.abs(c.y - d.y); c = (c.x - d.x) * k; return r && 75 > a && 0 < c && 30 < c && .3 > a / c } var m = a(g[f]), d, r, c = ["touch"]; n.isDefined(g.ngSwipeDisableMouse) || c.push("mouse"); b.bind(u, { start: function (c, a) { d = c; r = !0 }, cancel: function (c) { r = !1 }, end: function (c, d) { h(c) && l.$apply(function () { u.triggerHandler(e); m(l, { $event: d }) }) } }, c) } }])
    } var p = n.module("ngTouch", []); p.provider("$touch", s); s.$inject = ["$provide", "$compileProvider"]; p.factory("$swipe", [function () {
        function f(a) {
            a =
            a.originalEvent || a; var b = a.touches && a.touches.length ? a.touches : [a]; a = a.changedTouches && a.changedTouches[0] || b[0]; return { x: a.clientX, y: a.clientY }
        } function k(a, b) { var l = []; n.forEach(a, function (a) { (a = e[a][b]) && l.push(a) }); return l.join(" ") } var e = { mouse: { start: "mousedown", move: "mousemove", end: "mouseup" }, touch: { start: "touchstart", move: "touchmove", end: "touchend", cancel: "touchcancel" } }; return {
            bind: function (a, b, l) {
                var e, g, h, m, d = !1; l = l || ["mouse", "touch"]; a.on(k(l, "start"), function (c) {
                    h = f(c); d = !0; g = e = 0; m =
                    h; b.start && b.start(h, c)
                }); var r = k(l, "cancel"); if (r) a.on(r, function (c) { d = !1; b.cancel && b.cancel(c) }); a.on(k(l, "move"), function (c) { if (d && h) { var a = f(c); e += Math.abs(a.x - m.x); g += Math.abs(a.y - m.y); m = a; 10 > e && 10 > g || (g > e ? (d = !1, b.cancel && b.cancel(c)) : (c.preventDefault(), b.move && b.move(a, c))) } }); a.on(k(l, "end"), function (c) { d && (d = !1, b.end && b.end(f(c), c)) })
            }
        }
    }]); var t = ["$parse", "$timeout", "$rootElement", function (f, k, e) {
        function a(a, d, b) {
            for (var c = 0; c < a.length; c += 2) {
                var g = a[c + 1], e = b; if (25 > Math.abs(a[c] - d) && 25 > Math.abs(g -
                e)) return a.splice(c, c + 2), !0
            } return !1
        } function b(b) { if (!(2500 < Date.now() - u)) { var d = b.touches && b.touches.length ? b.touches : [b], e = d[0].clientX, d = d[0].clientY; if (!(1 > e && 1 > d || h && h[0] === e && h[1] === d)) { h && (h = null); var c = b.target; "label" === n.lowercase(c.nodeName || c[0] && c[0].nodeName) && (h = [e, d]); a(g, e, d) || (b.stopPropagation(), b.preventDefault(), b.target && b.target.blur && b.target.blur()) } } } function l(a) {
            a = a.touches && a.touches.length ? a.touches : [a]; var b = a[0].clientX, e = a[0].clientY; g.push(b, e); k(function () {
                for (var a =
                0; a < g.length; a += 2) if (g[a] == b && g[a + 1] == e) { g.splice(a, a + 2); break }
            }, 2500, !1)
        } var u, g, h; return function (h, d, k) {
            var c = f(k.ngClick), w = !1, q, p, s, t; d.on("touchstart", function (a) { w = !0; q = a.target ? a.target : a.srcElement; 3 == q.nodeType && (q = q.parentNode); d.addClass("ng-click-active"); p = Date.now(); a = a.originalEvent || a; a = (a.touches && a.touches.length ? a.touches : [a])[0]; s = a.clientX; t = a.clientY }); d.on("touchcancel", function (a) { w = !1; d.removeClass("ng-click-active") }); d.on("touchend", function (c) {
                var h = Date.now() - p, f = c.originalEvent ||
                c, m = (f.changedTouches && f.changedTouches.length ? f.changedTouches : f.touches && f.touches.length ? f.touches : [f])[0], f = m.clientX, m = m.clientY, v = Math.sqrt(Math.pow(f - s, 2) + Math.pow(m - t, 2)); w && 750 > h && 12 > v && (g || (e[0].addEventListener("click", b, !0), e[0].addEventListener("touchstart", l, !0), g = []), u = Date.now(), a(g, f, m), q && q.blur(), n.isDefined(k.disabled) && !1 !== k.disabled || d.triggerHandler("click", [c])); w = !1; d.removeClass("ng-click-active")
            }); d.onclick = function (a) { }; d.on("click", function (a, b) {
                h.$apply(function () {
                    c(h,
                    { $event: b || a })
                })
            }); d.on("mousedown", function (a) { d.addClass("ng-click-active") }); d.on("mousemove mouseup", function (a) { d.removeClass("ng-click-active") })
        }
    }]; v("ngSwipeLeft", -1, "swipeleft"); v("ngSwipeRight", 1, "swiperight")
})(window, window.angular);
//# sourceMappingURL=angular-touch.min.js.map;
/*
 AngularJS v1.5.3
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (E, w, Va) {
    'use strict'; function ya(a, b, c) { if (!a) throw Ka("areq", b || "?", c || "required"); return a } function za(a, b) { if (!a && !b) return ""; if (!a) return b; if (!b) return a; ba(a) && (a = a.join(" ")); ba(b) && (b = b.join(" ")); return a + " " + b } function La(a) { var b = {}; a && (a.to || a.from) && (b.to = a.to, b.from = a.from); return b } function V(a, b, c) { var d = ""; a = ba(a) ? a : a && I(a) && a.length ? a.split(/\s+/) : []; q(a, function (a, f) { a && 0 < a.length && (d += 0 < f ? " " : "", d += c ? b + a : a + b) }); return d } function Ma(a) {
        if (a instanceof H) switch (a.length) {
            case 0: return [];
            case 1: if (1 === a[0].nodeType) return a; break; default: return H(ga(a))
        } if (1 === a.nodeType) return H(a)
    } function ga(a) { if (!a[0]) return a; for (var b = 0; b < a.length; b++) { var c = a[b]; if (1 == c.nodeType) return c } } function Na(a, b, c) { q(b, function (b) { a.addClass(b, c) }) } function Oa(a, b, c) { q(b, function (b) { a.removeClass(b, c) }) } function Q(a) { return function (b, c) { c.addClass && (Na(a, b, c.addClass), c.addClass = null); c.removeClass && (Oa(a, b, c.removeClass), c.removeClass = null) } } function oa(a) {
        a = a || {}; if (!a.$$prepared) {
            var b = a.domOperation ||
            O; a.domOperation = function () { a.$$domOperationFired = !0; b(); b = O }; a.$$prepared = !0
        } return a
    } function ha(a, b) { Aa(a, b); Ba(a, b) } function Aa(a, b) { b.from && (a.css(b.from), b.from = null) } function Ba(a, b) { b.to && (a.css(b.to), b.to = null) } function T(a, b, c) {
        var d = b.options || {}; c = c.options || {}; var e = (d.addClass || "") + " " + (c.addClass || ""), f = (d.removeClass || "") + " " + (c.removeClass || ""); a = Pa(a.attr("class"), e, f); c.preparationClasses && (d.preparationClasses = W(c.preparationClasses, d.preparationClasses), delete c.preparationClasses);
        e = d.domOperation !== O ? d.domOperation : null; Ca(d, c); e && (d.domOperation = e); d.addClass = a.addClass ? a.addClass : null; d.removeClass = a.removeClass ? a.removeClass : null; b.addClass = d.addClass; b.removeClass = d.removeClass; return d
    } function Pa(a, b, c) {
        function d(a) { I(a) && (a = a.split(" ")); var b = {}; q(a, function (a) { a.length && (b[a] = !0) }); return b } var e = {}; a = d(a); b = d(b); q(b, function (a, b) { e[b] = 1 }); c = d(c); q(c, function (a, b) { e[b] = 1 === e[b] ? null : -1 }); var f = { addClass: "", removeClass: "" }; q(e, function (b, c) {
            var d, e; 1 === b ? (d = "addClass",
            e = !a[c]) : -1 === b && (d = "removeClass", e = a[c]); e && (f[d].length && (f[d] += " "), f[d] += c)
        }); return f
    } function A(a) { return a instanceof w.element ? a[0] : a } function Qa(a, b, c) { var d = ""; b && (d = V(b, "ng-", !0)); c.addClass && (d = W(d, V(c.addClass, "-add"))); c.removeClass && (d = W(d, V(c.removeClass, "-remove"))); d.length && (c.preparationClasses = d, a.addClass(d)) } function pa(a, b) { var c = b ? "-" + b + "s" : ""; la(a, [ma, c]); return [ma, c] } function ra(a, b) { var c = b ? "paused" : "", d = X + "PlayState"; la(a, [d, c]); return [d, c] } function la(a, b) {
        a.style[b[0]] =
        b[1]
    } function W(a, b) { return a ? b ? a + " " + b : a : b } function Da(a, b, c) { var d = Object.create(null), e = a.getComputedStyle(b) || {}; q(c, function (a, b) { var c = e[a]; if (c) { var F = c.charAt(0); if ("-" === F || "+" === F || 0 <= F) c = Ra(c); 0 === c && (c = null); d[b] = c } }); return d } function Ra(a) { var b = 0; a = a.split(/\s*,\s*/); q(a, function (a) { "s" == a.charAt(a.length - 1) && (a = a.substring(0, a.length - 1)); a = parseFloat(a) || 0; b = b ? Math.max(a, b) : a }); return b } function sa(a) { return 0 === a || null != a } function Ea(a, b) {
        var c = R, d = a + "s"; b ? c += "Duration" : d += " linear all";
        return [c, d]
    } function Fa() { var a = Object.create(null); return { flush: function () { a = Object.create(null) }, count: function (b) { return (b = a[b]) ? b.total : 0 }, get: function (b) { return (b = a[b]) && b.value }, put: function (b, c) { a[b] ? a[b].total++ : a[b] = { total: 1, value: c } } } } function Ga(a, b, c) { q(c, function (c) { a[c] = Y(a[c]) ? a[c] : b.style.getPropertyValue(c) }) } var O = w.noop, Ha = w.copy, Ca = w.extend, H = w.element, q = w.forEach, ba = w.isArray, I = w.isString, ca = w.isObject, N = w.isUndefined, Y = w.isDefined, Ia = w.isFunction, ta = w.isElement, R, ua, X, va; N(E.ontransitionend) &&
    Y(E.onwebkittransitionend) ? (R = "WebkitTransition", ua = "webkitTransitionEnd transitionend") : (R = "transition", ua = "transitionend"); N(E.onanimationend) && Y(E.onwebkitanimationend) ? (X = "WebkitAnimation", va = "webkitAnimationEnd animationend") : (X = "animation", va = "animationend"); var qa = X + "Delay", wa = X + "Duration", ma = R + "Delay"; E = R + "Duration"; var Ka = w.$$minErr("ng"), Sa = { transitionDuration: E, transitionDelay: ma, transitionProperty: R + "Property", animationDuration: wa, animationDelay: qa, animationIterationCount: X + "IterationCount" },
    Ta = { transitionDuration: E, transitionDelay: ma, animationDuration: wa, animationDelay: qa }; w.module("ngAnimate", []).directive("ngAnimateSwap", ["$animate", "$rootScope", function (a, b) { return { restrict: "A", transclude: "element", terminal: !0, priority: 600, link: function (b, d, e, f, r) { var x, F; b.$watchCollection(e.ngAnimateSwap || e["for"], function (e) { x && a.leave(x); F && (F.$destroy(), F = null); if (e || 0 === e) F = b.$new(), r(F, function (b) { x = b; a.enter(b, null, d) }) }) } } }]).directive("ngAnimateChildren", ["$interpolate", function (a) {
        return {
            link: function (b,
            c, d) { function e(a) { c.data("$$ngAnimateChildren", "on" === a || "true" === a) } var f = d.ngAnimateChildren; w.isString(f) && 0 === f.length ? c.data("$$ngAnimateChildren", !0) : (e(a(f)(b)), d.$observe("ngAnimateChildren", e)) }
        }
    }]).factory("$$rAFScheduler", ["$$rAF", function (a) { function b(a) { d = d.concat(a); c() } function c() { if (d.length) { for (var b = d.shift(), r = 0; r < b.length; r++) b[r](); e || a(function () { e || c() }) } } var d, e; d = b.queue = []; b.waitUntilQuiet = function (b) { e && e(); e = a(function () { e = null; b(); c() }) }; return b }]).provider("$$animateQueue",
    ["$animateProvider", function (a) {
        function b(a) { if (!a) return null; a = a.split(" "); var b = Object.create(null); q(a, function (a) { b[a] = !0 }); return b } function c(a, c) { if (a && c) { var d = b(c); return a.split(" ").some(function (a) { return d[a] }) } } function d(a, b, c, d) { return f[a].some(function (a) { return a(b, c, d) }) } function e(a, b) { var c = 0 < (a.addClass || "").length, d = 0 < (a.removeClass || "").length; return b ? c && d : c || d } var f = this.rules = { skip: [], cancel: [], join: [] }; f.join.push(function (a, b, c) { return !b.structural && e(b) }); f.skip.push(function (a,
        b, c) { return !b.structural && !e(b) }); f.skip.push(function (a, b, c) { return "leave" == c.event && b.structural }); f.skip.push(function (a, b, c) { return c.structural && 2 === c.state && !b.structural }); f.cancel.push(function (a, b, c) { return c.structural && b.structural }); f.cancel.push(function (a, b, c) { return 2 === c.state && b.structural }); f.cancel.push(function (a, b, d) { if (d.structural) return !1; a = b.addClass; b = b.removeClass; var e = d.addClass; d = d.removeClass; return N(a) && N(b) || N(e) && N(d) ? !1 : c(a, d) || c(b, e) }); this.$get = ["$$rAF", "$rootScope",
        "$rootElement", "$document", "$$HashMap", "$$animation", "$$AnimateRunner", "$templateRequest", "$$jqLite", "$$forceReflow", function (b, c, f, u, l, w, s, M, v, h) {
            function P() { var a = !1; return function (b) { a ? b() : c.$$postDigest(function () { a = !0; b() }) } } function y(a, b, c) { var g = A(b), d = A(a), k = []; (a = G[c]) && q(a, function (a) { t.call(a.node, g) ? k.push(a.callback) : "leave" === c && t.call(a.node, d) && k.push(a.callback) }); return k } function k(a, g, k) {
                function m(c, g, d, k) {
                    F(function () {
                        var c = y(J, a, g); c.length && b(function () {
                            q(c, function (b) {
                                b(a,
                                d, k)
                            })
                        })
                    }); c.progress(g, d, k)
                } function G(b) { var c = a, g = h; g.preparationClasses && (c.removeClass(g.preparationClasses), g.preparationClasses = null); g.activeClasses && (c.removeClass(g.activeClasses), g.activeClasses = null); Ja(a, h); ha(a, h); h.domOperation(); f.complete(!b) } var h = Ha(k), t, J; if (a = Ma(a)) t = A(a), J = a.parent(); var h = oa(h), f = new s, F = P(); ba(h.addClass) && (h.addClass = h.addClass.join(" ")); h.addClass && !I(h.addClass) && (h.addClass = null); ba(h.removeClass) && (h.removeClass = h.removeClass.join(" ")); h.removeClass &&
                !I(h.removeClass) && (h.removeClass = null); h.from && !ca(h.from) && (h.from = null); h.to && !ca(h.to) && (h.to = null); if (!t) return G(), f; k = [t.className, h.addClass, h.removeClass].join(" "); if (!Ua(k)) return G(), f; var v = 0 <= ["enter", "move", "leave"].indexOf(g), l = !K || u[0].hidden || C.get(t); k = !l && z.get(t) || {}; var Z = !!k.state; l || Z && 1 == k.state || (l = !n(a, J, g)); if (l) return G(), f; v && xa(a); l = { structural: v, element: a, event: g, addClass: h.addClass, removeClass: h.removeClass, close: G, options: h, runner: f }; if (Z) {
                    if (d("skip", a, l, k)) {
                        if (2 ===
                        k.state) return G(), f; T(a, k, l); return k.runner
                    } if (d("cancel", a, l, k)) if (2 === k.state) k.runner.end(); else if (k.structural) k.close(); else return T(a, k, l), k.runner; else if (d("join", a, l, k)) if (2 === k.state) T(a, l, {}); else return Qa(a, v ? g : null, h), g = l.event = k.event, h = T(a, k, l), k.runner
                } else T(a, l, {}); (Z = l.structural) || (Z = "animate" === l.event && 0 < Object.keys(l.options.to || {}).length || e(l)); if (!Z) return G(), ka(a), f; var M = (k.counter || 0) + 1; l.counter = M; D(a, 1, l); c.$$postDigest(function () {
                    var b = z.get(t), c = !b, b = b || {}, d =
                    0 < (a.parent() || []).length && ("animate" === b.event || b.structural || e(b)); if (c || b.counter !== M || !d) { c && (Ja(a, h), ha(a, h)); if (c || v && b.event !== g) h.domOperation(), f.end(); d || ka(a) } else g = !b.structural && e(b, !0) ? "setClass" : b.event, D(a, 2), b = w(a, g, b.options), b.done(function (b) { G(!b); (b = z.get(t)) && b.counter === M && ka(A(a)); m(f, g, "close", {}) }), f.setHost(b), m(f, g, "start", {})
                }); return f
            } function xa(a) {
                a = A(a).querySelectorAll("[data-ng-animate]"); q(a, function (a) {
                    var b = parseInt(a.getAttribute("data-ng-animate")), c = z.get(a);
                    if (c) switch (b) { case 2: c.runner.end(); case 1: z.remove(a) }
                })
            } function ka(a) { a = A(a); a.removeAttribute("data-ng-animate"); z.remove(a) } function J(a, b) { return A(a) === A(b) } function n(a, b, c) {
                c = H(u[0].body); var g = J(a, c) || "HTML" === a[0].nodeName, d = J(a, f), k = !1, h, m = C.get(A(a)); (a = H.data(a[0], "$ngAnimatePin")) && (b = a); for (b = A(b) ; b;) {
                    d || (d = J(b, f)); if (1 !== b.nodeType) break; a = z.get(b) || {}; if (!k) { var e = C.get(b); if (!0 === e && !1 !== m) { m = !0; break } else !1 === e && (m = !1); k = a.structural } if (N(h) || !0 === h) a = H.data(b, "$$ngAnimateChildren"),
                    Y(a) && (h = a); if (k && !1 === h) break; g || (g = J(b, c)); if (g && d) break; if (!d && (a = H.data(b, "$ngAnimatePin"))) { b = A(a); continue } b = b.parentNode
                } return (!k || h) && !0 !== m && d && g
            } function D(a, b, c) { c = c || {}; c.state = b; a = A(a); a.setAttribute("data-ng-animate", b); c = (b = z.get(a)) ? Ca(b, c) : c; z.put(a, c) } var z = new l, C = new l, K = null, g = c.$watch(function () { return 0 === M.totalPendingRequests }, function (a) { a && (g(), c.$$postDigest(function () { c.$$postDigest(function () { null === K && (K = !0) }) })) }), G = {}, m = a.classNameFilter(), Ua = m ? function (a) { return m.test(a) } :
            function () { return !0 }, Ja = Q(v), t = Node.prototype.contains || function (a) { return this === a || !!(this.compareDocumentPosition(a) & 16) }, Z = {
                on: function (a, b, c) { var g = ga(b); G[a] = G[a] || []; G[a].push({ node: g, callback: c }); H(b).on("$destroy", function () { Z.off(a, b, c) }) }, off: function (a, b, c) { function g(a, b, c) { var d = ga(b); return a.filter(function (a) { return !(a.node === d && (!c || a.callback === c)) }) } var d = G[a]; d && (G[a] = 1 === arguments.length ? null : g(d, b, c)) }, pin: function (a, b) {
                    ya(ta(a), "element", "not an element"); ya(ta(b), "parentElement",
                    "not an element"); a.data("$ngAnimatePin", b)
                }, push: function (a, b, c, g) { c = c || {}; c.domOperation = g; return k(a, b, c) }, enabled: function (a, b) { var c = arguments.length; if (0 === c) b = !!K; else if (ta(a)) { var g = A(a), d = C.get(g); 1 === c ? b = !d : C.put(g, !b) } else b = K = !!a; return b }
            }; return Z
        }]
    }]).provider("$$animation", ["$animateProvider", function (a) {
        function b(a) { return a.data("$$animationRunner") } var c = this.drivers = []; this.$get = ["$$jqLite", "$rootScope", "$injector", "$$AnimateRunner", "$$HashMap", "$$rAFScheduler", function (a, e,
        f, r, x, F) {
            function u(a) {
                function b(a) { if (a.processed) return a; a.processed = !0; var d = a.domNode, h = d.parentNode; e.put(d, a); for (var f; h;) { if (f = e.get(h)) { f.processed || (f = b(f)); break } h = h.parentNode } (f || c).children.push(a); return a } var c = { children: [] }, d, e = new x; for (d = 0; d < a.length; d++) { var f = a[d]; e.put(f.domNode, a[d] = { domNode: f.domNode, fn: f.fn, children: [] }) } for (d = 0; d < a.length; d++) b(a[d]); return function (a) {
                    var b = [], c = [], d; for (d = 0; d < a.children.length; d++) c.push(a.children[d]); a = c.length; var h = 0, e = []; for (d = 0; d <
                    c.length; d++) { var f = c[d]; 0 >= a && (a = h, h = 0, b.push(e), e = []); e.push(f.fn); f.children.forEach(function (a) { h++; c.push(a) }); a-- } e.length && b.push(e); return b
                }(c)
            } var l = [], w = Q(a); return function (s, x, v) {
                function h(a) { a = a.hasAttribute("ng-animate-ref") ? [a] : a.querySelectorAll("[ng-animate-ref]"); var b = []; q(a, function (a) { var c = a.getAttribute("ng-animate-ref"); c && c.length && b.push(a) }); return b } function P(a) {
                    var b = [], c = {}; q(a, function (a, g) {
                        var d = A(a.element), k = 0 <= ["enter", "move"].indexOf(a.event), d = a.structural ?
                        h(d) : []; if (d.length) { var e = k ? "to" : "from"; q(d, function (a) { var b = a.getAttribute("ng-animate-ref"); c[b] = c[b] || {}; c[b][e] = { animationID: g, element: H(a) } }) } else b.push(a)
                    }); var d = {}, k = {}; q(c, function (c, h) {
                        var e = c.from, f = c.to; if (e && f) {
                            var m = a[e.animationID], C = a[f.animationID], n = e.animationID.toString(); if (!k[n]) {
                                var D = k[n] = { structural: !0, beforeStart: function () { m.beforeStart(); C.beforeStart() }, close: function () { m.close(); C.close() }, classes: y(m.classes, C.classes), from: m, to: C, anchors: [] }; D.classes.length ? b.push(D) :
                                (b.push(m), b.push(C))
                            } k[n].anchors.push({ out: e.element, "in": f.element })
                        } else e = e ? e.animationID : f.animationID, f = e.toString(), d[f] || (d[f] = !0, b.push(a[e]))
                    }); return b
                } function y(a, b) { a = a.split(" "); b = b.split(" "); for (var c = [], d = 0; d < a.length; d++) { var k = a[d]; if ("ng-" !== k.substring(0, 3)) for (var e = 0; e < b.length; e++) if (k === b[e]) { c.push(k); break } } return c.join(" ") } function k(a) { for (var b = c.length - 1; 0 <= b; b--) { var d = c[b]; if (f.has(d) && (d = f.get(d)(a))) return d } } function xa(a, c) {
                    a.from && a.to ? (b(a.from.element).setHost(c),
                    b(a.to.element).setHost(c)) : b(a.element).setHost(c)
                } function ka() { var a = b(s); !a || "leave" === x && v.$$domOperationFired || a.end() } function J(b) { s.off("$destroy", ka); s.removeData("$$animationRunner"); w(s, v); ha(s, v); v.domOperation(); C && a.removeClass(s, C); s.removeClass("ng-animate"); D.complete(!b) } v = oa(v); var n = 0 <= ["enter", "move", "leave"].indexOf(x), D = new r({ end: function () { J() }, cancel: function () { J(!0) } }); if (!c.length) return J(), D; s.data("$$animationRunner", D); var z = za(s.attr("class"), za(v.addClass, v.removeClass)),
                C = v.tempClasses; C && (z += " " + C, v.tempClasses = null); var K; n && (K = "ng-" + x + "-prepare", a.addClass(s, K)); l.push({ element: s, classes: z, event: x, structural: n, options: v, beforeStart: function () { s.addClass("ng-animate"); C && a.addClass(s, C); K && (a.removeClass(s, K), K = null) }, close: J }); s.on("$destroy", ka); if (1 < l.length) return D; e.$$postDigest(function () {
                    var a = []; q(l, function (c) { b(c.element) ? a.push(c) : c.close() }); l.length = 0; var c = P(a), d = []; q(c, function (a) {
                        d.push({
                            domNode: A(a.from ? a.from.element : a.element), fn: function () {
                                a.beforeStart();
                                var c, d = a.close; if (b(a.anchors ? a.from.element || a.to.element : a.element)) { var g = k(a); g && (c = g.start) } c ? (c = c(), c.done(function (a) { d(!a) }), xa(a, c)) : d()
                            }
                        })
                    }); F(u(d))
                }); return D
            }
        }]
    }]).provider("$animateCss", ["$animateProvider", function (a) {
        var b = Fa(), c = Fa(); this.$get = ["$window", "$$jqLite", "$$AnimateRunner", "$timeout", "$$forceReflow", "$sniffer", "$$rAFScheduler", "$$animateQueue", function (a, e, f, r, x, F, u, l) {
            function w(a, b) {
                var c = a.parentNode; return (c.$$ngAnimateParentKey || (c.$$ngAnimateParentKey = ++P)) + "-" + a.getAttribute("class") +
                "-" + b
            } function s(k, h, f, l) { var n; 0 < b.count(f) && (n = c.get(f), n || (h = V(h, "-stagger"), e.addClass(k, h), n = Da(a, k, l), n.animationDuration = Math.max(n.animationDuration, 0), n.transitionDuration = Math.max(n.transitionDuration, 0), e.removeClass(k, h), c.put(f, n))); return n || {} } function M(a) { y.push(a); u.waitUntilQuiet(function () { b.flush(); c.flush(); for (var a = x(), d = 0; d < y.length; d++) y[d](a); y.length = 0 }) } function v(c, h, e) {
                h = b.get(e); h || (h = Da(a, c, Sa), "infinite" === h.animationIterationCount && (h.animationIterationCount = 1));
                b.put(e, h); c = h; e = c.animationDelay; h = c.transitionDelay; c.maxDelay = e && h ? Math.max(e, h) : e || h; c.maxDuration = Math.max(c.animationDuration * c.animationIterationCount, c.transitionDuration); return c
            } var h = Q(e), P = 0, y = []; return function (a, c) {
                function d() { n() } function u() { n(!0) } function n(b) {
                    if (!(P || H && da)) {
                        P = !0; da = !1; g.$$skipPreparationClasses || e.removeClass(a, fa); e.removeClass(a, ga); ra(m, !1); pa(m, !1); q(y, function (a) { m.style[a[0]] = "" }); h(a, g); ha(a, g); Object.keys(G).length && q(G, function (a, b) {
                            a ? m.style.setProperty(b,
                            a) : m.style.removeProperty(b)
                        }); if (g.onDone) g.onDone(); ea && ea.length && a.off(ea.join(" "), C); var c = a.data("$$animateCss"); c && (r.cancel(c[0].timer), a.removeData("$$animateCss")); E && E.complete(!b)
                    }
                } function D(a) { p.blockTransition && pa(m, a); p.blockKeyframeAnimation && ra(m, !!a) } function z() { E = new f({ end: d, cancel: u }); M(O); n(); return { $$willAnimate: !1, start: function () { return E }, end: d } } function C(a) {
                    a.stopPropagation(); var b = a.originalEvent || a; a = b.$manualTimeStamp || Date.now(); b = parseFloat(b.elapsedTime.toFixed(3));
                    Math.max(a - W, 0) >= Q && b >= L && (H = !0, n())
                } function K() {
                    function b() {
                        if (!P) {
                            D(!1); q(y, function (a) { m.style[a[0]] = a[1] }); h(a, g); e.addClass(a, ga); if (p.recalculateTimingStyles) { na = m.className + " " + fa; ia = w(m, na); B = v(m, na, ia); $ = B.maxDelay; I = Math.max($, 0); L = B.maxDuration; if (0 === L) { n(); return } p.hasTransitions = 0 < B.transitionDuration; p.hasAnimations = 0 < B.animationDuration } p.applyAnimationDelay && ($ = "boolean" !== typeof g.delay && sa(g.delay) ? parseFloat(g.delay) : $, I = Math.max($, 0), B.animationDelay = $, aa = [qa, $ + "s"], y.push(aa),
                            m.style[aa[0]] = aa[1]); Q = 1E3 * I; T = 1E3 * L; if (g.easing) { var d, f = g.easing; p.hasTransitions && (d = R + "TimingFunction", y.push([d, f]), m.style[d] = f); p.hasAnimations && (d = X + "TimingFunction", y.push([d, f]), m.style[d] = f) } B.transitionDuration && ea.push(ua); B.animationDuration && ea.push(va); W = Date.now(); var l = Q + 1.5 * T; d = W + l; var f = a.data("$$animateCss") || [], K = !0; if (f.length) { var z = f[0]; (K = d > z.expectedEndTime) ? r.cancel(z.timer) : f.push(n) } K && (l = r(c, l, !1), f[0] = { timer: l, expectedEndTime: d }, f.push(n), a.data("$$animateCss", f));
                            if (ea.length) a.on(ea.join(" "), C); g.to && (g.cleanupStyles && Ga(G, m, Object.keys(g.to)), Ba(a, g))
                        }
                    } function c() { var b = a.data("$$animateCss"); if (b) { for (var d = 1; d < b.length; d++) b[d](); a.removeData("$$animateCss") } } if (!P) if (m.parentNode) {
                        var d = function (a) { if (H) da && a && (da = !1, n()); else if (da = !a, B.animationDuration) if (a = ra(m, da), da) y.push(a); else { var b = y, c = b.indexOf(a); 0 <= a && b.splice(c, 1) } }, f = 0 < ca && (B.transitionDuration && 0 === U.transitionDuration || B.animationDuration && 0 === U.animationDuration) && Math.max(U.animationDelay,
                        U.transitionDelay); f ? r(b, Math.floor(f * ca * 1E3), !1) : b(); N.resume = function () { d(!0) }; N.pause = function () { d(!1) }
                    } else n()
                } var g = c || {}; g.$$prepared || (g = oa(Ha(g))); var G = {}, m = A(a); if (!m || !m.parentNode || !l.enabled()) return z(); var y = [], x = a.attr("class"), t = La(g), P, da, H, E, N, I, Q, L, T, W, ea = []; if (0 === g.duration || !F.animations && !F.transitions) return z(); var ja = g.event && ba(g.event) ? g.event.join(" ") : g.event, Y = "", S = ""; ja && g.structural ? Y = V(ja, "ng-", !0) : ja && (Y = ja); g.addClass && (S += V(g.addClass, "-add")); g.removeClass &&
                (S.length && (S += " "), S += V(g.removeClass, "-remove")); g.applyClassesEarly && S.length && h(a, g); var fa = [Y, S].join(" ").trim(), na = x + " " + fa, ga = V(fa, "-active"), x = t.to && 0 < Object.keys(t.to).length; if (!(0 < (g.keyframeStyle || "").length || x || fa)) return z(); var ia, U; 0 < g.stagger ? (t = parseFloat(g.stagger), U = { transitionDelay: t, animationDelay: t, transitionDuration: 0, animationDuration: 0 }) : (ia = w(m, na), U = s(m, fa, ia, Ta)); g.$$skipPreparationClasses || e.addClass(a, fa); g.transitionStyle && (t = [R, g.transitionStyle], la(m, t), y.push(t));
                0 <= g.duration && (t = 0 < m.style[R].length, t = Ea(g.duration, t), la(m, t), y.push(t)); g.keyframeStyle && (t = [X, g.keyframeStyle], la(m, t), y.push(t)); var ca = U ? 0 <= g.staggerIndex ? g.staggerIndex : b.count(ia) : 0; (ja = 0 === ca) && !g.skipBlocking && pa(m, 9999); var B = v(m, na, ia), $ = B.maxDelay; I = Math.max($, 0); L = B.maxDuration; var p = {}; p.hasTransitions = 0 < B.transitionDuration; p.hasAnimations = 0 < B.animationDuration; p.hasTransitionAll = p.hasTransitions && "all" == B.transitionProperty; p.applyTransitionDuration = x && (p.hasTransitions && !p.hasTransitionAll ||
                p.hasAnimations && !p.hasTransitions); p.applyAnimationDuration = g.duration && p.hasAnimations; p.applyTransitionDelay = sa(g.delay) && (p.applyTransitionDuration || p.hasTransitions); p.applyAnimationDelay = sa(g.delay) && p.hasAnimations; p.recalculateTimingStyles = 0 < S.length; if (p.applyTransitionDuration || p.applyAnimationDuration) L = g.duration ? parseFloat(g.duration) : L, p.applyTransitionDuration && (p.hasTransitions = !0, B.transitionDuration = L, t = 0 < m.style[R + "Property"].length, y.push(Ea(L, t))), p.applyAnimationDuration && (p.hasAnimations =
                !0, B.animationDuration = L, y.push([wa, L + "s"])); if (0 === L && !p.recalculateTimingStyles) return z(); if (null != g.delay) { var aa; "boolean" !== typeof g.delay && (aa = parseFloat(g.delay), I = Math.max(aa, 0)); p.applyTransitionDelay && y.push([ma, aa + "s"]); p.applyAnimationDelay && y.push([qa, aa + "s"]) } null == g.duration && 0 < B.transitionDuration && (p.recalculateTimingStyles = p.recalculateTimingStyles || ja); Q = 1E3 * I; T = 1E3 * L; g.skipBlocking || (p.blockTransition = 0 < B.transitionDuration, p.blockKeyframeAnimation = 0 < B.animationDuration && 0 < U.animationDelay &&
                0 === U.animationDuration); g.from && (g.cleanupStyles && Ga(G, m, Object.keys(g.from)), Aa(a, g)); p.blockTransition || p.blockKeyframeAnimation ? D(L) : g.skipBlocking || pa(m, !1); return { $$willAnimate: !0, end: d, start: function () { if (!P) return N = { end: d, cancel: u, resume: null, pause: null }, E = new f(N), M(K), E } }
            }
        }]
    }]).provider("$$animateCssDriver", ["$$animationProvider", function (a) {
        a.drivers.push("$$animateCssDriver"); this.$get = ["$animateCss", "$rootScope", "$$AnimateRunner", "$rootElement", "$sniffer", "$$jqLite", "$document", function (a,
        c, d, e, f, r, x) {
            function F(a) { return a.replace(/\bng-\S+\b/g, "") } function u(a, b) { I(a) && (a = a.split(" ")); I(b) && (b = b.split(" ")); return a.filter(function (a) { return -1 === b.indexOf(a) }).join(" ") } function l(c, e, f) {
                function k(a) { var b = {}, c = A(a).getBoundingClientRect(); q(["width", "height", "top", "left"], function (a) { var d = c[a]; switch (a) { case "top": d += M.scrollTop; break; case "left": d += M.scrollLeft } b[a] = Math.floor(d) + "px" }); return b } function l() {
                    var c = F(f.attr("class") || ""), d = u(c, n), c = u(n, c), d = a(r, {
                        to: k(f), addClass: "ng-anchor-in " +
                        d, removeClass: "ng-anchor-out " + c, delay: !0
                    }); return d.$$willAnimate ? d : null
                } function x() { r.remove(); e.removeClass("ng-animate-shim"); f.removeClass("ng-animate-shim") } var r = H(A(e).cloneNode(!0)), n = F(r.attr("class") || ""); e.addClass("ng-animate-shim"); f.addClass("ng-animate-shim"); r.addClass("ng-anchor"); v.append(r); var D; c = function () { var c = a(r, { addClass: "ng-anchor-out", delay: !0, from: k(e) }); return c.$$willAnimate ? c : null }(); if (!c && (D = l(), !D)) return x(); var z = c || D; return {
                    start: function () {
                        function a() {
                            c &&
                            c.end()
                        } var b, c = z.start(); c.done(function () { c = null; if (!D && (D = l())) return c = D.start(), c.done(function () { c = null; x(); b.complete() }), c; x(); b.complete() }); return b = new d({ end: a, cancel: a })
                    }
                }
            } function w(a, b, c, e) {
                var f = s(a, O), r = s(b, O), x = []; q(e, function (a) { (a = l(c, a.out, a["in"])) && x.push(a) }); if (f || r || 0 !== x.length) return {
                    start: function () {
                        function a() { q(b, function (a) { a.end() }) } var b = []; f && b.push(f.start()); r && b.push(r.start()); q(x, function (a) { b.push(a.start()) }); var c = new d({ end: a, cancel: a }); d.all(b, function (a) { c.complete(a) });
                        return c
                    }
                }
            } function s(c) { var d = c.element, e = c.options || {}; c.structural && (e.event = c.event, e.structural = !0, e.applyClassesEarly = !0, "leave" === c.event && (e.onDone = e.domOperation)); e.preparationClasses && (e.event = W(e.event, e.preparationClasses)); c = a(d, e); return c.$$willAnimate ? c : null } if (!f.animations && !f.transitions) return O; var M = x[0].body; c = A(e); var v = H(c.parentNode && 11 === c.parentNode.nodeType || M.contains(c) ? c : M); Q(r); return function (a) { return a.from && a.to ? w(a.from, a.to, a.classes, a.anchors) : s(a) }
        }]
    }]).provider("$$animateJs",
    ["$animateProvider", function (a) {
        this.$get = ["$injector", "$$AnimateRunner", "$$jqLite", function (b, c, d) {
            function e(c) { c = ba(c) ? c : c.split(" "); for (var d = [], e = {}, f = 0; f < c.length; f++) { var l = c[f], q = a.$$registeredAnimations[l]; q && !e[l] && (d.push(b.get(q)), e[l] = !0) } return d } var f = Q(d); return function (a, b, d, u) {
                function l() { u.domOperation(); f(a, u) } function w(a, b, d, e, g) {
                    switch (d) {
                        case "animate": b = [b, e.from, e.to, g]; break; case "setClass": b = [b, h, H, g]; break; case "addClass": b = [b, h, g]; break; case "removeClass": b = [b, H, g];
                            break; default: b = [b, g]
                    } b.push(e); if (a = a.apply(a, b)) if (Ia(a.start) && (a = a.start()), a instanceof c) a.done(g); else if (Ia(a)) return a; return O
                } function s(a, b, d, e, g) { var f = []; q(e, function (e) { var h = e[g]; h && f.push(function () { var e, g, f = !1, k = function (a) { f || (f = !0, (g || O)(a), e.complete(!a)) }; e = new c({ end: function () { k() }, cancel: function () { k(!0) } }); g = w(h, a, b, d, function (a) { k(!1 === a) }); return e }) }); return f } function A(a, b, d, e, g) {
                    var f = s(a, b, d, e, g); if (0 === f.length) {
                        var h, k; "beforeSetClass" === g ? (h = s(a, "removeClass",
                        d, e, "beforeRemoveClass"), k = s(a, "addClass", d, e, "beforeAddClass")) : "setClass" === g && (h = s(a, "removeClass", d, e, "removeClass"), k = s(a, "addClass", d, e, "addClass")); h && (f = f.concat(h)); k && (f = f.concat(k))
                    } if (0 !== f.length) return function (a) { var b = []; f.length && q(f, function (a) { b.push(a()) }); b.length ? c.all(b, a) : a(); return function (a) { q(b, function (b) { a ? b.cancel() : b.end() }) } }
                } var v = !1; 3 === arguments.length && ca(d) && (u = d, d = null); u = oa(u); d || (d = a.attr("class") || "", u.addClass && (d += " " + u.addClass), u.removeClass && (d += " " +
                u.removeClass)); var h = u.addClass, H = u.removeClass, y = e(d), k, E; if (y.length) { var I, J; "leave" == b ? (J = "leave", I = "afterLeave") : (J = "before" + b.charAt(0).toUpperCase() + b.substr(1), I = b); "enter" !== b && "move" !== b && (k = A(a, b, u, y, J)); E = A(a, b, u, y, I) } if (k || E) {
                    var n; return {
                        $$willAnimate: !0, end: function () { n ? n.end() : (v = !0, l(), ha(a, u), n = new c, n.complete(!0)); return n }, start: function () {
                            function b(c) { v = !0; l(); ha(a, u); n.complete(c) } if (n) return n; n = new c; var d, e = []; k && e.push(function (a) { d = k(a) }); e.length ? e.push(function (a) {
                                l();
                                a(!0)
                            }) : l(); E && e.push(function (a) { d = E(a) }); n.setHost({ end: function () { v || ((d || O)(void 0), b(void 0)) }, cancel: function () { v || ((d || O)(!0), b(!0)) } }); c.chain(e, b); return n
                        }
                    }
                }
            }
        }]
    }]).provider("$$animateJsDriver", ["$$animationProvider", function (a) {
        a.drivers.push("$$animateJsDriver"); this.$get = ["$$animateJs", "$$AnimateRunner", function (a, c) {
            function d(c) { return a(c.element, c.event, c.classes, c.options) } return function (a) {
                if (a.from && a.to) {
                    var b = d(a.from), r = d(a.to); if (b || r) return {
                        start: function () {
                            function a() {
                                return function () {
                                    q(d,
                                    function (a) { a.end() })
                                }
                            } var d = []; b && d.push(b.start()); r && d.push(r.start()); c.all(d, function (a) { e.complete(a) }); var e = new c({ end: a(), cancel: a() }); return e
                        }
                    }
                } else return d(a)
            }
        }]
    }])
})(window, window.angular);
//# sourceMappingURL=angular-animate.min.js.map;
(function(e){var i;e.module("ui.materialize",["ui.materialize.ngModel","ui.materialize.collapsible","ui.materialize.toast","ui.materialize.sidenav","ui.materialize.material_select","ui.materialize.dropdown","ui.materialize.inputfield","ui.materialize.input_date","ui.materialize.tabs","ui.materialize.pagination","ui.materialize.pushpin","ui.materialize.scrollspy","ui.materialize.parallax","ui.materialize.modal","ui.materialize.tooltipped","ui.materialize.slider","ui.materialize.materialboxed","ui.materialize.scrollFire","ui.materialize.nouislider","ui.materialize.input_clock","ui.materialize.carousel"]);e.module("ui.materialize.scrollFire",[]).directive("scrollFire",["$compile","$timeout",function(i,n){return{restrict:"A",scope:{offset:"@",scrollFire:"&"},link:function(i,n,a){var o=i.offset;if(!e.isDefined(i.offset)){o=0}o=Number(o)||0;var r=false;var l=t(function(){if(r){return}var e=window.pageYOffset+window.innerHeight;var t=n[0].getBoundingClientRect().top+window.pageYOffset;if(e>t+o){r=true;i.scrollFire({});s()}},100);function s(){$(window).off("scroll resize blur focus",l)}$(window).on("scroll resize blur focus",l);l();i.$on("$destroy",s)}}}]);function t(e,i){var t,n,a,o;var r=0;var l=function(){r=+new Date;t=null;o=e.apply(n,a);if(!t)n=a=null};var s=function(){var s=+new Date;var u=i-(s-r);n=this;a=arguments;if(u<=0||u>i){if(t){clearTimeout(t);t=null}r=s;o=e.apply(n,a);if(!t)n=a=null}else if(!t){t=setTimeout(l,u)}return o};s.cancel=function(){clearTimeout(t);r=0;t=n=a=null};return s}e.module("ui.materialize.ngModel",[]).directive("ngModel",["$timeout",function(e){return{restrict:"A",priority:-1,link:function(t,n,a){t.$watch(a.ngModel,function(t,a){e(function(){if(t instanceof Array&&a instanceof Array){if(t.length==a.length){return}}if(t){n.trigger("change")}else if(n.attr("placeholder")===i){if(!n.is(":focus"))n.trigger("blur")}})})}}}]);e.module("ui.materialize.slider",[]).directive("slider",["$timeout",function(i){return{restrict:"A",scope:{height:"=",transition:"=",interval:"=",indicators:"="},link:function(t,n,a){n.addClass("slider");i(function(){n.slider({height:e.isDefined(t.height)?t.height:400,transition:e.isDefined(t.transition)?t.transition:500,interval:e.isDefined(t.interval)?t.interval:6e3,indicators:e.isDefined(t.indicators)?t.indicators:true})})}}}]);e.module("ui.materialize.carousel",[]).directive("carousel",["$timeout",function(i){return{restrict:"A",scope:{timeConstant:"@",dist:"@",shift:"@",padding:"@",fullWidth:"@",indicators:"@",noWrap:"@"},link:function(t,n,a){n.addClass("carousel");i(function(){n.carousel({time_constant:e.isDefined(t.timeConstant)?t.timeConstant:200,dist:e.isDefined(t.dist)?t.dist:-100,shift:e.isDefined(t.shift)?t.shift:0,padding:e.isDefined(t.padding)?t.padding:0,full_width:e.isDefined(t.fullWidth)?t.fullWidth:false,indicators:e.isDefined(t.indicators)?t.indicators:false,no_wrap:e.isDefined(t.noWrap)?t.noWrap:false})})}}}]);e.module("ui.materialize.collapsible",[]).directive("collapsible",["$timeout",function(e){return{link:function(i,t,n){e(function(){t.collapsible()});if("watch"in n){i.$watch(function(){return t[0].innerHTML},function(i,n){if(i!==n){e(function(){t.collapsible()})}})}}}}]);e.module("ui.materialize.parallax",[]).directive("parallax",["$timeout",function(e){return{link:function(i,t,n){e(function(){t.parallax()})}}}]);e.module("ui.materialize.toast",[]).constant("toastConfig",{duration:3e3}).directive("toast",["toastConfig",function(i){return{scope:{message:"@",duration:"@",callback:"&"},link:function(t,n,a){n.bind(a.toast,function(){var n=e.isDefined(t.message)?t.message:"";var o=e.isDefined(a.toastclass)?a.toastclass:"";Materialize.toast(n,t.duration?t.duration:i.duration,o,t.callback)})}}}]);e.module("ui.materialize.pushpin",[]).directive("pushpin",[function(){return{restrict:"AE",require:["?pushpinTop","?pushpinOffset","?pushpinBottom"],link:function(e,i,t){var n=t.pushpinTop||0;var a=t.pushpinOffset||0;var o=t.pushpinBottom||Infinity;setTimeout(function(){i.pushpin({top:n,offset:a,bottom:o})},0)}}}]);e.module("ui.materialize.scrollspy",[]).directive("scrollspy",["$timeout",function(e){return{restrict:"A",link:function(i,t,n){t.addClass("scrollspy");e(function(){t.scrollSpy()})}}}]);e.module("ui.materialize.tabs",[]).directive("tabs",["$timeout",function(e){return{scope:{reload:"="},link:function(i,t,n){t.addClass("tabs");e(function(){t.tabs()});i.$watch("reload",function(e){if(e===true){t.tabs();i.reload=false}})}}}]);e.module("ui.materialize.sidenav",[]).directive("sidenav",[function(){return{scope:{menuwidth:"@",closeonclick:"@"},link:function(t,n,a){n.sideNav({menuWidth:e.isDefined(t.menuwidth)?parseInt(t.menuwidth,10):i,edge:a.sidenav?a.sidenav:"left",closeOnClick:e.isDefined(t.closeonclick)?t.closeonclick=="true":i})}}}]);e.module("ui.materialize.material_select",[]).directive("materialSelect",["$compile","$timeout",function(t,n){return{link:function(t,a,o){if(a.is("select")){function r(e,n){if(o.multiple){if(n!==i&&e!==i){if(n.length===e.length){return}}var r=a.siblings("ul.active");if(e!==i&&r.length){var l=r.children("li.active").length;if(l==e.length){return}}}a.siblings(".caret").remove();t.$evalAsync(function(){a.material_select(function(){if(!o.multiple){$("input.select-dropdown").trigger("close")}});var e=function(e){if(e.clientX>=e.target.clientWidth||e.clientY>=e.target.clientHeight){e.preventDefault()}};a.siblings("input.select-dropdown").on("mousedown",e)})}n(r);if(o.ngModel){if(o.ngModel&&!e.isDefined(t.$eval(o.ngModel))){var l=false;t.$watch(o.ngModel,function(i,n){if(!l&&e.isDefined(t.$eval(o.ngModel))){l=true;r()}else{r(i,n)}})}else{t.$watch(o.ngModel,r)}}if("watch"in o){t.$watch(function(){return a[0].innerHTML},function(e,i){if(e!==i){n(r)}})}}}}}]);e.module("ui.materialize.dropdown",[]).directive("dropdown",["$timeout",function(t){return{scope:{inDuration:"@",outDuration:"@",constrainWidth:"@",hover:"@",alignment:"@",gutter:"@",belowOrigin:"@"},link:function(n,a,o){t(function(){a.dropdown({inDuration:e.isDefined(n.inDuration)?n.inDuration:i,outDuration:e.isDefined(n.outDuration)?n.outDuration:i,constrain_width:e.isDefined(n.constrainWidth)?n.constrainWidth:i,hover:e.isDefined(n.hover)?n.hover:i,alignment:e.isDefined(n.alignment)?n.alignment:i,gutter:e.isDefined(n.gutter)?n.gutter:i,belowOrigin:e.isDefined(n.belowOrigin)?n.belowOrigin:i})})}}}]);e.module("ui.materialize.inputfield",[]).directive("inputField",["$timeout",function(i){var t=0;return{transclude:true,scope:{},link:function(n,a){i(function(){var o=a.find("> > input, > > textarea");var r=a.find("> > label");if(o.length==1&&r.length==1&&!o.attr("id")&&!r.attr("for")){var l="angularMaterializeID"+t++;o.attr("id",l);r.attr("for",l)}Materialize.updateTextFields();a.find("> > .materialize-textarea").each(function(){var e=$(this);e.addClass("materialize-textarea");e.trigger("autoresize");var t=e.attr("ng-model");if(t){n.$parent.$watch(t,function(t,n){if(t!==n){i(function(){e.trigger("autoresize")})}})}});a.find("> > .materialize-textarea, > > input").each(function(i,t){t=e.element(t);if(!t.siblings('span[class="character-counter"]').length){t.characterCounter()}})})},template:'<div ng-transclude class="input-field"></div>'}}]);e.module("ui.materialize.input_date",[]).directive("inputDate",["$compile","$timeout",function(t,n){var a=$("<style>#inputCreated_root {outline: none;}</style>");$("html > head").append(a);var o=function(){var e=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,t=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,n=/[^-+\dA-Z]/g,a=function(e,i){e=String(e);i=i||2;while(e.length<i){e="0"+e}return e};return function(r,l,s){var u=o;if(arguments.length===1&&Object.prototype.toString.call(r)=="[object String]"&&!/\d/.test(r)){l=r;r=i}r=r?new Date(r):new Date;if(isNaN(r))throw SyntaxError("invalid date");l=String(u.masks[l]||l||u.masks["default"]);if(l.slice(0,4)=="UTC:"){l=l.slice(4);s=true}var c=s?"getUTC":"get",d=r[c+"Date"](),f=r[c+"Day"](),m=r[c+"Month"](),p=r[c+"FullYear"](),g=r[c+"Hours"](),v=r[c+"Minutes"](),h=r[c+"Seconds"](),y=r[c+"Milliseconds"](),D=s?0:r.getTimezoneOffset(),b={d:d,dd:a(d),ddd:u.i18n.dayNames[f],dddd:u.i18n.dayNames[f+7],m:m+1,mm:a(m+1),mmm:u.i18n.monthNames[m],mmmm:u.i18n.monthNames[m+12],yy:String(p).slice(2),yyyy:p,h:g%12||12,hh:a(g%12||12),H:g,HH:a(g),M:v,MM:a(v),s:h,ss:a(h),l:a(y,3),L:a(y>99?Math.round(y/10):y),t:g<12?"a":"p",tt:g<12?"am":"pm",T:g<12?"A":"P",TT:g<12?"AM":"PM",Z:s?"UTC":(String(r).match(t)||[""]).pop().replace(n,""),o:(D>0?"-":"+")+a(Math.floor(Math.abs(D)/60)*100+Math.abs(D)%60,4),S:["th","st","nd","rd"][d%10>3?0:(d%100-d%10!=10)*d%10]};return l.replace(e,function(e){return e in b?b[e]:e.slice(1,e.length-1)})}}();o.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};o.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};Date.prototype.format=function(e,i){return o(this,e,i)};var r=function(e){if(Object.prototype.toString.call(e)==="[object Date]"){return!isNaN(e.getTime())}return false};return{require:"ngModel",scope:{container:"@",format:"@",formatSubmit:"@",monthsFull:"@",monthsShort:"@",weekdaysFull:"@",weekdaysShort:"@",weekdaysLetter:"@",firstDay:"=",disable:"=",today:"=",clear:"=",close:"=",selectYears:"=",onStart:"&",onRender:"&",onOpen:"&",onClose:"&",onSet:"&",onStop:"&",ngReadonly:"=?",max:"@",min:"@"},link:function(a,o,l,s){s.$formatters.unshift(function(i){if(i){var t=new Date(i);return e.isDefined(a.format)?t.format(a.format):t.format("d mmmm, yyyy")}return null});var u=e.isDefined(a.monthsFull)?a.$eval(a.monthsFull):i,c=e.isDefined(a.monthsShort)?a.$eval(a.monthsShort):i,d=e.isDefined(a.weekdaysFull)?a.$eval(a.weekdaysFull):i,f=e.isDefined(a.weekdaysShort)?a.$eval(a.weekdaysShort):i,m=e.isDefined(a.weekdaysLetter)?a.$eval(a.weekdaysLetter):i;t(o.contents())(a);if(!a.ngReadonly){n(function(){var t={container:a.container,format:e.isDefined(a.format)?a.format:i,formatSubmit:e.isDefined(a.formatSubmit)?a.formatSubmit:i,monthsFull:e.isDefined(u)?u:i,monthsShort:e.isDefined(c)?c:i,weekdaysFull:e.isDefined(d)?d:i,weekdaysShort:e.isDefined(f)?f:i,weekdaysLetter:e.isDefined(m)?m:i,firstDay:e.isDefined(a.firstDay)?a.firstDay:0,disable:e.isDefined(a.disable)?a.disable:i,today:e.isDefined(a.today)?a.today:i,clear:e.isDefined(a.clear)?a.clear:i,close:e.isDefined(a.close)?a.close:i,selectYears:e.isDefined(a.selectYears)?a.selectYears:i,onStart:e.isDefined(a.onStart)?function(){a.onStart()}:i,onRender:e.isDefined(a.onRender)?function(){a.onRender()}:i,onOpen:e.isDefined(a.onOpen)?function(){a.onOpen()}:i,onClose:e.isDefined(a.onClose)?function(){a.onClose()}:i,onSet:e.isDefined(a.onSet)?function(){a.onSet()}:i,onStop:e.isDefined(a.onStop)?function(){a.onStop()}:i};if(!a.container){delete t.container}var n=o.pickadate(t);var l=n.pickadate("picker");a.$watch("max",function(e){if(l){var i=new Date(e);l.set({max:r(i)?i:false})}});a.$watch("min",function(e){if(l){var i=new Date(e);l.set({min:r(i)?i:false})}});a.$watch("disable",function(i){if(l){var t=e.isDefined(i)&&e.isArray(i)?i:false;l.set({disable:t})}})})}}}}]);e.module("ui.materialize.input_clock",[]).directive("inputClock",[function(){return{restrict:"A",scope:{"default":"@",fromnow:"=?",donetext:"@",autoclose:"=?",ampmclickable:"=?",darktheme:"=?",twelvehour:"=?",vibrate:"=?"},link:function(i,t){$(t).addClass("timepicker");if(!i.ngReadonly){t.pickatime({"default":e.isDefined(i.default)?i.default:"",fromnow:e.isDefined(i.fromnow)?i.fromnow:0,donetext:e.isDefined(i.donetext)?i.donetext:"Done",autoclose:e.isDefined(i.autoclose)?i.autoclose:false,ampmclickable:e.isDefined(i.ampmclickable)?i.ampmclickable:false,darktheme:e.isDefined(i.darktheme)?i.darktheme:false,twelvehour:e.isDefined(i.twelvehour)?i.twelvehour:true,vibrate:e.isDefined(i.vibrate)?i.vibrate:true})}}}}]);e.module("ui.materialize.pagination",[]).directive("pagination",["$sce",function(e){function i(e,i){e.List=[];e.Hide=false;e.page=parseInt(e.page)||1;e.total=parseInt(e.total)||0;e.dots=e.dots||"...";e.ulClass=e.ulClass||i.ulClass||"pagination";e.adjacent=parseInt(e.adjacent)||2;e.activeClass="active";e.disabledClass="disabled";e.scrollTop=e.$eval(i.scrollTop);e.hideIfEmpty=e.$eval(i.hideIfEmpty);e.showPrevNext=e.$eval(i.showPrevNext);e.useSimplePrevNext=e.$eval(i.useSimplePrevNext)}function t(e,i){if(e.page>i){e.page=i}if(e.page<=0){e.page=1}if(e.adjacent<=0){e.adjacent=2}if(i<=1){e.Hide=e.hideIfEmpty}}function n(e,i){i=i.valueOf();if(e.page==i){return}e.page=i;e.paginationAction({page:i});if(e.scrollTop){scrollTo(0,0)}}function a(i,t,a){var o=0;for(o=i;o<=t;o++){var r={value:e.trustAsHtml(o.toString()),liClass:a.page==o?a.activeClass:"waves-effect",action:function(){n(a,this.value)}};a.List.push(r)}}function o(i){i.List.push({value:e.trustAsHtml(i.dots)})}function r(e,i){a(1,2,e);if(i!=3){o(e)}}function l(i,t,a){if(!i.showPrevNext||t<1){return}var o,r,l;if(a==="prev"){o=i.page-1<=0;var s=i.page-1<=0?1:i.page-1;if(i.useSimplePrevNext){r={value:"<<",title:"First Page",page:1};l={value:"<",title:"Previous Page",page:s}}else{r={value:'<i class="material-icons">first_page</i>',title:"First Page",page:1};l={value:'<i class="material-icons">chevron_left</i>',title:"Previous Page",page:s}}}else{o=i.page+1>t;var u=i.page+1>=t?t:i.page+1;if(i.useSimplePrevNext){r={value:">",title:"Next Page",page:u};l={value:">>",title:"Last Page",page:t}}else{r={value:'<i class="material-icons">chevron_right</i>',title:"Next Page",page:u};l={value:'<i class="material-icons">last_page</i>',title:"Last Page",page:t}}}var c=function(t,a){i.List.push({value:e.trustAsHtml(t.value),title:t.title,liClass:a?i.disabledClass:"",action:function(){if(!a){n(i,t.page)}}})};c(r,o);c(l,o)}function s(e,i,t){if(t!=e-2){o(i)}a(e-1,e,i)}function u(e,n){if(!e.pageSize||e.pageSize<0){return}i(e,n);var o,u=e.adjacent*2,c=Math.ceil(e.total/e.pageSize);t(e,c);l(e,c,"prev");if(c<5+u){o=1;a(o,c,e)}else{var d;if(e.page<=1+u){o=1;d=2+u+(e.adjacent-1);a(o,d,e);s(c,e,d)}else if(c-u>e.page&&e.page>u){o=e.page-e.adjacent;d=e.page+e.adjacent;r(e,o);a(o,d,e);s(c,e,d)}else{o=c-(1+u+(e.adjacent-1));d=c;r(e,o);a(o,d,e)}}l(e,c,"next")}return{restrict:"EA",scope:{page:"=",pageSize:"=",total:"=",dots:"@",hideIfEmpty:"@",adjacent:"@",scrollTop:"@",showPrevNext:"@",useSimplePrevNext:"@",paginationAction:"&",ulClass:"=?"},template:'<ul ng-hide="Hide" ng-class="ulClass"> '+"<li "+'ng-class="Item.liClass" '+'ng-click="Item.action()" '+'ng-repeat="Item in List"> '+"<a href> "+'<span ng-bind-html="Item.value"></span> '+"</a>"+"</ul>",link:function(e,i,t){e.$watchCollection("[page, total, pageSize]",function(){u(e,t)})}}}]);e.module("ui.materialize.modal",[]).directive("modal",["$compile","$timeout",function(t,n){return{scope:{dismissible:"=",opacity:"@",inDuration:"@",outDuration:"@",ready:"&?",complete:"&?",open:"=?",enableTabs:"@?"},link:function(a,o,r){n(function(){var n=$(r.href?r.href:"#"+r.target);t(o.contents())(a);var l=function(){e.isFunction(a.complete)&&a.$apply(a.complete);a.open=false;a.$apply()};var s=function(){e.isFunction(a.ready)&&a.$apply(a.ready);a.open=true;if(a.enableTabs){n.find("ul.tabs").tabs()}};var u={dismissible:e.isDefined(a.dismissible)?a.dismissible:i,opacity:e.isDefined(a.opacity)?a.opacity:i,in_duration:e.isDefined(a.inDuration)?a.inDuration:i,out_duration:e.isDefined(a.outDuration)?a.outDuration:i,ready:s,complete:l};o.leanModal(u);if(e.isDefined(r.open)&&n.length>0){a.$watch("open",function(i,t){if(!e.isDefined(i)){return}i===true?n.openModal(u):n.closeModal()})}})}}}]);e.module("ui.materialize.tooltipped",[]).directive("tooltipped",["$compile","$timeout",function(e,i){return{restrict:"A",scope:true,link:function(t,n,a){var o=Function.prototype;function r(){n.addClass("tooltipped");e(n.contents())(t);i(function(){if(n.attr("data-tooltip-id")){n.tooltip("remove")}n.tooltip()});o=t.$on("$destroy",function(){n.tooltip("remove")})}a.$observe("tooltipped",function(e){if(e==="false"&&o!==Function.prototype){n.tooltip("remove");o();o=Function.prototype}else if(e!=="false"&&o===Function.prototype){r()}});if(a.tooltipped!=="false"){r()}n.on("$destroy",function(){n.tooltip("remove")})}}}]);e.module("ui.materialize.materialboxed",[]).directive("materialboxed",["$timeout",function(e){return{restrict:"A",link:function(i,t,n){e(function(){t.materialbox()})}}}]);e.module("ui.materialize.nouislider",[]).directive("nouislider",["$timeout",function(t){return{restrict:"A",scope:{ngModel:"=",min:"@",max:"@",step:"@?",connect:"@?",tooltips:"@?"},link:function(n,a,o){t(function(){noUiSlider.create(a[0],{start:n.ngModel||0,step:parseFloat(n.step||1),tooltips:e.isDefined(n.connect)?n.tooltips:i,connect:e.isDefined(n.connect)?n.connect:"lower",range:{min:parseFloat(n.min||0),max:parseFloat(n.max||100)},format:{to:function(e){return Math.round(e*100)/100},from:function(e){return Number(e)}}});a[0].noUiSlider.on("update",function(e,i){n.ngModel=parseInt(e[0],10);n.$apply()})})}}}])})(angular);;
angular.module("componentsModule", ["systemModule"])

    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        $httpProvider.interceptors.push(function ($q) {
            return {
                "responseError": function (rejection) {
                    if (rejection.status == 401) {
                        window.location.href = "/" + gv.lang + "/Error/NotAuthorized";
                    }
                    return $q.reject(rejection);
                }
            };
        });
    }])

    .service("$util", ["$location", "$timeout", function ($location, $timeout) {
        var self = this;

        self.openWindow = function (url, name, width, height) {
            var x = 0, y = 0, w = 800, h = 600; // default value: width=800, height=600
            if (width) w = width;
            if (height) h = height;
            try {
                x = (screen.width - w) / 2;
                y = (screen.height - h) / 2;
            } catch (e) { }
            var features = "resizable=1, scrollbars=1, left=" + x + ", top=" + y + ", width=" + w + ", height=" + h;
            var hostname = document.location.hostname.replace(/\.|-/g, ""); // remove dot from hostname
            var win = window.open(url, hostname + name, features);
            try {
                win.focus();
            } catch (e) { }
            return win;
        };

        self.padNum = function (num, maxLength) {
            maxLength = maxLength || 2;
            num = (num || "0") + "";
            return num.length >= maxLength ? num : new Array(maxLength - num.length + 1).join("0") + num;
        }

        self.roundNum = function (number, decimal) {
            if (!decimal) decimal = 0;
            var result = Math.round(number * Math.pow(10, decimal)) / Math.pow(10, decimal);
            return result;
        };

        self.addDays = function (date, days) {
            var newDate = new Date(date.valueOf());
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        }

        self.getUrlVars = function () {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        };

        self.onScrollToBottom = function (callback) {
            var isCallBack = false;
            $("#scrollContainer").scroll(function () {
                if (typeof callback === "function" && $("#scrollContainer").scrollTop() > ($("#scrollContainer")[0].scrollHeight) * 0.95 && !isCallBack) {
                    isCallBack = true;
                    callback();
                    $timeout(function () {
                        isCallBack = false;
                    }, 1000);
                }
            });
        };

        self.checkSupportProduct = function () {
            var product = $location.path().replace('/', '');
            product = product === "" ? gv.product : product;
            var isSupportProduct = true;
            switch (product) {
                case "keno":
                    isSupportProduct = typeof gv.activeKeno === 'boolean' ? gv.activeKeno : true;
                    break;
                case "lotto":
                    isSupportProduct = typeof gv.activeLotto === 'boolean' ? gv.activeLotto : true;
                    break;
            }

            if (!isSupportProduct) {
                window.location.href = "/" + gv.lang + "/Error/NotFound";
            }
        };
    }])

    .factory("$dialog", ["$rootScope", "$sce", function ($rootScope, $sce) {
        var title = "";
        var message = "";
        var buttons = [];
        var isAnnouncement = false;
        var settings = {
            getTitle: function () {
                return title;
            },
            getMessage: function () {
                return message || title;
            },
            getIsAnnouncement: function () {
                return isAnnouncement;
            },
            show: function (tit, msg, btns, dialogOnly, isAnnounce) {
                title = tit;
                isAnnouncement = isAnnounce;
                message = isAnnouncement ? msg : $sce.trustAsHtml(msg);
                buttons = !!btns ? btns : [
                    {
                        Text: R.Text.OK,
                        Callback: function () {
                            settings.close();
                        }
                    }
                ];

                $rootScope.$broadcast("showDialog", { dialogOnly: dialogOnly });
            },
            close: function (dialogOnly) {
                $rootScope.$broadcast("closeDialog", { dialogOnly: dialogOnly });
            },
            getButtons: function () {
                return buttons;
            }
        }

        return settings;
    }])

    .factory("$popup", ["$rootScope", function ($rootScope) {
        var title = "";
        var bindingUrl = "";

        var settings = {
            getTitle: function () {
                return title;
            },
            getUrl: function () {
                return bindingUrl || title;
            },
            show: function (tit, url) {
                title = tit;
                bindingUrl = url;

                $rootScope.$broadcast("showPopup");
            },
            close: function () {
                $rootScope.$broadcast("closePopup");
            }
        }

        return settings;
    }])

    .directive("loading", function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs, ctrl) {
                var loadingDiv = $("<div></div>");
                element.append(loadingDiv);
                element.css("position", "relative");

                scope.$watch(function () { return element.attr('loading'); }, function (loading) {
                    if (loading === true || loading === "true") {
                        loadingDiv.addClass("loading");
                    } else {
                        loadingDiv.removeClass("loading");
                    }
                });
            }
        };
    })

    .directive("draggable", ["$document", "$window", function ($document, $window) {
        return function (scope, element, attr) {
            var startX = 0, startY = 0,
                x = $window.innerWidth, y = $window.innerHeight,
                width = 0, height = 0;

            angular.element($window).bind("load resize", function () {
                width = $window.innerWidth - element.find(".circles-number").innerWidth() - 30;
                height = $window.innerHeight - element.find(".circles-number").innerHeight() - 30;
                move();
                element.removeClass("ng-hide");
            });

            element.on("mousedown", function (event) {
                event.preventDefault();
                startX = event.screenX - x;
                startY = event.screenY - y;
                $document.on("mousemove", mousemove);
                $document.on("mouseup", mouseup);
            });

            function mousemove(event) {
                x = event.screenX - startX;
                y = event.screenY - startY;
                scope.isDraging = move();
            }

            function mouseup() {
                $document.off("mousemove", mousemove);
                $document.off("mouseup", mouseup);
                scope.isDraging = false;
            }

            function move() {
                //LeftTop range
                x = x < 30 ? 30 : x;
                y = y < 30 ? 30 : y;

                //RightBottom range
                x = x > width ? width : x;
                y = y > height ? height : y;

                var top = element.prop("offsetTop");
                var left = element.prop("offsetLeft");

                /* zone *
                 *********
                 * 1 * 2 *
                 *********
                 * 3 * 4 *
                 *********/
                if (y < height / 2) {
                    // zone 1 & 2
                    element.removeClass("left2right");
                    element.removeClass("right2left");
                } else if (x < width / 2) {
                    // zone 3
                    element.addClass("left2right");
                    element.removeClass("right2left");
                } else {
                    // zone 4
                    element.removeClass("left2right");
                    element.addClass("right2left");

                    var right = element.prop("offsetRight");
                    if (top != y || right != (width - x + 30)) {
                        element.css({
                            top: y + "px",
                            right: (width - x + 30) + "px",
                            left: ""
                        });
                        return true;
                    }

                    return;
                }

                if (top != y || left != x) {
                    element.css({
                        top: y + "px",
                        left: (x - 17) + "px",
                        right: ""
                    });
                    return true;
                }
            }
        };
    }])

    .directive("popupWindow", ["$document", "$window", "$util", function ($document, $window, $util) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var tokens = attrs.popupWindow.split("|");
                element.on("click", function () {
                    $util.openWindow(attrs.href, tokens[0], tokens[1], tokens[2]);
                    return false;
                });
            }
        }
    }])

    .directive("onScrollToBottom", ["$interval", function ($interval) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                if (!attrs["onScrollToBottom"] ||
                    !scope[attrs["onScrollToBottom"]] ||
                    !angular.isFunction(scope[attrs["onScrollToBottom"]])) return;

                var callback = scope[attrs["onScrollToBottom"]];
                var $element = $(element);
                var canInvokeCallback = false;
                var scrollBarTop = 0;

                $interval(function () {
                    if (!$element.find(".jspTrack").height() ||
                        !$element.find(".jspDrag").offset() ||
                        !$element.find(".jspDrag").offsetParent() ||
                        !$element.find(".jspDrag").offsetParent().offset()) return;

                    var newScrollBarTop = $element.find(".jspDrag").offset().top - $element.find(".jspDrag").offsetParent().offset().top;

                    if (scrollBarTop != newScrollBarTop) {
                        scrollBarTop = newScrollBarTop;
                        canInvokeCallback = true;
                    }

                    var containerHeight = $element.find(".jspTrack").height();
                    var scrollBarHeight = $element.find(".jspDrag").height();

                    if (containerHeight && scrollBarHeight && scrollBarTop && scrollBarHeight + scrollBarTop == containerHeight && canInvokeCallback) {
                        canInvokeCallback = false;
                        callback();
                    }
                }, 200);
            }
        };
    }])
    .directive("jscrollpaneCover", ["$window", "$interval", function ($window, $interval) {
        return {
            restrict: "AE",
            replace: true,
            template: "<div><div></div></div>",
            transclude: true,
            link: function (scope, element, attrs, ctrl, transclude) {
                if (!attrs.jscrollpaneCover) return;

                var $element = $(element);
                var $target = $("[cover-by='" + attrs.jscrollpaneCover + "']");

                $element.addClass("jscrollpane-cover");
                $target.addClass("jscrollpane-cover");

                var maxHeight = 0;
                var marginBottom = 0;

                if (attrs.marginBottom) {
                    marginBottom = parseInt(attrs.marginBottom);
                    marginBottom = isNaN(marginBottom) ? 0 : marginBottom;
                }

                var getOffsetTop = function (ele) {
                    var offsetTop = ele.offsetTop;
                    while (ele.offsetParent) {
                        offsetTop += ele.offsetParent.offsetTop;
                        ele = ele.offsetParent;
                    }
                    return offsetTop;
                }

                var refreshScrollBar = function () {
                    maxHeight = $window.innerHeight - getOffsetTop($target[0]) - marginBottom;
                    var newHeight = $target.find(".jspPane").height();
                    $element.height(newHeight > maxHeight ? maxHeight : newHeight);
                    if (newHeight > maxHeight) {
                        $element.removeClass("active");
                        $target.addClass("active");
                    }
                    else {
                        $target.removeClass("active");
                        $element.addClass("active");
                    }
                }

                transclude(function (clone) {
                    element.find("div").html(clone);
                    refreshScrollBar();
                });

                angular.element($window).bind("load resize", function () {
                    refreshScrollBar();
                });

                var lastHeight = 0;
                var lastOffsetTop = 0;
                $interval(function () {
                    var height = $target.find(".jspPane").height();
                    var offsetTop = getOffsetTop($target[0]);
                    if (height != lastHeight || offsetTop != lastOffsetTop) {
                        lastHeight = height;
                        lastOffsetTop = offsetTop;
                        refreshScrollBar();
                    }
                }, 50);

                scope.refreshScrollBar = refreshScrollBar;
            }
        }
    }])
    .directive("jscrollpane", ["$window", "$interval", function ($window, $interval) {
        return {
            restrict: "AE",
            replace: true,
            template: "<div><div></div></div>",
            transclude: true,
            link: function (scope, element, attrs, ctrl, transclude) {
                var $element = $(element);
                var maxHeight = 0;
                var fillFull = (attrs.fillFull === "true" || attrs.fillFull === true);

                var marginBottom = 0;

                var loadNextPage = null;
                if (attrs["loadNextPage"] &&
                    scope[attrs["loadNextPage"]] &&
                    angular.isFunction(scope[attrs["loadNextPage"]])) {
                    loadNextPage = scope[attrs["loadNextPage"]];
                }

                if (attrs.marginBottom) {
                    marginBottom = parseInt(attrs.marginBottom);
                    marginBottom = isNaN(marginBottom) ? 0 : marginBottom;
                }

                var getOffsetTop = function (ele) {
                    var offsetTop = ele.offsetTop;
                    while (ele.offsetParent) {
                        offsetTop += ele.offsetParent.offsetTop;
                        ele = ele.offsetParent;
                    }
                    return offsetTop;
                }

                var refreshScrollBar = function () {
                    jspPaneHeight = $element.find(".jspPane").height();
                    maxHeight = $window.innerHeight - getOffsetTop($element[0]) - marginBottom;
                    if (fillFull) {
                        $element.height(maxHeight);
                    } else {
                        $element.height(jspPaneHeight > maxHeight ? maxHeight : jspPaneHeight);
                    }
                    $element.width(100);
                    $element.jScrollPane({ autoReinitialise: !fillFull });

                    if (loadNextPage && jspPaneHeight > 0 && maxHeight > jspPaneHeight) {
                        loadNextPage();
                    }
                }

                transclude(function (clone) {
                    element.find("div").html(clone);
                    refreshScrollBar();
                });

                angular.element($window).bind("load resize", function () {
                    refreshScrollBar();
                });

                var lastHeight = 0;
                var lastOffsetTop = 0;
                $interval(function () {
                    var height = element.find(".jspPane").height();
                    var offsetTop = getOffsetTop($element[0]);
                    if (height != lastHeight || offsetTop != lastOffsetTop) {
                        lastHeight = height;
                        lastOffsetTop = offsetTop;
                        refreshScrollBar();
                    }
                }, 50);

                scope.refreshScrollBar = refreshScrollBar;
            }
        }
    }])
    .directive("renderComplete", ["$timeout", function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$parent.refreshScrollBar();
                    });
                }

                if (attrs.ngShow) {
                    scope.$watch(attrs.ngShow, function (newValue) {
                        $timeout(function () {
                            scope.$parent.refreshScrollBar();
                        });
                    });
                }
            }
        }
    }])

    .directive("datepicker", function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                var option = {
                    dateFormat: "yy-mm-dd",
                    inline: true,
                    showOtherMonths: true,
                    onSelect: function (date) {
                        var ngModelNameArr = this.attributes["ng-model"].value.split(".");

                        if (scope.$parent[ngModelNameArr[0]])
                            scope = scope.$parent;

                        var model = null;
                        for (var i = 0; i < ngModelNameArr.length; i++) {
                            if (ngModelNameArr.length == 1) {
                                scope[ngModelNameArr[i]] = date;
                            } else if (model == null && scope[ngModelNameArr[i]]) {
                                model = scope[ngModelNameArr[i]];
                            } else if (model && i == ngModelNameArr.length - 1) {
                                model[ngModelNameArr[i]] = date;
                            } else if (model) {
                                model = model[ngModelNameArr[i]];
                            }
                        }

                        if (!scope.$$phase)
                            scope.$apply();
                    }
                };

                var dgmt8 = new Date();
                var diffHoursGmt8 = (8 - (-dgmt8.getTimezoneOffset() / 60));
                dgmt8.setTime(dgmt8.getTime() + (diffHoursGmt8 * 60 * 60 * 1000));
                var gmtDiff = dgmt8.getDate() - (new Date().getDate());

                if (attrs.minDate) option.minDate = parseFloat(attrs.minDate, 10) + gmtDiff;
                if (attrs.maxDate) option.maxDate = parseFloat(attrs.maxDate, 10) + gmtDiff;
                element.datepicker(option);
                if (attrs.datepicker)
                    $('#ui-datepicker-div').addClass(attrs.datepicker);
            }
        };
    })

    .directive("decimal", ["$filter", function ($filter) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                var maxNoOfDecimal = attrs.decimal || 0;
                var limitTo = attrs.limitTo || 0;
                element.on("keydown", function (e) {
                    var val = element.val();
                    if (e.keyCode == 110 || e.keyCode == 190) {
                        // Allow: dot and only 1 dot is allowed, first character cannot be dot
                        if (val.indexOf(".") != -1 || val === "") {
                            e.preventDefault();
                        } else {
                            return;
                        }
                    } else if (e.shiftKey === true && e.keyCode >= 48 && e.keyCode <= 57) {
                        // Not allow shift to prevent @!$#%^&
                        e.preventDefault();
                    }
                    else if (val === "" && (e.keyCode == 48 || e.keyCode == 96)) {
                        // Not allow enter 0 if textbox is empty
                        e.preventDefault();
                    }

                    // Allow: backspace, delete, tab and escape
                    if (e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 ||
                        // Allow: Ctrl+A, Ctrl+C, Ctrl+V
                        (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode == 67 && e.ctrlKey === true) || (e.keyCode == 86 && e.ctrlKey === true) ||
                        // Allow: home, end, left, right
                        (e.keyCode >= 35 && e.keyCode <= 39)) {
                        // let it happen, don't do anything
                        return;
                    }
                    else {
                        // Ensure that it is a number and stop the keypress
                        if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
                            e.preventDefault();
                        }
                    }

                    if (val.indexOf(".") != -1 &&
                        document.activeElement.selectionStart > val.indexOf(".")) {
                        var currentNoOfDecimal = val.split(".")[1].length;
                        if (maxNoOfDecimal != 0 &&
                            currentNoOfDecimal == maxNoOfDecimal &&
                            document.activeElement.selectionStart == document.activeElement.selectionEnd) {
                            e.preventDefault();
                        }
                    }
                    else if (limitTo != 0) {
                        if (val.split(".")[0].length == limitTo &&
                            document.activeElement.selectionStart == document.activeElement.selectionEnd) {
                            e.preventDefault();
                        }
                    }
                });

                element.on("focus", function (e) {
                    element.triggerHandler("select");
                });

                element.on("blur", function (e) {
                    var val = element.val().replace(/\,/g, "");
                    if (isNaN(val)) {
                        element.val("");
                        element.triggerHandler("focus");
                    } else if (element.val() !== "") {
                        var ngModelNameArr = this.attributes["ng-model"].value.split(".");
                        if (scope.$parent[ngModelNameArr[0]]) scope = scope.$parent;
                        var model = null;
                        for (var i = 0; i < ngModelNameArr.length; i++) {
                            if (ngModelNameArr.length == 1) {
                                scope[ngModelNameArr[i]] = val;
                            } else if (model == null && scope[ngModelNameArr[i]]) {
                                model = scope[ngModelNameArr[i]];
                            } else if (model && i == ngModelNameArr.length - 1) {
                                model[ngModelNameArr[i]] = val;
                            } else if (model) {
                                model = model[ngModelNameArr[i]];
                            }
                        }
                        if (!scope.$$phase) {
                            element.val($filter("addComma")(val, maxNoOfDecimal));
                            scope.$apply();
                        }
                    }
                });

                var unregister = scope.$watch(attrs.ngModel, function (value) {
                    if (value)
                        element.triggerHandler("blur");
                    unregister();
                });
            }
        };
    }])
    .directive("integer", ["$filter", function ($filter) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                var limitTo = attrs.limitTo || 0;
                element.on("keydown", function (e) {
                    var val = element.val();
                    if (e.shiftKey === true && e.keyCode >= 48 && e.keyCode <= 57) {
                        // Not allow shift to prevent @!$#%^&
                        e.preventDefault();
                    }

                    // Allow: backspace, delete, tab and escape
                    if (e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 ||
                        // Allow: Ctrl+A, Ctrl+C, Ctrl+V
                        (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode == 67 && e.ctrlKey === true) || (e.keyCode == 86 && e.ctrlKey === true) ||
                        // Allow: home, end, left, right
                        (e.keyCode >= 35 && e.keyCode <= 39)) {
                        // let it happen, don't do anything
                        return;
                    }
                    else {
                        // Ensure that it is a number and stop the keypress
                        if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
                            e.preventDefault();
                        }
                    }

                    if (limitTo != 0) {
                        if (val.length == limitTo &&
                            document.activeElement.selectionStart == document.activeElement.selectionEnd) {
                            e.preventDefault();
                        }
                    }
                });

                element.on("focus", function (e) {
                    element.triggerHandler("select");
                });

                element.on("blur", function (e) {
                    var val = element.val().replace(/\,/g, "");
                    if (isNaN(val)) {
                        element.val("");
                        element.triggerHandler("focus");
                    } else if (element.val() !== "") {
                        var ngModelNameArr = this.attributes["ng-model"].value.split(".");
                        var model = null;
                        for (var i = 0; i < ngModelNameArr.length; i++) {
                            if (ngModelNameArr.length == 1) {
                                scope[ngModelNameArr[i]] = val;
                            } else if (model == null && scope[ngModelNameArr[i]]) {
                                model = scope[ngModelNameArr[i]];
                            } else if (model && i == ngModelNameArr.length - 1) {
                                model[ngModelNameArr[i]] = val;
                            } else if (model) {
                                model = model[ngModelNameArr[i]];
                            }
                        }
                        if (!scope.$$phase) {
                            element.val($filter("addComma")(val));
                            scope.$apply();
                        }
                    }
                });

                var unregister = scope.$watch(attrs.ngModel, function (value) {
                    if (value)
                        element.triggerHandler("blur");
                    unregister();
                });
            }
        };
    }])

    .directive("onlyKeyNumber", ["$filter", function ($filter) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                element.on("keydown", function (e) {
                    var val = element.val();
                    if (e.shiftKey === true && e.keyCode >= 48 && e.keyCode <= 57) {
                        // Not allow shift to prevent @!$#%^&
                        e.preventDefault();
                    }

                    // Allow: backspace, delete, tab and escape
                    if (e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 ||
                        // Allow: Ctrl+A, Ctrl+C, Ctrl+V
                        (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode == 67 && e.ctrlKey === true) || (e.keyCode == 86 && e.ctrlKey === true) ||
                        // Allow: home, end, left, right
                        (e.keyCode >= 35 && e.keyCode <= 39)) {
                        // let it happen, don't do anything
                        return;
                    }
                    else {
                        // Ensure that it is a number and stop the keypress
                        if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
                            e.preventDefault();
                        }
                    }
                });
            }
        };
    }])

    .directive("autoFocus", ["$timeout", function ($timeout) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                $timeout(function () {
                    element[0].focus();
                }, 0);
            }
        };
    }])

    .directive("enter", function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.enter);
                    });

                    event.preventDefault();
                }
            });
        };
    })

    .directive("mobileDialog", [function () {
        return {
            template: '<div>' +
            '<div class="popup-overlay"></div>' +
            '<div class="popup-wrapper">' +
            '<div class="dialog-c">' +
            '<div class="dialog-c-inner">' +
            '<div class="dialog-titlebar">' +
            '<a class="btn-close" ng-click="setting.close()"></a>' +
            '<span ng-bind="setting.title"></span>' +
            '</div>' +
            '<div class="dialog-body">' +
            '<div class="dialog-msg">' +
            '<div ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '<div class="btn-row">' +
            '<a href="javascript:void(0);" class="btn primary dialogBtn" ng-repeat="btn in setting.buttons" ng-click="btn.Callback()">{{btn.Text}}</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>',
            restrict: "E",
            transclude: true,
            scope: {
                setting: "="
            },
            link: function ($scope, $element, $attrs) {
                $scope.close = function () {
                    if (!!$scope.setting && $scope.setting.close) {
                        $scope.setting.close();
                    }
                }
            }
        };
    }])
    .directive("scroll", ["$window", "$document", function ($window, $document) {
        return function (scope) {
            angular.element($window).bind("scroll", function () {
                var pageYOffset = $window.pageYOffset;
                var scrollHeight = $document[0].body.scrollHeight;
                var innerHeight = $window.innerHeight;
                var percentage = (scrollHeight - pageYOffset - innerHeight) / innerHeight * 100;

                if (percentage < 20) {
                    scope.scroll.fetch();
                    //scope.$apply();
                }
            });
        };
    }])

    .directive("fixedThead", ["$window", function ($window) {
        return function (scope, element, attrs) {
            angular.element($window).bind("scroll", function () {
                var fixedZoneHight = attrs.fixedThead || 0;
                var yPos = 0;
                var ele = element.context;
                while (ele) {
                    yPos += ele.offsetTop;
                    ele = ele.offsetParent;
                };
                if (yPos - $window.pageYOffset < fixedZoneHight) {
                    $(".table-fixed").removeClass("table-hidden");
                    $(".table-fixed").addClass("table-visible");
                }
                else {
                    $(".table-fixed").removeClass("table-visible");
                    $(".table-fixed").addClass("table-hidden");
                }
            });
        };
    }])

    .directive('fixTopClassMobile', ["$window", "$timeout", function ($window, $timeout) {
        var $win = angular.element($window); // wrap window object as jQuery object
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $timeout(function () {
                    var offsetTop = element.offset().top,
                        class1 = 'fixedtoTop-1', class2 = 'fixedtoTop-2',
                        betSlipPanel = angular.element('.betSlipPanel'),
                        tempHeight = angular.element('#tempHeight'),
                        srollTop = 0;
                    $win.on('scroll',
                        function () {
                            if ($win.scrollTop() >= offsetTop) {
                                srollTop = $win.scrollTop();
                                tempHeight.show();
                                element.addClass(class1);
                                betSlipPanel.addClass(class2);
                                srollTop -= $win.scrollTop();
                                return;
                            }
                            if ($win.scrollTop() < offsetTop - srollTop) {
                                srollTop = 0;
                                tempHeight.hide();
                                element.removeClass(class1);
                                betSlipPanel.removeClass(class2);
                            }
                        });
                });
            }
        };
    }])

    .directive("floatingNav", function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs, ctrl) {
                var navArr = $("nav");
                if (navArr.length > 0) {
                    var navHeight = 0;
                    var navTop = [];
                    for (var i = 0; i < navArr.length; i++) {
                        $(navArr[i]).css("position", "fixed");
                        $(navArr[i]).css("z-index", navArr.length - i);
                        var top = (i > 0 ? $(navArr[i - 1]).height() : 0);
                        navTop.push(top);
                        $(navArr[i]).css("top", top + "px");
                        navHeight += $(navArr[i]).height();
                    }
                    $(element).css("margin-top", navHeight + "px");

                    var preScrollTop = 0;
                    var minScrollTop = 0;
                    var handler = function () {
                        var maxScrollTop = $(document).height() - $(window).height();
                        if (maxScrollTop <= navHeight) return;
                        var scrollTop = $(window).scrollTop();
                        scrollTop = scrollTop < 0 ? 0 : scrollTop > maxScrollTop ? maxScrollTop : scrollTop;
                        if (scrollTop < 0 || scrollTop > maxScrollTop || scrollTop == preScrollTop) return;
                        for (var i = 0; i < navArr.length; i++) {
                            var minTop = 0 - navHeight + (i > 0 ? $(navArr[i - 1]).height() : 0);
                            var maxTop = (i > 0 ? $(navArr[i - 1]).height() : 0);
                            var caltop = navTop[i] + preScrollTop - scrollTop;
                            navTop[i] = caltop < minTop ? minTop : caltop > maxTop ? maxTop : caltop;

                            $(navArr[i]).css("top", navTop[i] + "px");
                        }
                        preScrollTop = scrollTop;
                    };
                    setInterval(handler, 1);
                }
            }
        };
    })

    .directive("carouselTabs", [function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                if (element.length != 1 || element.find("li").length < 2) return;
                var showCnt = 3;
                var tabItems = element.find("li");
                element.prepend($(tabItems[tabItems.length - 1]).clone().addClass("clone"));
                element.prepend($(tabItems[tabItems.length - 2]).clone().addClass("clone").addClass("virtual"));
                element.append($(tabItems[0]).clone().addClass("clone"));
                element.append($(tabItems[1]).clone().addClass("clone").addClass("virtual"));
                element.find("li.clone a.active").removeClass("active");
                var childrenCnt = element.find("li").length;
                var virtualCnt = element.find("li.clone.virtual").length;
                var tabCnt = childrenCnt - virtualCnt;
                if (childrenCnt <= 0) return;
                element.css("overflow-x", "hidden");
                $(window).on("resize", function () {
                    var windowWidth = $(window).width();
                    var tabWidth = windowWidth / showCnt;
                    var offsetArr = [];
                    for (var i = 0; i < tabCnt; i++) offsetArr.push(i * tabWidth);
                    $(element.find("li.clone a")[1]).attr("carousel-tab-clone", tabCnt - 1);
                    $(element.find("li.clone a")[2]).attr("carousel-tab-clone", 2);
                    setTimeout(function () {
                        element.style("width", (tabWidth * childrenCnt) + "px", "important");
                        element.find("li a").width(tabWidth - 20);
                        for (var i = 0; i < offsetArr.length; i++) {
                            $(element.find("li a")[i + 1]).attr("carousel-tab-offset", offsetArr[i]);
                        }
                        if (element.find("li:not(.clone) a.active").length == 1)
                            element.find("li:not(.clone) a.active").trigger("click");
                        else
                            $(element.find("li a")[2]).trigger("click");
                    }, 100);
                })
                $(window).trigger("resize");
                element.find("li a").on("click", function (e) {
                    if ($(this).parent().hasClass("virtual")) return;
                    var offset = $(this).attr("carousel-tab-offset");
                    if (offset == undefined) return;
                    element.css("transition", $(this).attr("no-transition") ? "" : "300ms ease");
                    element.css("transform", "translate3d(" + -offset + "px,0px,0px)");
                    $(this).attr("no-transition", "");
                    element.parent().append('<div class="carousel-tabs-block"></div>');
                    setTimeout(function () {
                        element.parent().find("div.carousel-tabs-block").remove();
                    }, 300);
                    var cloneTarget = $(this).attr("carousel-tab-clone");
                    if (cloneTarget != undefined) {
                        var $target = $(element.find("li a")[cloneTarget]);
                        $target.attr("no-transition", true);
                        $target.addClass("active");
                        setTimeout(function () {
                            $target.trigger("click");
                        }, 300);
                    }
                })
            }
        };
    }])

    .controller("dialogCtrl", ["$rootScope", "$scope", "$dialog", function ($rootScope, $scope, $dialog) {
        $scope.isShowDialog = false;
        $rootScope.$on("showDialog", function showDialog(event, args) {
            $scope.title = $dialog.getTitle();
            $scope.message = $dialog.getMessage();
            $scope.isAnnouncement = $dialog.getIsAnnouncement();
            $scope.close = function () {
                if ($scope.buttons && $scope.buttons.length > 0
                    && $scope.buttons[$scope.buttons.length - 1].Callback)
                    $scope.buttons[$scope.buttons.length - 1].Callback();
                display(false);
            }
            display(true, args.dialogOnly);
            $scope.buttons = $dialog.getButtons();
        });

        $rootScope.$on("closeDialog", function closeDialog(event, args) {
            display(false, args.dialogOnly);
        });

        display = function (bool, isdialogOnly) {
            $scope.isShowDialog = bool;
            if (isdialogOnly == true) {
                return;
            }
            if (bool) angular.element("body").addClass("greyOutBody");
            else angular.element("body").removeClass("greyOutBody");
        }
    }])

    .controller("popupDialogCtrl", ["$rootScope", "$scope", "$popup", "$location", function ($rootScope, $scope, $popup, $location) {
        $scope.isShowPopup = false;
        $scope.product = '';
        $scope.openbetTotalStake = 0;
        $scope.openbetEstWinning = 0;
        $scope.statementDic = [];
        $scope.statemenTotalStake = 0;
        $scope.statemenWinLoss = 0;
        $rootScope.$on("showPopup", function showPopup() {
            $scope.title = $popup.getTitle();
            $scope.contentUrl = $popup.getUrl();
            $scope.close = function () {
                if ($scope.buttons && $scope.buttons.length > 0 && $scope.buttons[$scope.buttons.length - 1].Callback) {
                    $scope.buttons[$scope.buttons.length - 1].Callback();
                }
                displayPopup(false);
                $scope.contentUrl = '';
                $rootScope.wagerCount = undefined;
                $rootScope.statementDate = null;
                $rootScope.selectedDate = null;
                $location.search({});
            };
            displayPopup(true);
        });

        displayPopup = function (bool) {
            $scope.isShowPopup = bool;
            $scope.$emit("toggleGreyOut", null, false);

            if (bool) angular.element("body").addClass("afterPopup");
            else angular.element("body").removeClass("afterPopup");
        }

        $scope.goBackStatement = function () {
            $location.search({});
            $rootScope.statementDate = null;
        };

        $scope.$on("openBetTotalInfo", function onRefresh(event, args) {
            $scope.openbetTotalStake = args.stake;
            $scope.openbetEstWinning = args.estWinning;
        });
        $scope.$on("statementTotalInfo", function onRefresh(event, args) {
            $scope.product = args.product;
            $scope.statementDic = args.statementDic;
        });
        $scope.$on("statementDetailTotalInfo", function onRefresh(event, args) {
            $scope.product = args.product;
            $scope.statemenTotalStake = args.totalStake;
            $scope.statemenWinLoss = args.totalWinLoss;
        });
    }])

    .controller("popupCtrl", ["$scope", "$window", "$location", function ($scope, $window, $location) {
        $scope.$on("$locationChangeSuccess", function (event) {
            $scope.product = $location.path().replace("/", "");
        });
        $scope.print = function () {
            window.print();
        };
        $scope.refresh = function () {
            $window.location.reload();
        };
    }])

    .filter("datetimeFormat", ["$util", function ($util) {
        return function (datetime, hideSecond) {
            var d = new Date(datetime);
            var dformat = [$util.padNum(d.getFullYear()),
            $util.padNum(d.getMonth() + 1),
            $util.padNum(d.getDate())].join("-") + " ";
            dformat += hideSecond ?
                [$util.padNum(d.getHours()),
                $util.padNum(d.getMinutes())].join(":") :
                [$util.padNum(d.getHours()),
                $util.padNum(d.getMinutes()),
                $util.padNum(d.getSeconds())].join(":");
            return dformat;
        }
    }])
    .filter("datetimeFormatgmt8", ["$util", function ($util) {
        return function (datetime, hideSecond) {
            var d = new Date(datetime);
            // append offset hours (with GMT+8) to the 'd' variable.
            var diffHoursGmt8 = (8 - (-d.getTimezoneOffset() / 60));
            d.setTime(d.getTime() + (diffHoursGmt8 * 60 * 60 * 1000));
            var dformat = [$util.padNum(d.getFullYear()),
            $util.padNum(d.getMonth() + 1),
            $util.padNum(d.getDate())].join("-") + " ";
            dformat += hideSecond ?
                [$util.padNum(d.getHours()),
                $util.padNum(d.getMinutes())].join(":") :
                [$util.padNum(d.getHours()),
                $util.padNum(d.getMinutes()),
                $util.padNum(d.getSeconds())].join(":");
            return dformat;
        }
    }])
    .filter("dateFormat", ["$util", function ($util) {
        return function (datetime) {
            var d = new Date(datetime);
            var dformat = [$util.padNum(d.getFullYear()),
            $util.padNum(d.getMonth() + 1),
            $util.padNum(d.getDate())].join("-");
            return dformat;
        }
    }])
    .filter("dateFormatgmt8", ["$util", function ($util) {
        //Note. Adjusting the hours to GMT+8 will cause the datetime variable changed, so make sure to compute with a clone datetime variable.
        return function (datetime) {
            var d = new Date(datetime);
            // append offset hours (with GMT+8) to the 'd' variable.
            var diffHoursGmt8 = (8 - (-d.getTimezoneOffset() / 60));
            d.setTime(d.getTime() + (diffHoursGmt8 * 60 * 60 * 1000));
            var dformat = [$util.padNum(d.getFullYear()),
            $util.padNum(d.getMonth() + 1),
            $util.padNum(d.getDate())].join("-");
            return dformat;
        }
    }])
    .filter("timeFormat", ["$util", function ($util) {
        return function (datetime) {
            var d = new Date(datetime);
            var dformat = [$util.padNum(d.getHours()),
            $util.padNum(d.getMinutes()),
            $util.padNum(d.getSeconds())].join(":");
            return dformat;
        }
    }])
    .filter("timeFormatgmt8", ["$util", function ($util) {
        return function (datetime) {
            var d = new Date(datetime);
            // append offset hours (with GMT+8) to the 'd' variable.
            var diffHoursGmt8 = (8 - (-d.getTimezoneOffset() / 60));
            d.setTime(d.getTime() + (diffHoursGmt8 * 60 * 60 * 1000));
            var dformat = [$util.padNum(d.getHours()),
            $util.padNum(d.getMinutes()),
            $util.padNum(d.getSeconds())].join(":");
            return dformat;
        }
    }])
    .filter("padNum", ["$util", function ($util) {
        return function (num, maxLength) {
            return $util.padNum(num, maxLength);
        }
    }])
    .filter("addComma", ["$util", function ($util) {
        return function (number, noOfDecimal) {
            if (!number) number = 0;
            number += "";
            number = number.replace(/\,/g, ""); // remove comma first
            number = parseFloat(number); // make sure is float
            number = $util.roundNum(number, noOfDecimal);
            number += "";
            if (noOfDecimal === undefined || noOfDecimal == null || noOfDecimal === 0) { // no specify noOfDecimal, default is 0
                number = number.split(".")[0];
            } else {
                // contains . and has specified noOfDecimal
                number = number + ((number.indexOf(".") != -1) ? "000" : ".000"); // added 3 more zero behind, so if number is 1.8 and noOfDecimal is 2, it will return 1.80
                number = number.split(".")[0] + "." + number.split(".")[1].substr(0, noOfDecimal);
            }
            x = number.split(".");
            x1 = x[0];
            x2 = (x.length > 1 && x[1] !== "") ? ("." + x[1]) : "";
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, "$1" + "," + "$2");
            }
            return x1 + x2;
        };
    }])
    .filter("sumList", function () {
        return function (list, field) {
            var sum = 0;
            if (list)
                for (var key in list) {
                    if (list[key][field]) {
                        sum += parseFloat((list[key][field] + "").replace(/,/g, ""));
                    }
                }
            return sum;
        }
    })
    .filter("sumList2", function () {
        return function (list, field, field2) {
            var sum = 0;
            if (list)
                for (var key in list) {
                    if (list[key][field][field2]) {
                        sum += parseFloat((list[key][field][field2] + "").replace(/,/g, ""));
                    }
                }
            return sum;
        }
    })
    .filter("sumListfilter", function () {
        return function (list, field, ignore) {
            var sum = 0;
            if (list)
                for (var key in list) {
                    if (key === ignore)
                        continue;

                    if (list[key][field]) {
                        sum += parseFloat((list[key][field] + "").replace(/,/g, ""));
                    }
                }
            return sum;
        }
    })
    .filter("sumListfilterNew", function () {
        return function (list, field, belong) {
            var sum = 0;
            if (list)
                for (var key in list) {
                    if (key !== belong)
                        continue;

                    if (list[key][field]) {
                        sum += parseFloat((list[key][field] + "").replace(/,/g, ""));
                    }
                }
            return sum;
        }
    })
    .filter("stringFormat", function () {
        return function () {
            var s = arguments[0];
            if (!s) return "";
            for (var i = 0; i < arguments.length - 1; i++) {
                var reg = new RegExp("\\{" + i + "\\}", "gm");
                s = s.replace(reg, arguments[i + 1]);
            }

            return s;
        }
    })
    .filter("pearlBallSelNum", function () {
        return function (num) {
            return num === 999 ? '?' : num;
        }
    })

    .run(["$rootScope", function ($rootScope) {
        $rootScope.range = function (start, end) {
            var arr = [];

            if (end == null) {
                end = start - 1;
                start = 0;
            }

            if (start <= end) {
                while (start <= end) {
                    arr.push(start++);
                }
            } else {
                while (start >= end) {
                    arr.push(start--);
                }
            }
            return arr;
        }
    }]);;
angular.module("systemModule", ["ui.materialize", "componentsModule", "counterModule"])

    .service("$systemService", ["$http", function ($http) {
        this.getAnnouncements = function () {
            return $http.get("/api/Announcements");
        }

        this.getRules = function (product) {
            return $http.get("/api/Rule/" + product);
        }

        this.getSingleCounterLottoRules = function () {
            return $http.get("/api/Rule/Lotto/Single");
        }

        this.getSyncData = function () {
            return $http.get("/api/Sync");
        }
        this.setCookie = function (c_name, value, exdays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value = escape(value) +
                ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()) + "; path=/;";
            document.cookie = c_name + "=" + c_value;
        }

        this.getCookie = function (c_name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == c_name) {
                    return unescape(y);
                }
            }
            return "";
        }
    }])
    .controller("timerCtrl", ["$rootScope", "$scope", "$interval", "$systemService", "$dialog", "$filter", "$counterService", function ($rootScope, $scope, $interval, $systemService, $dialog, $filter, $counterService) {
        $scope.init = function (initServerTime, isUpComing) {
            isUpComing = isUpComing === undefined ? false : isUpComing;

            $rootScope.serverTime = new Date(initServerTime);
            $scope.countDownTimer = $filter("datetimeFormat")($rootScope.serverTime);

            var count = 0;

            $scope.ShowSessionTimeoutDialog = function () {
                var closeEvent = function () {
                    if (parent.window.opener)
                        parent.window.close();
                    else
                        window.location.href = gv.memberLobbyUrl ? gv.memberLobbyUrl : "/" + gv.lang + "/Error/NotAuthorized";
                };

                $dialog.show(R.Text.KickedOutTitle, R.Text.SessionTimeOut, [{
                    Text: R.Text.Btn_Close,
                    Callback: closeEvent
                }]);

                $interval(closeEvent, 10 * 1000);
            }

            $interval(function () {
                $rootScope.serverTime.setSeconds($rootScope.serverTime.getSeconds() + 1);
                $scope.countDownTimer = $filter("datetimeFormat")($rootScope.serverTime);
                if (++count % 10 == 0) {
                    $systemService.getSyncData().success(function (result) {
                        if (result.isSuccess) {
                            $rootScope.serverTime = new Date(result.data.serverTime);

                            if (isUpComing) {
                            } else if (result.data.maintenance) {
                                window.location.href = "/" + gv.lang + "/Maintenance/Index";
                            } else if (result.data.invalid) {
                                console.info("sessionTimeOut");
                                $scope.ShowSessionTimeoutDialog();
                            }
                        }
                    });
                }
            }, 1000);

            $systemService.setCookie("userId", gv.memberId ? gv.memberId : "");
            $systemService.setCookie("channel", gv.distributionChannel ? gv.distributionChannel : "");

            var hub = $.connection.sessionhub;

            hub.client.kickOutLegacyConnection = function () {
                console.info("kickOutLegacyConnection");
                $scope.ShowSessionTimeoutDialog();
            }

            $counterService.setSignalRConnection();
        }
    }])
    .controller("announcementCtrl", ["$scope", "$timeout", "$filter", "$systemService", "$dialog", "$counterCache", "$interval", "$http", "$location", "$util", function ($scope, $timeout, $filter, $systemService, $dialog, $counterCache, $interval, $http, $location, $util) {
        var annKey = "PopUpAnn";

        $scope.init = function (memberCode) {
            annKey = "PopUpAnn_" + memberCode;
            var interval = $interval(function () {
                if ($counterCache.pageData) {
                    $interval.cancel(interval);
                    $scope.announcements = $counterCache.pageData.Announcements;
                    $timeout(function () {
                        var temp = $scope.announcements;
                        if (!gv.mobile && hasNewPopupAnnouncements()) {
                            var popAnnms = getPopupAnnouncements();
                            var message = "";
                            angular.forEach(popAnnms, function (item) {
                                message += item.content + "<br/><br/>";
                            });
                            $dialog.show(R.Text.Title_ImportantAnnouncement, message, null, null, true);
                        }
                        $scope.announcements = temp;
                    }, 100);
                }
            }, 100);
        }

        $scope.announceInit = function () {
            $util.checkSupportProduct();

            $http.get("/api/Announcements").success(function (result) {
                if (result.isSuccess)
                    $scope.announcements = result.data;
            });
        }

        function getPopupAnnouncements() {
            var temp = [];
            for (var idx = 0; idx < $scope.announcements.length; idx++) {
                var annm = $scope.announcements[idx];
                if (annm.isImportant) {
                    temp.push(annm);
                }
            }

            return temp;
        }

        function hasNewPopupAnnouncements() {
            var value = $systemService.getCookie(annKey);
            var updatedDate = !!value ? new Date(value) : new Date("0001-01-01");
            var newUpdatedDate = updatedDate;
            var popupAnnms = getPopupAnnouncements();

            if (popupAnnms.length == 0) {
                return false;
            }

            angular.forEach(popupAnnms, function (item) {
                var utDate = new Date(item.expiryTime),
                    ctDate = new Date(item.createTime);

                var tempUpDate = ctDate > utDate ? ctDate : utDate;
                newUpdatedDate = tempUpDate > newUpdatedDate ? tempUpDate : newUpdatedDate;
            });

            $systemService.setCookie(annKey, $filter('date')(newUpdatedDate, "yyyy-MM-ddTHH:mm:ss"));
            console.log($filter('date')(newUpdatedDate, "yyyy-MM-ddTHH:mm:ss"));
            return newUpdatedDate > updatedDate;
        }
    }]);;
angular.module("memberModule", [])

    .service("$memberService", ["$http", function ($http) {
        this.getChips = function () {
            return $http.get("/api/Member/Chips");
        }

        this.setUsedChips = function (chips) {
            return $http.put("/api/Member/Chips", chips);
        }

        this.getBalance = function () {
            return $http.get("/api/Member/Balance");
        }

        this.getMemberInfo = function () {
            return $http.get("/api/Member");
        }

        this.logout = function () {
            return $http.delete("/api/Member/Logout");
        }
    }])

    .controller("balanceCtrl", ["$rootScope", "$scope", "$memberService", "$timeout", function ($rootScope, $scope, $memberService, $timeout) {
        $scope.init = function (balance) {
            $scope.balance = balance;
            angular.element("#refreshBalanceImg").hide();
        }

        $scope.refresh = function () {
            angular.element("#refreshBalanceImg").show();
            angular.element("#refreshBalanceBtn").hide();

            $memberService.getBalance().success(function (result) {
                if (result.isSuccess) {
                    $scope.balance = result.data;
                }
            });
            $timeout(function () {
                angular.element("#refreshBalanceImg").hide();
                angular.element("#refreshBalanceBtn").show();
            }, 500)
        }

        $rootScope.$on("refreshBalance", function onRefresh(event, args) {
            $scope.refresh();
        });
    }]);;
angular.module("reportModule", ["componentsModule"])

    .service("$reportService", ["$http", function ($http) {
        this.getOpenBet = function (product, pageNum, pageSize) {
            var url = "/api/Report/" + product + "/OpenBets?";
            url += "pageNum=" + (pageNum || 1) + "&pageSize=" + (pageSize || 10);
            return $http.get(url);
        }

        this.getStatement = function (dateFrom, dateTo) {
            var url = "/api/Report/Statement?";
            if (dateFrom) url += "dateFrom=" + dateFrom + "&";
            if (dateTo) url += "dateTo=" + dateTo;
            return $http.get(url);
        }

        this.getStatementDetails = function (product, date, pageNum, pageSize) {
            var url = "/api/Report/" + product + "/Statement?";
            if (date) url += "date=" + date + "&";
            url += "pageNum=" + (pageNum || 1) + "&";
            url += "pageSize=" + (pageSize || 50);
            return $http.get(url);
        }

        this.getStatementDetailsByCriteria = function (product, criteria) {
            return $http.post("/api/Report/" + product + "/Statement/Details", criteria);
        }
    }])

    .filter("counterName", function () {
        return function (counterId) {
            if (!counterId) return;
            var key = "CounterName_" + counterId;
            return (R.Game[key]) ? R.Game[key].toUpperCase() : key;
        }
    })
    .filter("counterBackground", function () {
        return function (counterId) {
            switch (counterId) {
                case 1:
                case 310:
                    return "1";
                case 2:
                case 320:
                    return "2";
                case 3:
                case 330:
                    return "3";
                case 4:
                case 340:
                    return "4";
                case 5:
                case 350:
                    return "5";
                case 6:
                case 360:
                    return "6";
            }
        }
    })
    .filter("getMaxOdds", ["$util", function ($util) {
        return function (items) {
            var odds = 0, maxOdds = 0;
            for (var i = 0; i < items.length; i++) {
                odds = parseFloat(items[i].odds);
                if (odds >= maxOdds)
                    maxOdds = odds;
            }
            return $util.roundNum(maxOdds, 2);
        }
    }])
    .filter("winning", ["$filter", "$util", function ($filter, $util) {
        return function (amount, items) {
            var odds = $filter("getMaxOdds")(items);
            return amount * $util.roundNum(odds - 1, 2);
        }
    }]);;
angular.module("counterModule", ["componentsModule"])
    .controller("mobileCtrl", ["$scope", "$http", "$window", "$counterCache", function ($scope, $http, $window, $counterCache) {
        $scope.checkLandScape = function () {
            return (window.innerWidth >= window.innerHeight);
        }

        $scope.init = function () {
            if (!gv.product) return;

            $scope.isLandScape = $scope.checkLandScape();
            window.addEventListener("orientationchange", function () {
                setTimeout(function () {
                    $scope.isLandScape = $scope.checkLandScape();
                }, 300);
            }, false);
            $http.get("/api/" + gv.product + "/Mobile?_=" + new Date().getTime()).success(function (model) {
                if (model.isSuccess) {
                    var data = model.data;
                    $counterCache.pageData = {
                        Announcements: data.announcements,
                        Member: data.member,
                        CounterList: data.counters,
                        TrendViewList: data.trendsList,
                        OpenBets: data.openBets,
                        BetSlip: JSON.parse(data.betSlip || "null"),
                    };
                }
            });
        };
    }])
    .controller("menuCtrl", ["$rootScope", "$scope", "$window", "$http", "$counterCache", function ($rootScope, $scope, $window, $http, $counterCache) {
        var lastLeftPosition = 0;

        angular.element($window).bind("scroll", function (s, e) {
            if (lastLeftPosition !== $window.pageXOffset) {
                var style = { "left": 0 - $window.pageXOffset };
                $("#page-header").css(style);
                $("#sidebar").css(style);
                $("#navbdr").css(style);
                $("#left-panel").css(style);
                $(".full-cover").css({ "left": 0 - $window.pageXOffset + 5 });
                lastLeftPosition = $window.pageXOffset;
            }
        });

        angular.element($window).bind("resize", function () {
            resetPosition();
        });

        var resetPosition = function () {
            var left = 0;
            if ($("#main").length > 0)
                left = $("#main").position().left;
            else if ($("#single-counter").length > 0)
                left = $("#single-counter").position().left;

            var style = { "left": left };
            $("#page-header").css(style);
            $("#sidebar").css(style);
            $("#navbdr").css(style);
            $("#left-panel").css(style);
            $(".full-cover").css({ "left": left + 5 });
        }
        resetPosition();

        $scope.init = function (product) {
            $http.get("/api/" + product).success(function (model) {
                if (model.isSuccess) {
                    var data = model.data;
                    $counterCache.pageData = {
                        Announcements: data.announcements,
                        CounterList: data.counters,
                        TrendViewList: data.trendsList,
                        OpenBets: data.openBets,
                        BetSlip: JSON.parse(data.betSlip || "null"),
                    };
                }
            });
        };
    }])
    .controller("progressBarCtrl", ["$scope", "$interval", function ($scope, $interval) {
        $scope.intervalTime = 200;
        $scope.percent = 100;
        $scope.interval = null;

        $scope.init = function (serverTime, counter) {
            console.log(serverTime)
            console.log(counter.draw)

            if (serverTime && counter.draw && counter.draw.startTime && counter.draw.endTime) {
                startDateTime = new Date(counter.draw.startTime);
                endDateTime = new Date(counter.draw.endTime);

                var total = (endDateTime - startDateTime);
                var left = (endDateTime - serverTime);
                console.log(left)
                $scope.percent = (left / total) * 100;

                if ($scope.interval === null) {
                    $scope.interval = $interval(function () {
                        if ($scope.percent < 0) {
                            $scope.percent += 100;
                        }
                        $scope.percent -= ($scope.intervalTime / total) * 100;
                    }, $scope.intervalTime);
                }
            };
        };
    }])

    .service("$counterService", ["$http", function ($http) {
        var self = this;
        var product = "keno";
        var culture = gv.lang;

        var ieVersion = (function () {
            var version,
                matches;

            if (window.navigator.appName === 'Microsoft Internet Explorer') {
                // Check if the user agent has the pattern "MSIE (one or more numbers).(one or more numbers)";
                matches = /MSIE ([0-9]+\.[0-9]+)/.exec(window.navigator.userAgent);

                if (matches) {
                    version = window.parseFloat(matches[1]);
                }
            }

            // undefined value means not IE
            return version;
        })();

        self.setProduct = function (p) {
            product = p;
        }

        self.getCounterList = function (counterId) {
            return counterId
                ? $http.get("/api/" + product + "/MiniCounter/" + counterId)
                : $http.get("/api/" + product + "/Counters");
        }

        self.getCounter = function (counterId) {
            return $http.get("/api/" + product + "/Counter/" + counterId);
        }

        self.getGameResult = function (counterId, index) {
            return $http.get("/api/" + product + "/Counter/" + counterId + "/GameResults?pageNum=" + (index + 1) + "&pageSize=1");
        }

        self.getGameResults = function (product, counterId, drawNo, date, pageNum, pageSize) {
            var url = "/api/" + product + "/Counter/" + counterId + "/GameResults?";
            if (drawNo) url += "drawNo=" + drawNo + "&";
            if (date) url += "date=" + date + "&";
            url += "pageNum=" + (pageNum || 1) + "&";
            url += "pageSize=" + (pageSize || 50);
            return $http.get(url);
        }

        self.getTrends = function (counterId) {
            return $http.get("/api/" + product + "/Counter/" + counterId + "/Trends");
        }

        //self.getTrendList = function (counterId) {
        //    return $http.get("/api/" + product + "/Trends");
        //}

        self.getTrendStatistics = function (counterId) {
            return $http.get("/api/" + product + "/Counter/" + counterId + "/Trends/Statistics");
        }

        self.placeBet = function (placeBetList) {
            return $http.post("/api/" + product + "/PlaceBet", placeBetList);
        }

        self.getPickMarketSelection = function (counterId, selection) {
            return $http.get("/api/" + product + "/Counter/" + counterId + "/Pick/" + selection);
        }

        this.setSignalRConnection = function () {
            if (ieVersion <= 9) {
                $.connection.hub.start({ transport: ["foreverFrame", "longPolling"] });
            } else {
                $.connection.hub.start({ transport: ["serverSentEvents", "longPolling"] });
            }
        }
    }])
    .service("$counterCache", ["$util", function ($util) {
        var self = this;
        var counterList = [];
        var DrawStatus =
            {
                NA: 0,
                New: 1,
                Obsolete: 2,
                Skip: 3,
                Open: 4,
                Close: 5,
                Resulted: 6,
            }
        var CounterStatus =
            {
                NA: 0,
                Open: 2,
                Pause: 3,
                Close: 4,
            };

        self.getCounterList = function () {
            return counterList.sort(function (a, b) { return a.OrderNo - b.OrderNo });
        };

        self.getCounter = function (counterId) {
            var counterIndex = -1;
            for (var i = 0; i < counterList.length; i++) {
                if (counterList[i].id === counterId) {
                    counterIndex = i;
                    break;
                }
            }
            return counterList[counterIndex];
        };

        self.setCounter = function (counter) {
            var counterIndex = -1;
            for (var i = 0; i < counterList.length; i++) {
                if (counterList[i].id === counter.id) {
                    counterIndex = i;
                    break;
                }
            }
            if (counterIndex === -1) {
                counterList.push(counter);
                counterIndex = counterList.length - 1;
            }
            counter.displayGameResultIndex = 0;
            counter.displayGameResultMaxIndex = 9999;
            counter.displayGameResult = counter.gameResult;
            //
            counter.fixedDigit = 1;  //1,2,3
            counter.twoFixedSelectedIndex = 0;
            counter.threeFixedSelectedIndex = 0;
            counter.twoFixedPickCache = [];
            counter.threeFixedPickCache = [];
            counter.twoFixedList = [];
            counter.threeFixedList = [];
            if (counter.ballCount === 3) {
                counter.twoFixedList = [[3, 2], [3, 1], [2, 1]];
                counter.threeFixedList = [[3, 2, 1]];
                counter.twoFixedBallNum = 32;
                counter.threeFixedBallNum = 321;
            } else if (counter.ballCount === 5) {
                counter.twoFixedList = [[5, 4], [5, 3], [5, 2], [5, 1], [4, 3], [4, 2], [4, 1], [3, 2], [3, 1], [2, 1]];
                counter.threeFixedList = [[5, 4, 3], [4, 3, 2], [3, 2, 1]];
                counter.twoFixedBallNum = 54;
                counter.threeFixedBallNum = 543;
            }

            if (!counter.selections) {
                counter.selections = counterList[counterIndex].selections;
            }
            counter.expand = counterList[counterIndex].expand;
            counterList[counterIndex] = counter;
            return counterList[counterIndex];
        };

        self.updateProfile = function (counter, selections) {
            counter.selections = selections;
        }

        self.getDrawStatus = function (drawStatus) {
            if (drawStatus === DrawStatus.Skip)
                return "skip";
            else if (drawStatus === DrawStatus.Close)
                return "close";
            else if (drawStatus === DrawStatus.Resulted)
                return "result";
            else
                return "open";
        };

        self.getCounterStatus = function (counter) {
            var isBeforeResultOpen = counter.resultOpenCountdown !== 0;
            if (counter.draw == null || counter.status === CounterStatus.Close)
                return "close";
            else if (counter.draw.drawStatus === DrawStatus.Skip
                || (counter.draw.drawStatus === DrawStatus.Close && counter.draw.isCloseManually))
                return "skip";
            else if (counter.resultOpenCountdown > 0)
                return "result";
            else if (counter.timer !== "00:00" && self.isLessThanBetClosedTime(counter))
                return "stop";
            else if (counter.timer === "00:00" && isBeforeResultOpen)
                return "wait";
            else
                return "open";
        };

        self.isLessThanBetClosedTime = function (counter) {
            if (!counter.timer || !counter.draw || !counter.draw.betClosedMMSS) return false;

            var c_arr = counter.timer.split(":");
            if (c_arr.length !== 2) return false;

            var d_arr = counter.draw.betClosedMMSS.split(":");
            if (d_arr.length !== 2) return false;

            var c_mm = parseInt(c_arr[0]);
            var c_ss = parseInt(c_arr[1]);
            var d_mm = parseInt(d_arr[0]);
            var d_ss = parseInt(d_arr[1]);

            return c_mm < d_mm || (c_mm === d_mm && c_ss <= d_ss);
        }

        self.getTrendText = function (resultType) {
            var txt = "";
            switch (resultType.toLowerCase()) {
                case "b":
                    txt = R.Game.Trend_Big;
                    break;
                case "s":
                    txt = R.Game.Trend_Small;
                    break;
                case "o":
                    txt = R.Game.Trend_Odd;
                    break;
                case "wo":
                    txt = R.Game.Trend_Wood;
                    break;
                case "e":
                    txt = R.Game.Trend_Even;
                    break;
                case "ea":
                    txt = R.Game.Trend_Earth;
                    break;
                case "os":
                    txt = R.Game.Trend_Odds;
                    break;
                case "es":
                    txt = R.Game.Trend_Evens;
                    break;
                case "t":
                    txt = R.Game.Trend_Tie;
                    break;
                case "u":
                    txt = R.Game.Trend_Up;
                    break;
                case "d":
                    txt = R.Game.Trend_Down;
                    break;
                case "g":
                    txt = R.Game.Trend_Gold;
                    break;
                case "wa":
                    txt = R.Game.Trend_Water;
                    break;
                case "f":
                    txt = R.Game.Trend_Fire;
                    break;
            }
            return txt;
        };

        self.countdown = function (serverDateTime, endDateTime) {
            if (endDateTime) endDateTime = new Date(endDateTime);
            var mmss = "00:00";
            if (serverDateTime < endDateTime) { // make sure no second like 0-7
                mmss = $util.padNum(parseInt((endDateTime - serverDateTime) / 1000 / 60));
                mmss += ":" + $util.padNum(parseInt((endDateTime - serverDateTime) / 1000 % 60));
            }
            return mmss;
        };
    }])
    .service("$placeBetCache", ["$rootScope", "$counterCache", "$dialog", "$filter", "$systemService", function ($rootScope, $counterCache, $dialog, $filter, $systemService) {
        var self = this;
        var wagerList = [];
        var totalStake = "";

        self.isBetProcessing = false;

        self.refreshWager = function () {
            $rootScope.$broadcast("refreshWager");
        }

        self.getTotalStake = function () {
            return totalStake;
        };

        self.getWagerList = function () {
            return wagerList;
        };

        self.getWager = function (index) {
            return (wagerList.length > index) ? wagerList[index] : null;
        };

        self.addWager = function (wager) {
            if (self.isBetProcessing) return;

            if (gv.wagerLimitInOneBet) {
                var unplacedWagers = wagerList.filter(function (wager) { return !wager.wagerNo; });
                if (unplacedWagers.length >= gv.wagerLimitInOneBet) {
                    $dialog.show(R.Text.Error, $filter("stringFormat")(R.Message.TooManyWagers, gv.wagerLimitInOneBet), [{
                        Text: R.Text.Btn_Close,
                        Callback: function () {
                            $dialog.close();
                        }
                    }]);
                    return;
                }
            }

            wagerList.push(wager);
            self.cleanSuccessBet();
        };

        self.deleteWager = function (index) {
            if (self.isBetProcessing) return;

            wagerList.splice(index, 1);
            self.refreshWager();
        };

        self.deleteWagers = function (indices) {
            if (self.isBetProcessing) return;

            indices.sort(function (a, b) { return b - a; })
                .forEach(function (v) { wagerList.splice(v, 1); });

            self.refreshWager();
        };

        self.deleteAllWager = function () {
            if (self.isBetProcessing) return;

            wagerList.splice(0, wagerList.length);
            self.refreshWager();
        };

        self.updateSinglesBetStake = function (stake) {
            if (self.isBetProcessing) return;

            totalStake = stake;
            for (var i = 0; i < wagerList.length; i++) {
                if (!wagerList[i].wagerNo) {
                    var validStake = Math.min(wagerList[i].selections[0].maxBet, stake);
                    wagerList[i].stake = validStake ? validStake : "";
                }
            }
            self.refreshWager();
        };

        self.getValidWager = function () {
            if (self.isBetProcessing) return;

            var validWagerList = [];
            for (var i = 0; i < wagerList.length; i++) {
                wagerList[i].showValid = true;
                var counter = $counterCache.getCounter(wagerList[i].counterId);

                if (!wagerList[i].stake) {
                    wagerList[i].error = R.Message.BS_StakeMustValidNumber.toUpperCase();
                }
                else if (counter.draw.drawNo !== wagerList[i].drawNo) {
                    wagerList[i].error = R.Message.BS_DrawNotOpen.toUpperCase();
                }
                else if ($counterCache.isLessThanBetClosedTime(counter) || $counterCache.getCounterStatus(counter) !== "open") {
                    wagerList[i].error = R.Message.BS_CounterPaused.toUpperCase();
                }
                else if (wagerList[i].uivalid) {
                    validWagerList.push(wagerList[i]);
                }
            }
            self.refreshWager();
            return validWagerList;
        };

        self.cleanSuccessBet = function () {
            if (self.isBetProcessing) return;

            var list = [];
            for (var i = 0; i < wagerList.length; i++) {
                if (!wagerList[i].wagerNo) {
                    list.push(wagerList[i]);
                }
            }
            wagerList = list;
            self.refreshWager();
        };
    }])
    .service("$trendCache", function () {
        var self = this;

        var trendData = {};
        var trendView = {};
        var trendType = {};
        var trendBall = {};

        self.getTrendData = function (counterId) {
            if (!trendData[counterId]) trendData[counterId] = [];
            return trendData[counterId];
        };
        self.setTrendData = function (counterId, newValue) {
            trendData[counterId] = newValue;
            return trendData[counterId];
        };

        self.getTrendView = function (counterId) {
            if (!trendView[counterId]) trendView[counterId] = "big";
            return trendView[counterId];
        };
        self.setTrendView = function (counterId, newValue) {
            trendView[counterId] = newValue;
            return trendView[counterId];
        };

        self.getTrendType = function (counterId) {
            if (!trendType[counterId]) trendType[counterId] = "bs";
            return trendType[counterId];
        };
        self.setTrendType = function (counterId, newValue) {
            trendType[counterId] = newValue;
            return trendType[counterId];
        };

        self.getTrendBall = function (counterId) {
            if (!trendBall[counterId]) trendBall[counterId] = -1;
            return trendBall[counterId];
        };
        self.setTrendBall = function (counterId, newValue) {
            trendBall[counterId] = newValue;
            return trendBall[counterId];
        };

        self.genDefaultTrendTable = function (rowsCount, colCount) {
            var resultTable = [];
            for (var ri = 0; ri < rowsCount; ri++) {
                resultTable[ri] = [];
                for (var ci = 0; ci < colCount; ci++) {
                    resultTable[ri][ci] = {};
                }
            }
            return resultTable;
        };
    })

    .filter("countdown", ["$counterCache", function ($counterCache) {
        return function (serverDateTime, endDateTime) {
            return $counterCache.countdown(serverDateTime, endDateTime);
        }
    }])
    .filter("trendText", ["$counterCache", function ($counterCache) {
        return function (type) {
            return $counterCache.getTrendText(type);
        }
    }]);;
angular.module("betSlipModule", ["ngAnimate", "counterModule", "reportModule", "componentsModule"])

    .controller("betSlipCtrl", ["$rootScope", "$scope", "$interval", "$counterService", "$placeBetCache", "$reportService", "$dialog", "$sce", "$counterCache", "$timeout", "$systemService", function ($rootScope, $scope, $interval, $counterService, $placeBetCache, $reportService, $dialog, $sce, $counterCache, $timeout, $systemService) {
        var productType = "";
        var currentPage = 1;
        var pageSize = 10;

        $scope.init = function (product) {
            $scope.totalStake = "";
            $scope.betSlipView = "bet";
            $scope.isShowOpenBetDetail = false;
            $scope.isBetProcessing = false;
            productType = product || gv.product;
            $scope.wagerList = $placeBetCache.getWagerList();
            var interval = $interval(function () {
                if ($counterCache.pageData) {
                    $interval.cancel(interval);
                    $scope.openBetData = $counterCache.pageData.OpenBets.wagers;
                    $scope.openBetCount = $counterCache.pageData.OpenBets.totalCount;
                    $scope.stake = $counterCache.pageData.OpenBets.totalStake;
                    $scope.estWinning = $counterCache.pageData.OpenBets.totalReturnAmount;
                    $scope.displayOpenBet = $scope.openBetData;
                }
            }, 100);
            $scope.$watch(
                function () { return $("#betSlipFooter").height(); },
                function (value) { $("div.betslipContainter").css("padding-bottom", value + "px"); });
        }

        $scope.refreshOpenBet = function () {
            $reportService.getOpenBet(productType, 1, pageSize * currentPage).success(function (result) {
                if (result.isSuccess) {
                    $scope.openBetData = result.data.wagers;
                    $scope.openBetCount = result.data.totalCount;
                    $scope.stake = result.data.totalStake;
                    $scope.estWinning = result.data.totalReturnAmount;
                    $scope.displayOpenBet = $scope.openBetData;
                    currentPage = Math.ceil($scope.openBetData.length / pageSize);
                    $scope.showOpenBet();
                } else {
                    $dialog.show(R.Text.Error, result.msg);
                }
            });
        }

        $scope.showOpenBet = function () {
            $scope.displayOpenBet = $scope.openBetData;
            $scope.isShowParlay = false;
        }

        $scope.showParlay = function (item) {
            if (item.bets.length > 1) {
                $scope.displayOpenBet = item;
                $scope.isShowParlay = true;
            }
        }

        $scope.deleteWager = function (index, $event) {
            if ($event) {
                //for mobile mode
                $scope.isBetSlipInTransition = true;
                $($event.target).closest("div.betslip-animation").bind("transitionend webkitTransitionEnd", function () { $scope.isBetSlipInTransition = false; });
            }

            var wager = $placeBetCache.getWager(index);
            $placeBetCache.deleteWager(index);
            $rootScope.$broadcast("betSlipDeleteSingleWager", { wager: wager });
        }

        $scope.deleteAllWager = function () {
            if ($placeBetCache.getWagerList().length == 0) { return; }
            $dialog.show(R.Text.Btn_Clear, R.Message.ConfirmToClearAllWagers, [{
                Text: R.Text.OK,
                Callback: function () {
                    $placeBetCache.deleteAllWager();
                    $dialog.close(true);
                }
            },
            {
                Text: R.Text.Cancel,
                Callback: function () {
                    $dialog.close(true);
                }
            }], true);

            $rootScope.$broadcast("betSlipDeleteAllWager");
        }

        $scope.updateSinglesBetStake = function () {
            $placeBetCache.updateSinglesBetStake($scope.totalStake ? $scope.totalStake.replace(/\,/g, "") : "");
        }

        $scope.getErrorMsg = function (error) {
            if (error.required) {
                return "required";
            } else if (error.min) {
                return R.Message.BS_BetLessThanProfileMinBet;
            } else if (error.max) {
                return R.Message.BS_BetExceedProfileMaxBet;
            }
        }

        $scope.validWager = function () {
            $placeBetCache.getValidWager();
        }

        $scope.placeBet = function () {
            if ($scope.isBetProcessing) return;
            $placeBetCache.cleanSuccessBet();
            var list = $placeBetCache.getValidWager();
            if (list.length == 0) {
                $scope.isBetProcessing = false;
                $scope.isShowLoading = false;
                return;
            };

            $scope.isBetProcessing = true;
            $placeBetCache.isBetProcessing = $scope.isBetProcessing;
            $counterService.placeBet(list).success(function (result) {
                if (result.isSuccess) {
                    // Session expired
                    if (result.msg == "InvalidSessionKey") {
                        if (parent.window.opener) {
                            $dialog.show(R.Text.KickedOutTitle, R.Text.SessionTimeOut, [{
                                Text: R.Text.Btn_Close,
                                Callback: function () {
                                    parent.window.close();
                                }
                            }]);
                            $interval(function () {
                                parent.window.close();
                            }, 10 * 1000);
                        } else {
                            window.location.href = "/" + gv.lang + "/Error/NotAuthorized";
                        }
                    } else if (result.msg == "hold") {
                        return;
                    }

                    $scope.totalStake = "";
                    $placeBetCache.totalStake = $scope.totalStake;

                    if (!result.data) {
                        for (var i = 0; i < list.length; i++) {
                            if (result.msg)
                                list[i].error = result.msg.toUpperCase();
                        }
                        $scope.results = list;
                    } else if (list.length == result.data.length) {
                        for (var i = 0; i < list.length; i++) {
                            var item = result.data[i];

                            if (!!item.error) {
                                list[i].wagerNo = 0;
                                list[i].error = (R.Message[item.error] ? R.Message[item.error] : R.Message.BS_Unknown).toUpperCase();
                            }
                            else {
                                list[i].wagerNo = item.wagerNo;
                                list[i].error = null;
                                $scope.placeBetSuccess = true;
                            }

                            if (list[i].stake != "") {
                                list[i].stake =
                                    list[i].stake < list[i].selections[0].minBet ? list[i].selections[0].minBet :
                                        list[i].stake > list[i].selections[0].maxBet ? list[i].selections[0].maxBet :
                                            list[i].stake;
                            }

                            if (list[i].selection && typeof (list[i].selection) === "string") {
                                list[i].selectionText = R.Game["SelectionType_" + list[i].selection.replace("OddsEvensTie", "Tie").replace("UpDownTie", "Tie")];
                            }
                        }
                        $scope.results = list;
                    }
                    $scope.refreshOpenBet();
                    $scope.updateSingleWalletHostBalance();
                    $rootScope.$broadcast("refreshBalance");
                } else {
                    $dialog.show(R.Text.Error, result.msg);
                }
            }).catch(function (e) {
                console.log("$counterService.placeBet failed!", e);
            }).then(function () {
                $scope.isBetProcessing = false;
                $placeBetCache.isBetProcessing = $scope.isBetProcessing;
                $scope.isShowLoading = false;
                $scope.showResult();
            });
        }

        $scope.updateSingleWalletHostBalance = function () {
            var buCode = $systemService.getCookie("buCode");

            if (buCode.toUpperCase() === "V9BET" || buCode.toUpperCase() === "R88") {
                var origin = gv.parentDomain;
                try {
                    window.parent.postMessage({ topic: "KenoUpdateBalance", data: "KenoUpdateBalance" }, origin);
                } catch (e) {
                    console.log("PostMessage Fail. origin:" + origin);
                }
            }
        }

        $scope.cleanSuccessBet = function () {
            $placeBetCache.getWagerList().forEach(function (wager) {
                if (!!wager.wagerNo)
                    $rootScope.$broadcast("betSlipDeleteSingleWager", { wager: wager });
            });

            $placeBetCache.cleanSuccessBet();
        }

        $scope.cleanSuccessBetMobile = function () {
            $placeBetCache.cleanSuccessBet();
            if ($placeBetCache.getWagerList().length == 0) $scope.$parent.$parent.toggleBetSlip();
        }

        $rootScope.$on("refreshWager", function onRefresh(event, args) {
            $scope.totalStake = $placeBetCache.getTotalStake();
            $scope.wagerList = $placeBetCache.getWagerList();
            $scope.betSlipView = "bet";
            $scope.placeBetSuccess = false;
        });

        $scope.addWagerAmount = function (amount) {
            if (!$scope.wager.stake) {
                $scope.wager.stake = 0;
            }
            $scope.wager.stake += amount;
            $placeBetCache.updateSinglesBetStake($scope.wager.stake);
        };
        $scope.isShowLoading = false;
        $scope.confirmBet = function () {
            var errMsg = "";
            if ($scope.wager.stake === undefined) {
                errMsg = R.Text.EnterStakeAmount;
            } else if ($scope.wager.stake < $scope.wager.selections[0].minBet) {
                errMsg = R.Text.StakeAmountLessThanMinSingleBetAmount;
            } else if ($scope.wager.stake > $scope.wager.selections[0].maxBet) {
                errMsg = R.Text.StakeAmountMoreThanMaxSingleBetAmount;
            }

            if (errMsg.length > 0) {
                $dialog.show(R.Text.Bet, errMsg, [
                    {
                        Text: R.Text.Cancel,
                        Callback: function () {
                            $dialog.close();
                        }
                    }]);
                return;
            }

            $dialog.show(R.Text.Bet, R.Text.SureToPlaceBet, [{
                Text: R.Text.OK,
                Callback: function () {
                    $scope.isShowLoading = true;
                    $scope.placeBet();
                    $dialog.close();
                }
            },
            {
                Text: R.Text.Cancel,
                Callback: function () {
                    $dialog.close();
                }
            }]);
        };

        $scope.dialogSetting = {
            isShowDialog: false,
            title: R.Text.Bet,
            message: R.Text.SureToPlaceBet,
            close: $scope.close,
            buttons: [
                {
                    Text: R.Text.Close,
                    Callback: function () {
                        $scope.dialogSetting.isShowDialog = false;
                    }
                }
            ]
        };

        $scope.showResult = function () {
            $scope.dialogSetting.isShowDialog = true;
            $scope.dialogSetting.buttons = [
                {
                    Text: R.Text.Close,
                    Callback: function () {
                        $scope.dialogSetting.isShowDialog = false;
                        $scope.$emit("closeResult");
                    }
                }
            ];
        }

        $rootScope.$on("CounterDrawStatusChanged", function (event, args) {
            $scope.dialogSetting.isShowDialog = false;
        });

        $scope.$watch("wagerList.length", function (newValue, oldValue) {
            if (newValue != oldValue) {
                angular.element('.badge.hidden').removeClass("visible");
                $timeout(function () {
                    angular.element('.badge.hidden').addClass("visible")
                }, 200);
            }
        });

        $scope.getNextOpenBet = function () {
            if (currentPage * pageSize >= $scope.openBetCount) return;
            $reportService.getOpenBet(productType, currentPage + 1, pageSize).success(function (result) {
                if (result.isSuccess) {
                    if ($scope.openBetCount != result.data.totalCount || $scope.stake != result.data.totalStake || $scope.estWinning != result.data.totalReturnAmount) {
                        $scope.refreshOpenBet();
                        return;
                    }
                    currentPage++;
                    $scope.openBetCount = result.data.totalCount;
                    $scope.stake = result.data.totalStake;
                    $scope.estWinning = result.data.totalReturnAmount;
                    result.data.wagers.forEach(function (item) { $scope.openBetData.push(item); });
                    $scope.displayOpenBet = $scope.openBetData;
                } else {
                    $dialog.show(R.Text.Error, result.msg);
                }
            });
        };

        $scope.toggleChipBox = function (action, wager, stakeInput) {
            $scope.isShowChipBox = false;
            $scope.wagerList.forEach(function (item) { item.isShowChipBox = false; });
            wager = wager || $scope;
            switch (action) {
                case "focus":
                    wager.isShowChipBox = true;
                    if (wager.hideChipBox) {
                        $timeout.cancel(wager.hideChipBox);
                        wager.hideChipBox = null;
                    }
                    $timeout(function () {
                        // This tricky is for detecting soft keypad hides out in the case of Android.
                        if (wager.detectSoftKeyPad) return;
                        var oldSize = $(window).height() + $(window).width();
                        wager.detectSoftKeyPad = $interval(function () {
                            var size = $(window).height() + $(window).width();
                            if (size > oldSize) {
                                // It means that soft keypad disappeared.
                                $(stakeInput).blur();
                                $interval.cancel(wager.detectSoftKeyPad);
                                wager.detectSoftKeyPad = null;
                            }
                        }, 50);
                    }, 500);
                    break;
                case "blur":
                    if (!wager.hideChipBox) {
                        wager.hideChipBox = $timeout(function () {
                            wager.isShowChipBox = false;
                        }, 200);
                    }
                    break;
                default:
                    break;
            }
        };

        $scope.getEstWinAmount = function () {
            if (this.wagerForm.Stake.$error.min || this.wagerForm.Stake.$error.max) {
                return 0;
            }
            var stake = (this.wager.stake + "").replace(",", "");
            return stake * (this.wager.selections[this.wager.selections.length - 1].odds - 1);
        }
    }])
    .controller("chipboxCtrl", ["$scope", "$memberService", function ($scope, $memberService) {
        $scope.init = function () {
            $scope.isShowChipbox = true;
        }

        $scope.showChip = function () {
            if ($scope.isDraging) return;
            if ($scope.isShowChip) {
                $scope.isShowChip = false;
                return;
            }
            $memberService.getChips().success(function (result) {
                $scope.chips = result.data.filter(function (chip) {
                    return chip.favorite;
                });
                $scope.isShowChip = true;
            });
        }

        $scope.addChip = function (val) {
            var $activeElement = angular.element(document.activeElement);
            if ($activeElement.attr("type") == "text") {
                var oriVal = $activeElement.val() ? parseFloat($activeElement.val().replace(/\,/g, "")) : 0;
                $activeElement.val(oriVal + val);
                $activeElement.trigger("change");
            }
        }

        $scope.addMobileChip = function (val, wager) {
            var $activeElement = angular.element($(this.stakeInput));
            var oriVal = $activeElement.val() ? parseFloat($activeElement.val().replace(/\,/g, "")) : 0;
            oriVal = oriVal + val;
            updateElementVal($activeElement, oriVal, wager);
        }

        $scope.appendNumber = function (val, wager) {
            var $activeElement = angular.element($(this.stakeInput));
            var oriVal = $activeElement.val();
            oriVal = oriVal === "NaN" ? "" : oriVal;
            oriVal = oriVal.replace(/\,/g, "") + val;
            oriVal = oriVal <= 0 ? "" : oriVal;
            updateElementVal($activeElement, oriVal, wager);
        }

        $scope.backspace = function () {
            var $activeElement = angular.element($(this.stakeInput));
            var oriVal = $activeElement.val();
            oriVal = oriVal === "NaN" ? "" : oriVal;
            oriVal = oriVal.replace(/\,/g, "").slice(0, -1);
            updateElementVal($activeElement, oriVal);
        }

        updateElementVal = function ($ele, val, wager) {
            if ((wager && wager.wagerNo) || $scope.isBetProcessing) {
                return;
            }
            if (val.length > 12) {
                return;
            }
            if (wager && val > wager.selections[0].maxBet) {
                val = wager.selections[0].maxBet;
            }
            $ele.val(val);
            $ele.trigger("change");
            $ele.focus();
        }
    }])

    .filter("countList", function () {
        return function (list, field) {
            var count = 0;
            if (list)
                for (var i = 0; i < list.length; i++) {
                    if (list[i][field]) {
                        count++;
                    }
                }
            return count;
        }
    })
    .filter("betTypeName", function () {
        return function (betType) {
            var betTypeName = "";
            switch (betType) {
                case "bs": betTypeName = R.Game.BetType_BigSmall; break;
                case "oses": betTypeName = R.Game.BetType_OddsEvens; break;
                case "oe": betTypeName = R.Game.BetType_OddEven; break;
                case "ud": betTypeName = R.Game.BetType_UpDown; break;
                case "ele": betTypeName = R.Game.BetType_FiveElement; break;
                case "bsoe": betTypeName = R.Game.BetType_BigSmallOddEven; break;
            }
            return betTypeName;
        }
    });;
var layoutApp = angular.module("layoutApp", ["ui.materialize", "memberModule", "systemModule", "componentsModule"])
    .controller("headerCtrl", ["$rootScope", "$scope", "$memberService", "$counterCache", "$interval", "$location", "$systemService", "$window", "$filter", "$sce", "$http", "$popup", "$dialog"
        , function ($rootScope, $scope, $memberService, $counterCache, $interval, $location, $systemService, $window, $filter, $sce, $http, $popup, $dialog) {
            $scope.init = function () {
                var interval = $interval(function () {
                    if ($counterCache.pageData) {
                        $interval.cancel(interval);
                        $scope.memberInfo = $counterCache.pageData.Member;
                    }
                }, 100);
            };
            $scope.type = 'textonly';
            $rootScope.title = '';
            $scope.fileName = "";
            $scope.isShowPopupBox = false;
            $scope.isShowAlert = gv.isShowAlert;
            $scope.$on("$locationChangeSuccess", function (event) {
                $scope.product = gv.product || $location.path().replace("/", "");
            });

            $scope.showCounterList = function () {
                $rootScope.$broadcast("showCounterList");
            };

            $scope.hideSideNav = function () {
                $("[side-nav]").sideNav("hide");
            };

            $scope.toggleProductList = function () {
                $scope.isShowProductList = !$scope.isShowProductList;
            };

            $scope.switchProduct = function () {
                $scope.toggleProductList();
                if ($scope.product == "lotto")
                    $scope.$broadcast("switchProduct", "keno");

                if ($scope.product == "keno")
                    $scope.$broadcast("switchProduct", "lotto");
            };

            $scope.$on("toggleGreyOut", function (event, callback, clickable) {
                $scope.isGreyOutClickable = !(clickable === false);
                $scope.isShowGreyOut = !$scope.isShowGreyOut;
                if ($scope.isShowGreyOut) {
                    $scope.hideGreyOutCallback = callback;
                    $("body").addClass("greyOutBody");
                }
                else {
                    $scope.isGreyOutClickable = true;
                    $scope.hideGreyOut();
                }
            });

            $scope.hideGreyOut = function () {
                if (!$scope.isGreyOutClickable) return;
                $scope.isShowGreyOut = false;
                $("body").removeClass("greyOutBody");
                if ($scope.hideGreyOutCallback && typeof $scope.hideGreyOutCallback === "function") $scope.hideGreyOutCallback();
            };

            $scope.clickMainLobbyInFooter = function (lobbyUrl) {
                if (!!lobbyUrl) {
                    window.location.href = lobbyUrl;
                }
                else {
                    $dialog.show(R.Text.Error, R.Text.NoMainLobbyURL);
                }
            };

            $scope.logout = function (logoutUrl) {
                if (!!logoutUrl) {
                    $memberService.logout().success(function (result) {
                        if (result.isSuccess) {
                            window.location.href = logoutUrl;
                        }
                    });
                } else {
                    $dialog.show(R.Text.Error, R.Text.NoLogOutURL);
                }
            };

            $scope.gotoUrl = function (url, title) {
                if (title.toLowerCase() === "announcements") {
                    $scope.isShowAlert = false;
                }

                if (url.indexOf("http://") > -1) {
                    location.href = url;
                } else {
                    $popup.show(title, url);
                }
            }

            $scope.gotoResult = function (url, title) {
                if (url.indexOf("http://") > -1) {
                    var counterID = gv.counterID;
                    if (counterID) {
                        url += "?counterid=" + counterID + "&date=" + $filter("dateFormatgmt8")(new Date());
                    }
                    location.href = url;
                } else {
                    $popup.show(title, url);
                }
            }
        }])
    .controller("footerCtrl", ["$systemService", "$scope", "$dialog", function ($systemService, $scope, $dialog) {
        $scope.showStatement = false;
        $scope.report = function () {
            $scope.showStatement = true;
        };
        $scope.close = function () {
            $scope.showStatement = false;
        };

        $scope.showStatement = false;
        $scope.report = function () {
            $scope.showStatement = true;
        };
        $scope.close = function () {
            $scope.showStatement = false;
        };

        $scope.clickMainLobbyInFooter = function (lobbyUrl) {
            if (!!lobbyUrl) {
                window.location.href = lobbyUrl;
            }
            else {
                $dialog.show(R.Text.Error, R.Text.NoMainLobbyURL);
            }
        };

        $scope.logout = function (logoutUrl) {
            if (!!logoutUrl) {
                $memberService.logout().success(function (result) {
                    if (result.isSuccess) {
                        window.location.href = logoutUrl;
                    }
                });
            }
            else {
                $dialog.show(R.Text.Error, R.Text.NoLogOutURL);
            }
        }
    }])
    .controller("pupupContent", ["$scope", "$systemService", function ($scope, $systemService) {
        $scope.$on("showBackNav", function (event, title) {
            $scope.isShowBackNav = true;
            $scope.backNavTitle = title;
        });
    }])
    .controller("popupReportCtrl", ["$scope", function ($scope) {
        $scope.showPopup = false;
        $scope.click = function () {
            $scope.showPopup = true;
        };
        $scope.close = function () {
            $scope.showPopup = false;
        };
    }])
    .controller("HeaderFooterCtrl", ["$rootScope", "$scope", "$window", "$memberService", "$systemService", "$dialog",
        function ($rootScope, $scope, $window, $memberService, $systemService, $dialog) {
            $memberService.getMemberInfo().success(function (result) {
                if (result.isSuccess) {
                    $scope.memberInfo = result.data;
                }
            });

            $scope.clickBalance = function () {
            };

            $scope.showCounterList = function () {
                $rootScope.$broadcast("showCounterList");
            };

            $scope.showStatement = false;
            $scope.report = function () {
                $scope.showStatement = true;
            };
            $scope.close = function () {
                $scope.showStatement = false;
            };

            $scope.clickMainLobbyInFooter = function (lobbyUrl) {
                if (!!lobbyUrl) {
                    $window.location.href = lobbyUrl;
                }
                else {
                    $dialog.show(R.Text.Error, R.Text.NoMainLobbyURL);
                }
            };

            $scope.logout = function (logoutUrl) {
                if (!!logoutUrl) {
                    $memberService.logout().success(function (result) {
                        if (result.isSuccess) {
                            window.location.href = logoutUrl;
                        }
                    });
                }
                else {
                    $dialog.show(R.Text.Error, R.Text.NoLogOutURL);
                }
            }
        }]);;
var app = angular.module("app", ["ui.materialize", "counterModule", "componentsModule", "systemModule", "memberModule", "betSlipModule"]);

// TODO: Need to refactor, combine with kenoCounterApp
app.controller("counterCtrl", ["$rootScope", "$scope", "$window", "$interval", "$filter", "$sce", "$counterService", "$counterCache", "$placeBetCache", "$trendCache", "$systemService",
    function ($rootScope, $scope, $window, $interval, $filter, $sce, $counterService, $counterCache, $placeBetCache, $trendCache, $systemService) {
        $scope.setTwoFixedSelectedIndex = function (index) {
            this.counter.twoFixedSelectedIndex = index;
            this.counter.twoFixedBallNum = this.counter.twoFixedList[this.counter.twoFixedSelectedIndex].join('');
        }

        $scope.setThreeFixedSelectedIndex = function (index) {
            this.counter.threeFixedSelectedIndex = index;
            this.counter.threeFixedBallNum = this.counter.threeFixedList[this.counter.threeFixedSelectedIndex].join('');
        }

        $scope.init = function (counterId, counterType, para, isViewOnly) {
            $scope.isViewOnly = isViewOnly;
            $scope.counterType = counterType;
            $scope.isHideNewBetType = gv.isHideNewBetType;
            $counterService.setProduct("lotto");
            var hub = $.connection.lottohub;

            hub.client.updateCounter = function (data) {
                var counter = $counterCache.getCounter(data.id);
                if (counter) {
                    var currentDrawNo = "";
                    if (counter.draw) {
                        currentDrawNo = counter.draw.drawNo;
                    }
                    data.selections = counter.selections;
                    $scope.setCounter(data);
                }
            }

            hub.client.updateDraw = function (counterId, draw) {
                var counter = $scope.getCounter(counterId);
                if (counter && (counter.draw == null || counter.draw.drawNo == draw.drawNo)) {
                    counter.draw = draw;
                }
            }

            hub.client.updateGameResult = function (gameResult) {
                var counter = $scope.getCounter(gameResult.counterId);
                if (counter) {
                    var currentDrawNo = "";
                    if (counter.draw) currentDrawNo = counter.draw.drawNo;
                    if (currentDrawNo == gameResult.drawNo) {
                        counter.gameResult = gameResult;
                        counter.displayGameResult = counter.gameResult;

                        if (!counter.resultOpenCountdown) {
                            counter.resultOpenCountdown = counter.resultOpenIntervalSecond;
                            if ($scope.ResultWaitingInterval && $scope.ResultWaitingInterval[counter.id]) $interval.cancel($scope.ResultWaitingInterval[counter.id]);
                            if (!$scope.ResultWaitingInterval) $scope.ResultWaitingInterval = {};
                            $scope.ResultWaitingInterval[counter.id] = $interval(function () {
                                if (counter.resultOpenCountdown == 0) $scope.loadCounter(counter.id);
                                else counter.resultOpenCountdown--;
                            }, 1000);
                        }
                    } else if (counter.displayGameResult && counter.displayGameResult.drawNo == gameResult.drawNo) {
                        counter.displayGameResult = gameResult;
                    }
                    $scope.loadTrend(counter.id);
                }
            }

            hub.client.updateProfile = function () {
                //console.log("updateProfile");
                $counterService.getCounterList().success(function (result) {
                    if (result.isSuccess) {
                        var data = result.data;
                        for (var i = 0; i < data.length; i++) {
                            var counter = $counterCache.getCounter(data[i].id);
                            $counterCache.updateProfile(counter, data[i].selections);
                            //console.log(data[i].selections);
                        }
                    }
                });
            }

            // Start the connection
            $counterService.setSignalRConnection();

            $scope.counterList = [];
            $scope.twoFixedList = [[5, 4], [5, 3], [5, 2], [5, 1], [4, 3], [4, 2], [4, 1], [3, 2], [3, 1], [2, 1]];
            $scope.threeFixedList = [[5, 4, 3], [4, 3, 2], [3, 2, 1]];
            $scope.twoFixedList_New = [54, 53, 52, 51, 43, 42, 41, 32, 31, 21];
            $scope.FixedSelectionMap = { "1": "OneFixedDigit", "2": "TwoFixedDigits", "3": "ThreeFixedDigits", };

            var interval = $interval(function () {
                if ($counterCache.pageData) {
                    $interval.cancel(interval);

                    var counterIndex = -1;
                    for (var i = 0; i < $counterCache.pageData.CounterList.length; i++) {
                        if (counterId == $counterCache.pageData.CounterList[i].id) counterIndex = i;
                        $scope.counterList.push($counterCache.setCounter($counterCache.pageData.CounterList[i]));
                    }
                    setNeedGapBlock();
                    $scope.initDisplayGameResult();
                    if (counterId) {
                        $scope.$watch("counterList[" + counterIndex + "]", function (value) {
                            $scope.counter = $scope.counterList[counterIndex];
                        });
                    }

                    if ($counterCache.pageData.BetSlip) {
                        $counterCache.pageData.BetSlip.forEach(function (wager) {
                            var _counter = $scope.getCounter(wager.counterId);
                            var _status = $scope.getStatus(wager.counterId);
                            if (_status == "open" && _counter.draw.drawNo == wager.drawNo)
                                $scope.addWager(wager.bet, wager.ballNum, wager.counterId);
                        });
                        $rootScope.$broadcast("refreshWager");
                    }

                    for (var i = 0; i < $counterCache.pageData.TrendViewList.length; i++) {
                        $trendCache.setTrendData(
                            $counterCache.pageData.TrendViewList[i].counterId,
                            $counterCache.pageData.TrendViewList[i].trends
                        );
                    }
                    $scope.$broadcast("initTrendView");
                }
            }, 100);
            $systemService.getSingleCounterLottoRules().success(function (result) {
                if (result.isSuccess) {
                    $scope._SingleCounterPopUpRules = $sce.trustAsHtml(result.data);
                }
            });

            $(window).on("beforeunload pagehide", function () {
				console.log("LUOWEI")
				console.log($scope.getWagerList())

                $.ajax({
                    type: "Post",
                    async: false,
                    url: "/api/Lotto/BetSlip",
                    data: "=" + JSON.stringify($scope.getWagerList()),
                    processData: false,
                    dataType: "text"
                });
            });
        }

        $scope.display = function () {
            $("#rulesBox").toggle();

            if (!$("#rulesBox").is(":visible")) {
                $(".resultbox-title").each(function () {
                    if ($(this).hasClass("icon-arrow-down")) {
                        $(this).removeClass("icon-arrow-down");
                        $(this).addClass("icon-arrow-right");
                    }
                });

                $(".resultbox-content").each(function () {
                    if ($(this).hasClass("open"))
                        $(this).removeClass("open");
                });
            }
        }

        $scope.initDisplayGameResult = function () {
            for (var i = 0; i < $scope.counterList.length; i++) {
                var counter = $scope.counterList[i];
                counter.displayGameResultIndex = 0;
                counter.displayGameResultMaxIndex = 9999;
                counter.displayGameResult = counter.gameResult;
            }
        }

        $scope.nextGameResult = function (c) {
            var counter = c ? c : this.counter;
            if (counter.displayGameResultIndex > 0) {
                $scope.getGameResult(-1, counter);
            }
        }

        $scope.prevGameResult = function ($event, c) {
            if ($($event.currentTarget).find(".inactive").length > 0 || $($event.currentTarget).find(".disabled").length > 0) {
                return;
            }
            var counter = c ? c : this.counter;
            if (counter.displayGameResultIndex < counter.displayGameResultMaxIndex) {
                $scope.getGameResult(1, counter);
            }
        }

        $scope.getGameResult = function (i, c) {
            var counter = c ? c : this.counter;
            $counterService.getGameResult(counter.id, counter.displayGameResultIndex + i).success(function (result) {
                var data = result.data.gameResults[0];
                if (result.isSuccess && data) {
                    counter.displayGameResultIndex = counter.displayGameResultIndex + i;
                    counter.displayGameResult = data;
                } else {
                    counter.displayGameResultMaxIndex = counter.displayGameResultIndex;
                }
            });
        }

        $scope.setCounter = function (counter) {
            $counterCache.setCounter(counter);
            for (var i = 0; i < $scope.counterList.length; i++) {
                if ($scope.counterList[i].id == counter.id) {
                    $scope.counterList[i] = counter;
                    setNeedGapBlock();
                    return;
                }
            }
        }

        $scope.getCounter = function (counterId) {
            for (var i = 0; i < $scope.counterList.length; i++) {
                if ($scope.counterList[i].id == counterId) {
                    return $scope.counterList[i];
                }
            }
        }

        $scope.loadCounter = function (counterId) {
            var counter = counterId ? $counterCache.getCounter(counterId) : this.counter;
            $counterService.getCounter(counter.id)
                .success(function (result) {
                    if (result.isSuccess && result.data) {
                        $counterCache.setCounter(result.data);
                        $scope.counterList = $counterCache.getCounterList();
                        setNeedGapBlock();
                    }
                })
                .finally(function () {
                    $scope.stopResultWaiting(counter.id);
                });
        }

        $scope.loadTrend = function (counterId) {
            var counter = counterId ? $counterCache.getCounter(counterId) : this.counter;
            $rootScope.$broadcast("getTrend_" + counter.id);
        }

        $scope.getStatus = function (counterId) {
            var counter = counterId ? $counterCache.getCounter(counterId) : this.counter;
            var result = $counterCache.getCounterStatus(counter);

            if (result == "open") {
                if (counter.draw && counter.draw.startTime) {
                    var date = new Date(counter.draw.startTime.replace("T", " ").replace(/-/g, "/"));
                    if (isNaN(date)) date = new Date(counter.draw.startTime);
                    if ($rootScope.serverTime < date) result = "close";
                }
            }

            if (result == "stop") {
                if (this.counter && counterId == this.counter.id) $scope.$broadcast("refreshPick");
            } else if (counter.timer == "00:00") {
                $scope.startResultWaiting(counter);
            }
            $scope.isShowMobileGrayout = result === "close" || result === "skip";
            return result;
        }

        $scope.isLessThanBetClosedTime = function (counterId) {
            var counter = counterId ? $counterCache.getCounter(counterId) : this.counter;
            return $counterCache.isLessThanBetClosedTime(counter);
        }

        $scope.startResultWaiting = function (counter) {
            if ($scope.ResultWaitingInterval === undefined) $scope.ResultWaitingInterval = {};
            if ($scope.ResultWaitingInterval[counter.id]) return;

            var isMiniCounter = $scope.counter && $scope.counter.id != counter.id;
            var isDrawSkipped = counter.draw && counter.draw.drawStatus == 3;

            var countdown = $scope.isMobile || isMiniCounter || isDrawSkipped ? 0 : counter.resultWaitingIntervalSecond;
            $scope.ResultWaitingInterval[counter.id] = $interval(function () {
                if (countdown == 0) {
                    $scope.loadCounter(counter.id);
                    $scope.loadTrend(counter.id);
                }
                else countdown--;
            }, 1000);
        }

        $scope.stopResultWaiting = function (counterId) {
            if ($scope.ResultWaitingInterval === undefined)
                return;
            if ($scope.ResultWaitingInterval[counterId]) {
                $interval.cancel($scope.ResultWaitingInterval[counterId]);
                $scope.ResultWaitingInterval[counterId] = null;
            }
        }

        $scope.setBallNum = function (num) {
            $scope.ballNum = num;
        }

        $scope.getSelectedNums = function (ballNum, group, counter) {      //ballNum:54, group: 5 or 4
            var counter = (counter == null) ? this.counter : counter;

            var ls = [];

            var pickCache = (ballNum.length == 3) ? counter.threeFixedPickCache : counter.twoFixedPickCache;
            pickCache.forEach(function (v) {
                if (v.indexOf(ballNum + '-' + group) == 0) {
                    var num = v.split('-')[2];
                    if (ls.indexOf(num) < 0) {
                        ls.push(num);
                    }
                }
            });
            return ls;
        }

        $scope.getCombo = function (group1, group2, group3) {
            var ls = [];
            var i, j, k;
            if (group3 == null) {
                for (i = 0; i < group1.length; i++) {
                    for (j = 0; j < group2.length; j++) {
                        ls.push('' + group1[i] + group2[j]);
                    }
                }
            } else {
                for (i = 0; i < group1.length; i++) {
                    for (j = 0; j < group2.length; j++) {
                        for (k = 0; k < group3.length; k++) {
                            ls.push('' + group1[i] + group2[j] + group3[k]);
                        }
                    }
                }
            }
            return ls;
        }

        $scope.twothreeFixedPick = function (fixedDigit, row, currentNum) {
            // pickCache modle
            // [54-5-num, 54-4-num, ...]

            // wagerlist cache
            // [ 543-1-9-3, 432-3-3-3]

            var ballNum = fixedDigit == 2 ? this.counter.twoFixedList[this.counter.twoFixedSelectedIndex].join('') : this.counter.threeFixedList[this.counter.threeFixedSelectedIndex].join('');
            var currentGroup = fixedDigit == 2 ? this.counter.twoFixedList[this.counter.twoFixedSelectedIndex][row] : this.counter.threeFixedList[this.counter.threeFixedSelectedIndex][row];

            var group1 = (ballNum.indexOf(currentGroup) == 0) ? [currentNum] : $scope.getSelectedNums(ballNum, ballNum[0], this.counter);
            var group2 = (ballNum.indexOf(currentGroup) == 1) ? [currentNum] : $scope.getSelectedNums(ballNum, ballNum[1], this.counter);
            var group3 = (ballNum.indexOf(currentGroup) == 2) ? [currentNum] : $scope.getSelectedNums(ballNum, ballNum[2], this.counter);
            var combo = (fixedDigit == 3) ? $scope.getCombo(group1, group2, group3) : $scope.getCombo(group1, group2);   //e.g. [85,84,83]

            //update pickCache
            var pickCache = (fixedDigit == 3) ? this.counter.threeFixedPickCache : this.counter.twoFixedPickCache;
            var betType = "num";
            var fullnum = ballNum + "-" + currentGroup + "-" + currentNum;
            var index = pickCache.indexOf(fullnum);
            if (index >= 0) {
                //remove pickCache
                pickCache.splice(index, 1);
                //remove $placeBetCache
                var that = this;
                var removeIndices = [];
                $scope.getWagerList().forEach(function (w, i) {
                    if (w.counterId == that.counter.id
                        && w.drawNo == that.counter.draw.drawNo
                        && w.bet.betType == betType
                        && combo.indexOf(w.bet.selection) >= 0
                        && w.ballNum == ballNum) {
                        removeIndices.push(i);
                    }
                });
                $placeBetCache.deleteWagers(removeIndices);
            } else {
                //add pickCache
                pickCache.push(fullnum);
                //add $placeBetCache
                var selections = [];

                var that = this;
                combo.forEach(function (v) {
                    var filter = $scope.getWagerList().filter(function (w) {
                        return w.counterId == that.counter.id
                            && w.drawNo == that.counter.draw.drawNo
                            && w.bet.betType == betType
                            && w.bet.selection == v
                            && w.ballNum == ballNum;
                    });
                    if (filter.length == 0) {
                        that.addWager({ betType: betType, selection: v }, ballNum + "");
                    }
                });
            }
        }

        $scope.threeFixedIsPicked = function (row, currentNum) {
            var ballNum = this.counter.threeFixedList[this.counter.threeFixedSelectedIndex].join('');
            var currentGroup = this.counter.threeFixedList[this.counter.threeFixedSelectedIndex][row];
            var fullnum = ballNum + "-" + currentGroup + "-" + currentNum;

            var b = this.counter.threeFixedPickCache.indexOf(fullnum) >= 0;
            return b;
        }

        $scope.twoFixedIsPicked = function (row, currentNum) {
            var ballNum = this.counter.twoFixedList[this.counter.twoFixedSelectedIndex].join('');
            var currentGroup = this.counter.twoFixedList[this.counter.twoFixedSelectedIndex][row];
            var fullnum = ballNum + "-" + currentGroup + "-" + currentNum;

            var b = this.counter.twoFixedPickCache.indexOf(fullnum) >= 0;
            return b;
        }

        $rootScope.$on("betSlipDeleteSingleWager", function onRefresh(event, args) {
            if (args.wager != null) {
                var w = args.wager;
                if (w.bet.betType == "num" && w.ballNum.length > 1) {
                    var bettype = w.bet.betType;
                    var ballNum = w.ballNum;            //54
                    var selection = w.bet.selection;    //00

                    var counters = $scope.counterList.filter(function (x) { return x.id == w.counterId; });
                    if (counters) {
                        var c = counters[0];
                        var pickCache = (ballNum.length == 3) ? c.threeFixedPickCache : c.twoFixedPickCache;
                        var arr = $scope.getWagerList().filter(function (v) {
                            return (v.counterId == c.id
                                && v.drawNo == c.draw.drawNo
                                && v.bet.betType == bettype
                                && v.ballNum == ballNum);
                        }).map(function (v) {
                            return v.bet.selection;
                        });
                        var i, ls;
                        for (i = 0; i < selection.length; i++) {
                            ls = arr.filter(function (s) { return s[i] == selection[i]; });
                            if (ls == 0) {
                                //remove from cache
                                var key = '' + ballNum + '-' + ballNum[i] + '-' + selection[i];
                                var index = pickCache.indexOf(key);
                                if (index >= 0) {
                                    pickCache.splice(index, 1);
                                }
                            }
                        }
                    }
                }
            }
        });

        $rootScope.$on("betSlipDeleteAllWager", function onRefresh(event, args) {
            $scope.counterList.forEach(function (c) {
                c.threeFixedPickCache = [];
                c.twoFixedPickCache = [];
            });
        });

        $scope.addWager = function (bet, ballNum, counterId, stake) {

            if ($scope.isViewOnly) {
                return;
            }

            var selectionData = null;
            var wager = {};
            wager.text = "";

            ballNum = ballNum == null ? this.ballNum : ballNum;
            var counter = counterId ? $scope.getCounter(counterId) : this.counter;

            if ($scope.isAlreadyInBetSlip(bet, ballNum, counter.id) && bet.betType != "pick1" && !(bet.betType == "num" && ballNum.length > 1)) {
                $placeBetCache.getWagerList().forEach(function (w, i) {
                    if (w.counterId == counter.id && w.drawNo == counter.draw.drawNo && w.bet.betType == bet.betType && w.bet.selection == bet.selection && w.ballNum == ballNum) $placeBetCache.deleteWager(i);
                })
                return;
            }

            if (ballNum) {
                wager.text += (ballNum + "")
                    .split("")
                    .sort(function (a, b) { return b - a })
                    .map(function (n) { return R.Game["SelectionType_" + n + $filter("ballNumberFormat")(n) + "Digit"]; })
                    .join(" ");
            } else {
                wager.text += R.Game.BetType_3rd2nd1st;
            }

            wager.text += " | ";

            wager.bet = bet
            wager.ballNum = ballNum;
            wager.mobileBetText = {
                betType: wager.text,
            };

            switch (bet.betType) {
                case "num":
                    var nFixed = (ballNum + "").length;
                    var selectionKey = $scope.FixedSelectionMap[nFixed + ""];
                    selectionData = counter.selections[selectionKey];
                    // BetType should be 1Fixed_4, 2Fixed_25, 3Fixed_345 ...
                    wager.betType = nFixed + "Fixed_" + (ballNum + "").split("").sort().join("");
                    // Selection should be X1XXX, X0X, 5XX2X ...
                    wager.selection = "";
                    for (var i = counter.ballCount; i >= 1; i--) {
                        var j = (ballNum + "").indexOf(i + "");
                        if (j >= 0) wager.selection += (bet.selection + "").split("")[j];
                        else wager.selection += "X";
                    }
                    wager.text += R.Game["BetType_" + nFixed + "_FixedDigit"] + " : " + wager.selection;
                    wager.mobileBetText.betType += R.Game["BetType_" + nFixed + "_FixedDigit"];
                    wager.mobileBetText.selection = wager.selection;
                    break;
                case "oe":
                    var nFixed = (ballNum + "").length;
                    selectionData = counter.selections[bet.selection];
                    // BetType should be 1Fixed_OE_4, 2Fixed_OE_25, 3Fixed_OE_345 ...
                    wager.betType = nFixed + "Fixed_OE_" + (ballNum + "").split("").sort().join("");
                    wager.text += (nFixed == 1 ? R.Game.LottoBetType_OddEven : R.Game.BetType_LastDigitOddEven) + " : " + R.Game["SelectionType_" + bet.selection];
                    wager.mobileBetText.betType += (nFixed == 1 ? R.Game.LottoBetType_OddEven : R.Game.BetType_LastDigitOddEven);
                    wager.mobileBetText.selection = R.Game["SelectionType_" + bet.selection];
                    break;
                case "bs":
                    var nFixed = (ballNum + "").length;
                    selectionData = counter.selections[bet.selection];
                    // betType should be 1Fixed_BS_4, 2Fixed_BS_25, 3Fixed_BS_345 ...
                    wager.betType = nFixed + "Fixed_BS_" + (ballNum + "").split("").sort().join("");
                    wager.text += (nFixed == 1 ? R.Game.LottoBetType_BigSmall : R.Game.BetType_LastDigitBigSmall) + " : " + R.Game["SelectionType_" + bet.selection];
                    wager.mobileBetText.betType += (nFixed == 1 ? R.Game.LottoBetType_BigSmall : R.Game.BetType_LastDigitBigSmall);
                    wager.mobileBetText.selection = R.Game["SelectionType_" + bet.selection];
                    break;
                //case "ltoe":
                //    selectionData = counter.selections["Last3_" + bet.selection];
                //    wager.text += R.Game.BetType_LastDigitOddEven + " : " + R.Game["SelectionType_" + bet.selection];
                //    wager.mobileBetText.betType += R.Game.BetType_LastDigitOddEven;
                //    wager.mobileBetText.selection = R.Game["SelectionType_" + bet.selection];
                //    break;
                //case "ltbs":
                //    selectionData = counter.selections["Last3_" + bet.selection];
                //    wager.text += R.Game.BetType_LastDigitBigSmall + " : " + R.Game["SelectionType_" + bet.selection];
                //    wager.mobileBetText.betType += R.Game.BetType_LastDigitBigSmall;
                //    wager.mobileBetText.selection = R.Game["SelectionType_" + bet.selection];
                //    break;
                case "sum":
                    selectionData = counter.selections["Sum_" + bet.selection];
                    if (bet.selection == 0) {
                        wager.selection = "0-6";
                    } else if (bet.selection == 15) {
                        wager.selection = "21-27";
                    } else {
                        wager.selection = 6 + bet.selection;
                    }
                    wager.text += R.Game.BetType_Sum + " : " + wager.selection;
                    wager.mobileBetText.betType += R.Game.BetType_Sum;
                    wager.mobileBetText.selection = wager.selection;
                    break;
                case "span":
                    selectionData = counter.selections["Span_" + bet.selection];
                    wager.text += R.Game.BetType_Span + " : " + bet.selection;
                    wager.mobileBetText.betType += R.Game.BetType_Span;
                    wager.mobileBetText.selection = bet.selection;
                    break;
                case "pick1":
                    //selectionData = counter.selections["Last3_1Digit_" + bet.selection];
                    selectionData = counter.selections["OneDigit"];
                    wager.betType = "1Digit_123"
                    wager.numbers = [bet.selection];
                    wager.selection = bet.selection;
                    wager.text += R.Game.BetType_1Digit;
                    wager.mobileBetText.betType += R.Game.BetType_1Digit;
                    wager.mobileBetText.selection = wager.selection;
                    break;
                case "pick2":
                    bet.selection.sort();
                    var result = getResult(bet.selection);
                    selectionData = Object.keys(result).length === 2 ? counter.selections["TwoDigits"] : counter.selections["TwoDigits_Double"];
                    wager.betType = "2Digits_123"
                    wager.numbers = bet.selection;
                    wager.selection = bet.selection.sort(function (a, b) { return a - b; }).join("");
                    wager.text += R.Game.BetType_2Digits;
                    wager.mobileBetText.betType += R.Game.BetType_2Digits;
                    wager.mobileBetText.selection = wager.selection;
                    break;
                case "pick3":
                    bet.selection.sort();
                    var tempDic = { 1: counter.selections["ThreeDigits_Triple"], 2: counter.selections["ThreeDigits_Double"], 3: counter.selections["ThreeDigits"] }
                    var result = getResult(bet.selection);
                    selectionData = tempDic[Object.keys(result).length];
                    wager.betType = "3Digits_123"
                    wager.numbers = bet.selection;
                    wager.selection = bet.selection.sort(function (a, b) { return a - b; }).join("");
                    wager.text += R.Game.BetType_3Digits;
                    wager.mobileBetText.betType += R.Game.BetType_3Digits;
                    wager.mobileBetText.selection = wager.selection;
                    break;
            }
            function getResult(a) {
                var result = {};
                a.forEach(function (item) {
                    result[item] = result[item] ? result[item] + 1 : 1;
                });
                return result;
            }
            wager.counterId = counter.id;
            wager.counterName = counter.name;
            wager.drawNo = counter.draw.drawNo;
            if (!wager.selection) wager.selection = bet.selection;

            wager.selections = [];
            wager.selections.push(selectionData);
            wager.stake = stake || null;

            if (bet.betType.indexOf("pick") !== -1) {
                wager.text += " @ " + wager.selections[0].odds;
                wager.text += "<br>";
                var selection = (wager.selection.length > 1) ? wager.selection.split("").join(", ") : wager.selection;
                wager.text += "(" + selection + ")";
                wager.text += "<br>";
                wager.text = $sce.trustAsHtml(wager.text);
            }
            else {
                wager.text += " @ " + wager.selections[0].odds;
                wager.text = $sce.trustAsHtml(wager.text);
            }

            $placeBetCache.addWager(wager);
        }

        $scope.getBallResult = function (index) {
            if (this.getStatus() != "result"
                || this.counter.displayGameResult.resultBalls.length == 0) {
                return -1;
            }
            var ball = this.counter.displayGameResult.resultBalls[index];
            return ball;
        }

        $scope.getLast3Result = function () {
            if (this.getStatus() != "result"
                || this.counter.displayGameResult.resultBalls.length == 0) {
                return -1;
            }

            var result = {};
            result.ball = {};

            var last3 = this.counter.displayGameResult.resultBalls.slice();
            last3.splice(3);

            var sum = 0, max = 0, min = 10;
            for (var i = 0; i < last3.length; i++) {
                var ball = last3[i];
                max = ball > max ? ball : max;
                min = ball < min ? ball : min;
                sum += ball;
                result.ball[ball] = true;
            }
            result.sum = sum;
            result.span = max - min;
            return result;
        }

        $scope.getTotalStake = function () {
            return $placeBetCache.getTotalStake();
        }

        $scope.getWagerList = function () {
            return $placeBetCache.getWagerList()
                .filter(function (wager) { return !wager.wagerNo; })
                .map(function (wager) {
                    return {
                        counterId: wager.counterId,
                        drawNo: wager.drawNo,
                        bet: wager.bet,
                        ballNum: wager.ballNum
                    };
                });
        }

        $scope.deleteAllWager = function () {
            return $placeBetCache.deleteAllWager();
        }

        $scope.isAlreadyInBetSlip = function (bet, ballNum, counterId) {
            var counter = counterId ? $scope.getCounter(counterId) : this.counter;
            ballNum = ballNum == null ? this.ballNum : ballNum;

            if (!counter || !counter.id || !counter.draw || !counter.draw.drawNo || !bet || $scope.getStatus(counter.id) != "open") return false;

            var wagerList = $placeBetCache.getWagerList();
            for (var i = 0; i < wagerList.length; i++) {
                var w = wagerList[i];
                if (w.counterId == counter.id && w.drawNo == counter.draw.drawNo && w.bet.betType == bet.betType && w.bet.selection == bet.selection && w.ballNum == ballNum) return true;
            }

            return false;
        }

        $scope.toggleCounterList = function () {
            $scope.isShowCounterList = !$scope.isShowCounterList;
            $scope.$emit("toggleGreyOut", function () {
                $scope.isShowCounterList = false;
            })
        }

        $scope.setGoBackTarget = function () {
            $systemService.setCookie("goBackTarget", window.location.pathname + window.location.search);
        }

        $scope.$on("switchProduct", function () {
            window.location.href = gv.lobbyUrl.keno;
        })

        $scope.toggleBetSlip = function () {
            if ($scope.getWagerList().length == 0 && !$scope.showBetSlip) {
                return;
            }
            $scope.showBetSlip = !$scope.showBetSlip;
            $placeBetCache.cleanSuccessBet();
            if ($scope.showBetSlip) $("nav.sideNavTop").css("display", "none");
            else $("nav.sideNavTop").css("display", "");
            $scope.$emit("toggleGreyOut", null, false);
        };

        function setNeedGapBlock() {
            for (var i = 0; i < $scope.counterList.length; i += 2) {
                if ((i + 1) >= $scope.counterList.length)
                    $scope.counterList[i].needGapBlock = false;
                else {
                    $scope.counterList[i].needGapBlock = $scope.counterList[i].ballCount == 3 && $scope.counterList[i + 1].ballCount == 5;
                    $scope.counterList[i + 1].needGapBlock = $scope.counterList[i].ballCount == 5 && $scope.counterList[i + 1].ballCount == 3;
                }
            }
        }

        $scope.setGoBackTarget = function () {
            $systemService.setCookie("goBackTarget", window.location.pathname + window.location.search);
        }
    }])
    .controller("pickCtrl", ["$scope", "$dialog", "$filter", function ($scope, $dialog, $filter) {
        $scope.init = function (pickCount) {
            $scope.pickCount = pickCount;
            $scope.refreshPick();
            $scope.allPickNum = [];
            $scope.allPickNum[0] = [];
            $scope.allPickNum[1] = [];
            $scope.allPickNum[2] = [];
            $scope.selectRowType = 0;
            $scope.getAvailableWagers();
        }

        $scope.showClickNum = function (allPick) {
            var returnVal = '　';
            if (allPick.length > 0) {
                var allpickNum = angular.copy(allPick);
                allpickNum.sort();
                var start = -1, end = -1;
                for (var i = 0; i < allpickNum.length - 1; i++) {
                    if (allpickNum[i] + 1 == allpickNum[i + 1]) {
                        if (end === allpickNum[i]) {
                            allpickNum[i] = "-";
                        }
                        end = allpickNum[i + 1];
                    }
                }
                returnVal = allpickNum.join(",").replace(/,-,/g, "-");
                for (var i = 2; i < allpickNum.length - 1; i++) {
                    returnVal = returnVal.replace('-,', '-');
                    returnVal = returnVal.replace('--', '-');
                }
            }
            return returnVal;
        }

        $scope.clearSelectRow = function () {
            if ($scope.pickCount == 2) {
                $scope.allPickNum[0] = [];
                $scope.allPickNum[1] = [];
            }
            if ($scope.pickCount == 3) {
                $scope.allPickNum[0] = [];
                $scope.allPickNum[1] = [];
                $scope.allPickNum[2] = [];
            }
            $scope.getAvailableWagers();
        }

        $scope.clickNum = function (num) {
            if ($scope.allPickNum[$scope.selectRowType].length > 0) {
                var index = $scope.allPickNum[$scope.selectRowType].indexOf(num);
                if (index != -1) {
                    $scope.allPickNum[$scope.selectRowType].splice(index, 1);
                    $scope.allPickNum[$scope.selectRowType].sort();
                }
                else {
                    $scope.allPickNum[$scope.selectRowType].push(num);
                    $scope.allPickNum[$scope.selectRowType].sort();
                }
            }
            else {
                $scope.allPickNum[$scope.selectRowType].push(num);
                $scope.allPickNum[$scope.selectRowType].sort();
            }
            $scope.getAvailableWagers();
        }

        $scope.getClickNumCSS = function (num) {
            var active = false;
            if ($scope.allPickNum[$scope.selectRowType]) {
                active = $scope.allPickNum[$scope.selectRowType].indexOf(num) != -1;
            }
            return active;
        }

        $scope.pick = function (row, num) {
            $scope.pickNum[row] = num;
            for (var i = 0; i < $scope.pickCount; i++) {
                if ($scope.pickNum[i] == null)
                    return;
            }
            $scope.addWager({ betType: "pick" + $scope.pickCount, selection: $scope.pickNum });
            $scope.refreshPick();
        }

        $scope.refreshPick = function () {
            $scope.pickNum = [];
        }

        $scope.$on("refreshPick", function onRefresh(event, args) {
            $scope.refreshPick();
        });

        $scope.getAvailableWagers = function () {
            var checkPick = [];
            $scope.availableWagers = [];
            var allpick1 = angular.copy($scope.allPickNum[0]);
            var allpick2 = angular.copy($scope.allPickNum[1]);
            var allpick3 = angular.copy($scope.allPickNum[2]);

            if ($scope.pickCount == 2) {
                for (var i = 0; i < allpick1.length; i++) {
                    for (var j = 0; j < allpick2.length; j++) {
                        var temp = $filter('filter')(checkPick, [allpick1[i], allpick2[j]].sort().join().replace(',', ''))[0];
                        if (!temp) {
                            checkPick.push([allpick1[i], allpick2[j]].sort().join().replace(',', ''));
                            $scope.availableWagers.push([allpick1[i], allpick2[j]].sort());
                        }
                    }
                }
            }

            if ($scope.pickCount == 3) {
                for (var i = 0; i < allpick1.length; i++) {
                    for (var j = 0; j < allpick2.length; j++)
                        for (var k = 0; k < allpick3.length; k++) {
                            var temp = $filter('filter')(checkPick, [allpick1[i], allpick2[j], allpick3[k]].sort().join().replace(',', ''))[0];
                            if (!temp) {
                                checkPick.push([allpick1[i], allpick2[j], allpick3[k]].sort().join().replace(',', ''));
                                $scope.availableWagers.push([allpick1[i], allpick2[j], allpick3[k]].sort());
                            }
                        }
                }
            }
        }

        $scope.addAvailableWagers = function () {
            if (gv.wagerLimitInOneBet && ($scope.availableWagers.length + $scope.getWagerList().length) > gv.wagerLimitInOneBet) {
                $dialog.show(R.Text.Error, $filter("stringFormat")(R.Message.TooManyWagers, gv.wagerLimitInOneBet), [{
                    Text: R.Text.Btn_Close,
                    Callback: function () {
                        $dialog.close();
                    }
                }]);
                return;
            }

            var cnt = 0;
            for (var i = 0; i < $scope.pickCount; i++) {
                if ($scope.pickNum[i] == null) cnt++;
            }

            switch (cnt) {
                case 0:
                    $scope.addWager({ betType: "pick" + $scope.pickCount, selection: $scope.pickNum }, 0);
                    $scope.refreshPick();
                    break;
                case 1:
                    var str = $scope.pickNum.join("");
                    for (var i = 0; i < 10; i++) {
                        var arr = (str + i).split("").map(function (o) { return parseInt(o); });
                        $scope.addWager({ betType: "pick" + $scope.pickCount, selection: arr }, 0);
                    }
                    $scope.refreshPick();
                    break;
                case 2:
                case 3:
                    var addPickList = angular.copy($scope.availableWagers);
                    for (var i = 0; i < addPickList.length; i++) {
                        $scope.addWager({
                            betType: "pick" + $scope.pickCount,
                            selection: addPickList[i]
                        }, 0);
                    }
                    $scope.availableWagers = [];
                    $scope.allPickNum[0] = [];
                    $scope.allPickNum[1] = [];
                    $scope.allPickNum[2] = [];
                    break;
                default:
                    break;
            }
        }
    }])
    .controller("trendCtrl", ["$rootScope", "$scope", "$counterService", "$trendCache", "$timeout", function ($rootScope, $scope, $counterService, $trendCache, $timeout) {
        var counterId = 0;
        var rowsCount = 6;
        var colCount = 22;
        var unbound = false;

        $scope.init = function (para) {
            rowsCount = para.rowsCount;
            colCount = para.colCount;
            unbound = !!para.unbound;

            counterId = para.counterId ? para.counterId : $scope.counter.id;

            $rootScope.$$listeners["getTrend_" + counterId] = null;
            $rootScope.$$listenerCount["getTrend_" + counterId] = null;
            $rootScope.$on("getTrend_" + counterId, function (event, args) {
                $scope.getTrends();
            });

            $scope.trendData = $trendCache.getTrendData(counterId);
            $scope.trendView = $trendCache.getTrendView(counterId);
            $scope.trendType = $trendCache.getTrendType(counterId);
            $scope.trendBall = $trendCache.getTrendBall(counterId);
            $scope.trendTable = $trendCache.genDefaultTrendTable(rowsCount, colCount);
            $scope.refreshTrendTable();
            angular.element("#trendRefreshImg").hide();
        }

        $scope.getTrends = function (isRefresh) {
            $counterService.getTrends(counterId).success(function (result) {
                if (isRefresh) {
                    $timeout(function () {
                        angular.element("#trendRefreshImg").hide();
                        angular.element("#trendRefreshBtn").show();
                    }, 500)
                }
                if (result.isSuccess) {
                    $timeout(function () {
                        $scope.trendData = $trendCache.setTrendData(counterId, result.data);
                        $scope.refreshTrendTable();
                    }, 500)
                }
            });
        }

        $scope.refreshTrend = function () {
            angular.element("#trendRefreshImg").show()
            angular.element("#trendRefreshBtn").hide();
            $scope.getTrends(true);
        }

        $scope.$on("initTrendView", function onRefresh(event, args) {
            $scope.trendData = $trendCache.getTrendData(counterId);
            $scope.refreshTrendTable();
        });

        $scope.$watchGroup(["trendView", "trendType", "trendBall"], function (newValue, oldValue) {
            $scope.trendView = $trendCache.setTrendView(counterId, newValue[0]);
            $scope.trendType = $trendCache.setTrendType(counterId, newValue[1]);
            $scope.trendBall = $trendCache.setTrendBall(counterId, newValue[2]);
            $scope.refreshTrendTable();
        });

        $scope.refreshTrendTable = function () {
            if ($scope.trendData.length == 0)
                return;

            var lastType = "";
            var ri = 0;
            var ci = -1;
            var bi = 0;
            var columnLength = colCount;

            var block = new Object();
            var blockRow = rowsCount - 1;

            var trendTable = new Object();

            var bigCount = 0;
            var oddCount = 0;
            var numCountDir = new Object();
            var spanDir = new Object();

            if ($scope.trendBall != -1)
                for (var i = 0; i < 10; i++) numCountDir[i] = 0;

            for (var i = 0; i < $scope.trendData.length; i++) {
                var sum = 0;
                var num = 0;

                // Select display ball number
                if ($scope.trendBall == -1) {
                    var max = 0, min = 10;
                    for (var ni = 0; ni < 3; ni++) {
                        var ball = parseInt($scope.trendData[i].resultBalls[ni]);
                        max = ball > max ? ball : max;
                        min = ball < min ? ball : min;
                        sum += ball;
                    }
                    num = sum % 10;
                    if (spanDir[(max - min)] == null) spanDir[(max - min)] = 0;
                    spanDir[(max - min)]++;
                } else {
                    sum = $scope.trendData[i].resultBalls[$scope.trendBall - 1];
                    num = sum;
                }

                // Select display type
                var type = "";
                if ($scope.trendType == "bs" || $scope.trendType == "ball") {
                    type = (num > 4) ? "b" : "s";
                } else if ($scope.trendType == "oe") {
                    type = (sum % 2) ? "o" : "e";
                }

                // Graph Rate
                if (num > 4) bigCount++;
                if (sum % 2) oddCount++;
                if (numCountDir[sum] == null) numCountDir[sum] = 0;
                numCountDir[sum]++;

                // Select display view type
                if ($scope.trendView == "bead") {
                    // 珠路
                    ri = (i % rowsCount);
                    if (ri == 0) ci++;
                } else {
                    //大路
                    if (lastType == "" || lastType != type) {
                        //換路
                        block[ri] = (ci + bi);
                        var blockRow = rowsCount;
                        if (++ci != 0) {
                            var nextci = ci;
                            $.each(block, function (idx, val) {
                                if (ri == 0)
                                    nextci = Math.max(nextci, val);
                                if (val >= ci)
                                    blockRow = Math.min(blockRow, idx);
                            });
                            if (nextci != ci && blockRow <= 1) {
                                ci = nextci + 1;
                                blockRow = rowsCount;
                            }
                        }
                        blockRow--;

                        ri = 0;
                        bi = 0;
                    } else if (ri == blockRow) {
                        //貼底
                        bi++;
                        var newBlockLen = (ci + bi);
                        if (newBlockLen > block[blockRow])
                            block[blockRow] = newBlockLen;
                    }
                    else {
                        ri++;
                    }

                    lastType = type;
                }

                if (trendTable[ri] == null)
                    trendTable[ri] = new Object();

                trendTable[ri][(ci + bi)] = {
                    drawNo: $scope.trendData[i].drawNo,
                    type: type,
                    sum: sum
                };
                columnLength = Math.max(columnLength, (ci + bi) + 1);
            }

            var tmpColCount = (unbound) ? columnLength : colCount;
            var resultTable = $trendCache.genDefaultTrendTable(rowsCount, tmpColCount);

            //位移
            var move = (unbound) ? 0 : (columnLength - colCount);
            for (var ri = 0; ri < rowsCount; ri++) {
                if (trendTable[ri] == null) continue;
                for (var ci = move; ci < columnLength; ci++) {
                    var trend = trendTable[ri][ci];
                    if (trend) {
                        resultTable[ri][(ci - move)] = trend;
                    }
                }
            }

            // Graph Rate
            var numCountArr = [];
            var spanArr = [];

            for (var key in numCountDir)
                numCountArr.push({ num: key, val: numCountDir[key] });

            for (var key in spanDir)
                spanArr.push({ num: key, val: spanDir[key] });

            $scope.numCountArr = numCountArr.sort(function (a, b) {
                return a.val < b.val ? -1 : (a.val > b.val ? 1 : 0);
            });

            $scope.spanArr = spanArr.sort(function (a, b) {
                return a.val < b.val ? -1 : (a.val > b.val ? 1 : 0);
            });

            if ($scope.trendData.length == 0) {
                $scope.bigRate = $scope.oddRate = null;
            } else {
                $scope.bigRate = Math.round((bigCount / $scope.trendData.length) * 100);
                $scope.oddRate = Math.round((oddCount / $scope.trendData.length) * 100);
            }
            $scope.trendTable = resultTable;
        }

        $scope.toggleFooterType = function () {
            $scope.trendView = ($scope.trendView == "statistics") ? "big" : "statistics";
            if (!$scope.isShowFooter) {
                $scope.isShowFooter = true;
                $scope.$emit("toggleGreyOut",
                    function () {
                        $scope.isShowFooter = false;
                    });
            }

            if ($scope.trendView == 'big' && $scope.isShowFooter) {
                $scope.scrollToRight();
            }
        }

        $scope.toggleFooter = function () {
            $scope.isShowFooter = !$scope.isShowFooter;
            $scope.$emit("toggleGreyOut",
                function () {
                    $scope.isShowFooter = false;
                });

            if ($scope.isShowFooter) {
                $scope.scrollToRight();
            }
        }

        $scope.scrollToRight = function () {
            $timeout(function () {
                var viewboxAry = [];
                if ($('.ball').length > 0) {
                    for (var i = 0; i < $('.ball').length - 1; i++) {
                        viewboxAry.push($('.ball')[i].offsetLeft);
                    }
                } else {
                    for (var i = 0; i < $('.sb').length - 1; i++) {
                        viewboxAry.push($('.sb')[i].offsetLeft);
                    }
                }
                var maxLeft = Math.max.apply(null, viewboxAry);
                $('.trendviewbox').scrollLeft(maxLeft - window.innerWidth + 25);
            }, 100);
        }

        $scope.toggleTrendType = function (trendType) {
            $scope.trendType = trendType;
            $scope.scrollToRight();
        }

        $scope.toggleTrendBall = function (trendBall) {
            $scope.trendBall = trendBall;
            $scope.scrollToRight();
        }

        $scope.$watch("isShowFooter", function (oldValue, newValue) {
            if (oldValue != newValue) {
                if (!newValue) {
                    angular.element("#footerTrend").addClass("open");
                    angular.element("#footerTrend").removeClass("closed");
                }
                else {
                    angular.element("#footerTrend").addClass("closed");
                    angular.element("#footerTrend").removeClass("open");
                }
            }
        });
    }])
    .controller("resultCtrl", ["$scope", function ($scope) {
        $scope.init = function (resultBalls) {
            $scope.balls = [];
            if (resultBalls.length == 0) {
                $scope.last3 = [];
                $scope.sum = "";
                $scope.span = "";
                return;
            }

            for (var i = resultBalls.length - 1; i >= 0; i--) {
                if (resultBalls[i] >= 0) {
                    $scope.balls.push(resultBalls[i]);
                }
            }

            $scope.last3 = $scope.balls.length == 5 ? $scope.balls.slice(resultBalls.length - 3) : $scope.balls;

            var sum = 0, max = 0, min = 10;
            for (var i = 0; i < $scope.last3.length; i++) {
                var ball = $scope.last3[i];
                max = ball > max ? ball : max;
                min = ball < min ? ball : min;
                sum += ball;
            }
            $scope.sum = sum;
            $scope.span = max - min;
        }

        $scope.$parent.$watch("counter.displayGameResult.resultBalls", function (resultBalls) {
            $scope.init(resultBalls);
        });

        $scope.isGetResult = function () {
            return (this.balls.length > 0 && this.getStatus() == 'result');
        }
    }])
    .controller("miniCounterCtrl", ["$scope", "$counterService", "$counterCache", function ($scope, $counterService, $counterCache) {
        $scope.canExpand = true;
        $scope.hover = function (canExpand) {
            $scope.canExpand = canExpand;
        };
        $scope.expandCollapse = function () {
            if (this.miniCounter.id != $scope.counter.id && $scope.canExpand)
                this.miniCounter.expand = !this.miniCounter.expand;
        }
    }])
    .controller("twoFixedCtrl", ["$scope", "$dialog", "$filter", function ($scope, $dialog, $filter) {
        $scope.pickedNums = {};
        $scope.availableWagers = {};

        ["54", "53", "52", "51", "43", "42", "41", "32", "31", "21"].forEach(function (sel) {
            $scope.pickedNums[sel] = { 0: [], 1: [] };
            $scope.availableWagers[sel] = 0;
        })

        $scope.setBallNum = function (n1, n2) {
            $scope.ballNum = [n1, n2];
            $scope.ballNumStr = "" + $scope.ballNum[0] + $scope.ballNum[1];
        }

        $scope.pick = function (pos, num) {
            var i = $scope.pickedNums[$scope.ballNumStr][pos].indexOf(num);
            if (i < 0) $scope.pickedNums[$scope.ballNumStr][pos].push(num);
            else $scope.pickedNums[$scope.ballNumStr][pos].splice(i, 1);

            $scope.availableWagers[$scope.ballNumStr] =
                $scope.pickedNums[$scope.ballNumStr][0].length *
                $scope.pickedNums[$scope.ballNumStr][1].length;
        }

        $scope.isPick = function (pos, num) {
            return $scope.pickedNums[$scope.ballNumStr][pos].indexOf(num) >= 0;
        }

        $scope.clearPick = function () {
            $scope.pickedNums[$scope.ballNumStr] = { 0: [], 1: [] };
            $scope.availableWagers[$scope.ballNumStr] = 0;
        }

        $scope.addAvailableWagers = function () {
            if (gv.wagerLimitInOneBet && ($scope.availableWagers[$scope.ballNumStr] + $scope.getWagerList().length) > gv.wagerLimitInOneBet) {
                $dialog.show(R.Text.Error, $filter("stringFormat")(R.Message.TooManyWagers, gv.wagerLimitInOneBet), [{
                    Text: R.Text.Btn_Close,
                    Callback: function () {
                        $dialog.close();
                    }
                }]);
                return;
            }

            $scope.pickedNums[$scope.ballNumStr][0].forEach(function (n1) {
                $scope.pickedNums[$scope.ballNumStr][1].forEach(function (n2) {
                    $scope.addWager({ betType: "num", selection: "" + n1 + n2 }, $scope.ballNumStr);
                });
            });

            $scope.clearPick();
        }
    }])
    .controller("threeFixedCtrl", ["$scope", "$dialog", "$filter", function ($scope, $dialog, $filter) {
        $scope.pickedNums = {};
        $scope.availableWagers = {};

        ["543", "432", "321"].forEach(function (sel) {
            $scope.pickedNums[sel] = { 0: [], 1: [], 2: [] };
            $scope.availableWagers[sel] = 0;
        })

        $scope.setBallNum = function (n1, n2, n3) {
            $scope.ballNum = [n1, n2, n3];
            $scope.ballNumStr = "" + $scope.ballNum[0] + $scope.ballNum[1] + $scope.ballNum[2];
        }

        $scope.pick = function (pos, num) {
            var i = $scope.pickedNums[$scope.ballNumStr][pos].indexOf(num);
            if (i < 0) $scope.pickedNums[$scope.ballNumStr][pos].push(num);
            else $scope.pickedNums[$scope.ballNumStr][pos].splice(i, 1);

            $scope.availableWagers[$scope.ballNumStr] =
                $scope.pickedNums[$scope.ballNumStr][0].length *
                $scope.pickedNums[$scope.ballNumStr][1].length *
                $scope.pickedNums[$scope.ballNumStr][2].length;
        }

        $scope.isPick = function (pos, num) {
            return $scope.pickedNums[$scope.ballNumStr][pos].indexOf(num) >= 0;
        }

        $scope.clearPick = function () {
            $scope.pickedNums[$scope.ballNumStr] = { 0: [], 1: [], 2: [] };
            $scope.availableWagers[$scope.ballNumStr] = 0;
        }

        $scope.addAvailableWagers = function () {
            if (gv.wagerLimitInOneBet && ($scope.availableWagers[$scope.ballNumStr] + $scope.getWagerList().length) > gv.wagerLimitInOneBet) {
                $dialog.show(R.Text.Error, $filter("stringFormat")(R.Message.TooManyWagers, gv.wagerLimitInOneBet), [{
                    Text: R.Text.Btn_Close,
                    Callback: function () {
                        $dialog.close();
                    }
                }]);
                return;
            }

            $scope.pickedNums[$scope.ballNumStr][0].forEach(function (n1) {
                $scope.pickedNums[$scope.ballNumStr][1].forEach(function (n2) {
                    $scope.pickedNums[$scope.ballNumStr][2].forEach(function (n3) {
                        $scope.addWager({ betType: "num", selection: "" + n1 + n2 + n3 }, $scope.ballNumStr);
                    });
                });
            });

            $scope.clearPick();
        }
    }]);

app.filter("drawNoFormat", function () {
    return function (drawNo) {
        return drawNo == null || drawNo == undefined ? R.Text.Lbl_NA : drawNo;
    }
})
    .filter("gameResultToString", function () {
        return function (balls) {
            var result = "";
            if (balls) {
                for (var i = balls.length - 1; i >= 0; i--) {
                    if (balls[i] !== -1) {
                        result += balls[i];
                    }
                }
            }
            return result;
        }
    })
    .filter("ballNumberFormat", function () {
        return function (ballNumber) {
            if (ballNumber % 10 == 1)
                return "st";
            else if (ballNumber % 10 == 2)
                return "nd";
            else if (ballNumber % 10 == 3)
                return "rd";
            return "th";
        }
    })
    .filter("positionText", function () {
        return function (position) {
            switch (position) {
                case 1:
                    return R.Game.LottoResultPosition_OneDigit;
                case 2:
                    return R.Game.LottoResultPosition_TwoDigit;
                case 3:
                    return R.Game.LottoResultPosition_ThreeDigit;
                case 4:
                    return R.Game.LottoResultPosition_FourDigit;
                case 5:
                    return R.Game.LottoResultPosition_FiveDigit;
            }
            return "";
        }
    })
    .filter("ballNumberStyle", function () {
        return function (position) {
            return {
                "5": "th5",
                "4": "th4",
                "3": "rd3",
                "2": "nd2",
                "1": "st1",
            }[position];
        }
    });;
if (!app) {
    var app = angular.module("app", ["ui.materialize", "componentsModule", "reportModule", "systemModule", "counterModule"]);
}

app.controller("openbetCtrl", ["$rootScope", "$scope", "$location", "$reportService", "$dialog", "$util", "$timeout", function ($rootScope, $scope, $location, $reportService, $dialog, $util, $timeout) {
    var currentPage = 0;
    var pageSize = 50;

    $scope.init = function () {
        $scope.wagerList = [];

        if ($scope.isLazyLoading)
            $util.onScrollToBottom(function () {
                if (currentPage > 0) $scope.search();
            });
        if (gv.mobile) {
            getData();
        }
    }

    $scope.$on("$locationChangeSuccess", function () {
        getData();
    });
    $scope.changeProduct = function () {
        $location.path($scope.selectedProduct, false);
        currentPage = 0;
        $rootScope.wagerCount = undefined;
        $scope.wagerList = [];
    }

    $scope.search = function () {
        initProductList();

        if ($scope.isLazyLoading) {
            if (currentPage * pageSize >= $rootScope.wagerCount) return;
            $reportService.getOpenBet($scope.selectedProduct, currentPage + 1, pageSize).success(function (result) {
                if (result.isSuccess) {
                    currentPage++;
                    if (currentPage > 1 && ($rootScope.wagerCount !== result.data.totalCount || $scope.stake !== result.data.totalStake))
                        refreshWagerList();
                    else {
                        $rootScope.wagerCount = result.data.totalCount;
                        $scope.stake = result.data.totalStake;
                        $scope.estWinning = result.data.totalReturnAmount;
                        result.data.wagers.forEach(function (item) { $scope.wagerList.push(item); });
                        $scope.$emit("openBetTotalInfo", { stake: $scope.stake, estWinning: $scope.estWinning });
                    }
                } else {
                    $scope.wagerList = [];
                    $dialog.show(R.Text.Error, result.msg);
                }
                $scope.isLoading = false;
            });
        }
        else {
            $reportService.getOpenBet($scope.selectedProduct, 1, 2000).success(function (result) {
                if (result.isSuccess) {
                    $scope.wagerList = result.data.wagers;
                    console.log($scope.wagerList);
                } else {
                    $scope.wagerList = [];
                    $dialog.show(R.Text.Error, result.msg);
                }
                $scope.isLoading = false;
            });
        }
    }
    function getData() {
        $util.checkSupportProduct();

        $scope.isLoading = true;
        $scope.search();
    }
    function refreshWagerList() {
        $reportService.getOpenBet($scope.selectedProduct, 1, pageSize * currentPage).success(function (result) {
            if (result.isSuccess) {
                $scope.wagerList = result.data.wagers;
                $rootScope.wagerCount = result.data.totalCount;
                $scope.stake = result.data.totalStake;
                $scope.$emit("openBetTotalInfo", { stake: $scope.stake, estWinning: $scope.estWinning });
            } else {
                $dialog.show(R.Text.Error, result.msg);
            }
        });
    }

    function initProductList() {
        $scope.productList = gv.productList;

        var product = $location.path().replace("/", "") === "" ? gv.product : $location.path().replace("/", "");
        for (var key in $scope.productList) {
            if ($scope.productList[key].value === product) {
                $scope.selectedProduct = $scope.productList[key].value;
                break;
            }
        }

        if (!$scope.selectedProduct) {
            $scope.selectedProduct = $scope.productList[0].value;
            $location.path($scope.selectedProduct, false);
        }
    }
}]);;
if (!app) {
    var app = angular.module("app", ["componentsModule", "memberModule", "systemModule"]);
}

app.controller("profileCtrl", ["$rootScope", "$scope", "$memberService", "$location", "$util", "$dialog", function ($rootScope, $scope, $memberService, $location, $util, $dialog) {
    var pickCount = 0;

    $scope.init = function () {
        $util.checkSupportProduct();

        $memberService.getChips().success(function (result) {
            $scope.chips = result.data;

            for (var index in $scope.chips) {
                if ($scope.chips[index].favorite)
                    pickCount++;
            }
        });
    }

    $scope.pick = function (index, isSetting, $event) {
        if ($event) {
            $event.stopImmediatePropagation();
            $event.preventDefault();
        }
        var newVal = !$scope.chips[index].favorite;

        if (newVal && pickCount >= 4) {
            $dialog.show(R.Text.Error, R.Text.LimitationOfTokenSize);
            return;
        } else if (!newVal && pickCount <= 1) {
            $dialog.show(R.Text.Error, R.Text.LimitationOfTokenSize);
            return;
        }

        $scope.chips[index].favorite = newVal;
        if (newVal) pickCount++;
        else pickCount--;

        if (isSetting) {
            $scope.save(true);
        }
    }

    $scope.save = function (isMobileView) {
        var chips = [];
        isMobileView = !isMobileView ? false : isMobileView;
        for (var index in $scope.chips) {
            if ($scope.chips[index].favorite)
                chips.push($scope.chips[index]);
        }

        $memberService.setUsedChips(chips).success(function (result) {
            if (result.isSuccess) {
                if (!isMobileView)
                    $dialog.show(R.Text.UpdatedSuccessfully, R.Text.UpdatedSuccessfully);
            } else {
                $dialog.show(R.Text.Error, result.msg);
            }
        });
    }

    $scope.changeProduct = function () {
        $location.path($scope.selectedProduct, false);
    }
}]);;
if (!app) {
    var app = angular.module("app", ["ui.materialize", "componentsModule", "reportModule", "systemModule", "counterModule"]);
}

app.controller("resultCtrl", ["$rootScope", "$scope", "$location", "$filter", "$counterService", "$dialog", "$util",
    function ($rootScope, $scope, $location, $filter, $counterService, $dialog, $util) {
        $rootScope.$watch('selectedDate', function (newValue, oldValue) {
            if (newValue != null && newValue != oldValue) {
                if (newValue == -1) {
                    angular.element('#yesterdayResult').addClass('active');
                    angular.element('#todayResult').removeClass('active');
                }
                else {
                    angular.element('#todayResult').addClass('active');
                    angular.element('#yesterdayResult').removeClass('active');
                }
            }
        });

        $scope.initMobile = function () {
            $rootScope.selectedDate = 0;
            angular.element('#todayResult').addClass('active');
            $scope.resultList = [];
            $scope.scroll.pageNum = 1;
            $scope.scroll.pageSize = 50;
            $scope.selectedCounter = gv.counterID ? gv.counterID.toString() : null;
            initProductList();
            initCounterList();
            $scope.date = dateFormatgmt8($util.addDays(new Date(), $rootScope.selectedDate));
            $scope.getGameResults();
            if ($scope.isLazyLoading) {
                $util.onScrollToBottom(function () {
                    $scope.scroll.fetch();
                });
            }
        }

        $scope.init = function () {
            $scope.scroll.pageSize = 2000;
            $scope.selectedCounter = $location.search().counterid ? parseInt($location.search().counterid) : null;

            initProductList();
            initCounterList();
            initDate();

            $scope.getGameResults();
        }

        $scope.changeProduct = function () {
            $location.path($scope.selectedProduct, false);
            $scope.selectedCounter = null;
            initProductList();
            initCounterList();
            initDate();

            $scope.getGameResults();
        }

        $scope.dayRange = function (toDays) {
            $rootScope.selectedDate = toDays;
            $scope.date = dateFormatgmt8($util.addDays(new Date(), toDays));
            $scope.drawNo = "";
            $scope.getGameResults();
        }

        $scope.scroll = {};
        $scope.scroll.Loading = false;
        $scope.scroll.finish = false;
        $scope.scroll.fetch = function () {
            if ($scope.scroll.finish || $scope.scroll.Loading) return;
            $scope.scroll.Loading = true;

            $counterService.getGameResults(
                $scope.selectedProduct,
                $scope.selectedCounter,
                $scope.drawNo,
                $scope.date,
                ($scope.scroll.pageNum + 1),
                $scope.scroll.pageSize
            ).success(function (result) {
                if (result.isSuccess) {
                    if (result.data.gameResults.length > 0) {
                        result.data.gameResults.forEach(setResultBall);
                        $scope.resultList = $scope.resultList.concat(result.data.gameResults);
                        $scope.scroll.pageNum++;
                    } else {
                        $scope.scroll.finish = true;
                    }
                } else {
                    $dialog.show(R.Text.Error, result.msg);
                }
            }).finally(function () {
                $scope.scroll.Loading = false;
            });
        }

        $scope.getResultDetail = function (resultBalls) {
            var total = 0, upCnt = 0, oddCnt = 0;
            for (var i = 0; i < resultBalls.length; i++) {
                var ball = resultBalls[i];
                total += ball;
                if (ball <= 40) upCnt++;
                if (ball % 2) oddCnt++;
            }
            $scope.total = total;
            $scope.bs = total == 810 ? "t" : (total > 810 ? "b" : "s");
            $scope.oe = total % 2 ? "o" : "e";
            $scope.ud = upCnt == 10 ? "t" : (upCnt > 10 ? "u" : "d");
            $scope.oses = oddCnt == 10 ? "t" : (oddCnt > 10 ? "os" : "es");
            $scope.ele = $scope.getElement(total);
        }

        $scope.getElement = function (total) {
            var ele = "";
            if (total <= 695) {
                ele = "g";
            } else if (total <= 763) {
                ele = "wo";
            } else if (total <= 855) {
                ele = "wa";
            } else if (total <= 923) {
                ele = "f";
            } else {
                ele = "ea";
            }

            return ele;
        }

        $scope.getResultBallClass = function (balls, ballNum) {
            var r = {};

            var cnt = balls.filter(function (val) { return val > -1; }).length;

            if ((ballNum == 5 && balls[4] > -1) || (ballNum == 3 && balls[4] < 0)) r["offset-s1"] = true;

            if (cnt == 3) {
                r.s3 = true;
                r["td-3"] = true
            }

            if (cnt == 5) {
                r.s2 = true;
                r["td-5"] = true
            }

            if (ballNum == 1) r["box-1st"] = true;
            if (ballNum == 2) r["box-2nd"] = true;
            if (ballNum == 3) r["box-3rd"] = true;
            if (ballNum == 4) r["box-4th"] = true;
            if (ballNum == 5) r["box-5th"] = true;

            return r;
        }

        $scope.getGameResults = function (event) {
            $util.checkSupportProduct(event);

            $scope.isGettingResult = true;
            $counterService.getGameResults(
                $scope.selectedProduct,
                $scope.selectedCounter,
                $scope.drawNo,
                $scope.date,
                $scope.scroll.pageNum,
                $scope.scroll.pageSize
            ).success(function (result) {
                if (result.isSuccess) {
                    result.data.gameResults.forEach(setResultBall);
                    $scope.resultList = result.data.gameResults;
                } else {
                    $dialog.show(R.Text.Error, result.msg);
                }
                $scope.isGettingResult = false;
            });
        }

        function initProductList() {
            $scope.productList = gv.productList;
            $scope.selectedProduct = $location.path().replace("/", "")
                ? $location.path().replace("/", "")
                : gv.product ? gv.product : $scope.productList[0].value;
            $scope.counterList = gv.counterListDic[$scope.selectedProduct];
        }

        function initCounterList() {
            if (!$scope.selectedCounter) {
                if ($scope.isLazyLoading) {
                    $scope.selectedCounter = $scope.counterList[0].value.toString();
                } else {
                    $scope.selectedCounter = $scope.counterList[0].value;
                }
            }
            $scope.displayCounter = $filter("counterName")($scope.selectedCounter);
        }

        function initDate() {
            $scope.date = $scope.date ? $scope.date : dateFormatgmt8(new Date());
            $scope.displayDate = $scope.date;
        }

        function setResultBall(item) {
            for (var i = 0; i < item.resultBalls.length; i++)
                item['ball_' + (i + 1)] = item.resultBalls[i] >= 0 ? item.resultBalls[i] : null;
            item.last3 = [item.ball_3, item.ball_2, item.ball_1];
            var sum = 0;
            var max = item.last3[0], min = item.last3[0];
            item.last3.forEach(function (value) {
                sum += value;
                max = value > max ? value : max;
                min = value < min ? value : min;
            });
            item.sum = sum;
            item.span = max - min;
        }
        function dateFormatgmt8(date) {
            return $filter("dateFormatgmt8")(date);
        }
    }])

    .filter("counterName", function () {
        return function (counterId) {
            var key = "CounterName_" + counterId;
            return (R.Game[key]) ? R.Game[key].toUpperCase() : key;
        }
    });;
if (!app) {
    var app = angular.module("app", ["componentsModule", "systemModule"]);
}

app.controller("ruleCtrl", ["$rootScope", "$scope", "$location", "$sce", "$systemService", "$util", "$timeout", function ($rootScope, $scope, $location, $sce, $systemService, $util, $timeout) {
    $scope.init = function () {
        $timeout(function () {
            $util.checkSupportProduct();

            initProductList();

            $scope.rules = "";
            $systemService.getRules($scope.selectedProduct).success(function (result) {
                if (result.isSuccess) {
                    $scope.rules = $sce.trustAsHtml(result.data);
                }
            });
        }, 100);
    }

    $scope.$on("$locationChangeSuccess", function (event) {
        $util.checkSupportProduct();

        initProductList();

        $scope.rules = "";
        $systemService.getRules($scope.selectedProduct).success(function (result) {
            if (result.isSuccess) {
                $scope.rules = $sce.trustAsHtml(result.data);
            }
        });
    });

    $scope.changeProduct = function () {
        $location.path($scope.selectedProduct, false);
    }

    function initProductList() {
        $scope.productList = gv.productList;

        var product = $location.path().replace("/", "") === "" ? gv.product : $location.search().product;
        for (var key in $scope.productList) {
            if ($scope.productList[key].value == product) {
                $scope.selectedProduct = $scope.productList[key].value;
                break;
            }
        }

        if (!$scope.selectedProduct) {
            $scope.selectedProduct = $scope.productList[0].value;
            $location.path($scope.selectedProduct, false);
        }
    }
}]);;
if (!app) {
    var app = angular.module("app", ["ui.materialize", "componentsModule", "reportModule", "counterModule"]);
}

app.controller("statementCtrl", ["$rootScope", "$scope", "$window", "$location", "$filter", "$reportService", "$dialog", "$util", function ($rootScope, $scope, $window, $location, $filter, $reportService, $dialog, $util) {
    var currentPage = 0;
    var pageSize = 50;

    $scope.init = function (displayMode) {
        $scope.displayResult = false;

        $scope.displayMode = displayMode;
        $scope.wagerList = [];
        currentPage = 0;

        if ($scope.isLazyLoading) {
            $util.onScrollToBottom(function () {
                if (!!$scope.product && currentPage > 0) $scope.searchData();
            });
        }
        if (gv.mobile) {
            $util.checkSupportProduct();
            $scope.searchData();
        }
    }

    $scope.$on("$locationChangeSuccess", function () {
        $util.checkSupportProduct();
        $scope.searchData();
    });
    $scope.searchData = function () {
        initProductList();
        initDate();

        if (!$scope.product) {
            $scope.statementDic = [];
            $reportService.getStatement($scope.dateFrom, $scope.dateTo).success(function (result) {
                if (result.isSuccess) {
                    $scope.statementDic = result.data;
                    $scope.statementDicCount = {};
                    $scope.statementDicCount.total = countOwnProperties(result.data);
                    $scope.statementDicCount.keno = countOwnSpecificProperties(result.data, "keno");
                    $scope.statementDicCount.lotto = countOwnSpecificProperties(result.data, "lotto");

                    $scope.$emit("statementTotalInfo", { product: $scope.product, statementDic: result.data });
                } else {
                    $dialog.show(R.Text.Error, result.msg);
                }
            });
        } else {
            if ($scope.isLazyLoading) {
                if ($scope.totalCount && currentPage * pageSize >= $scope.totalCount) return;
                $reportService.getStatementDetails($scope.selectedProduct, $scope.date, currentPage + 1, pageSize).success(function (result) {
                    if (result.isSuccess) {
                        currentPage++;
                        if (currentPage > 1 && ($scope.totalCount != result.data.TotalCount || $scope.totalStake != result.data.TotalStake || $scope.totalWinLoss != result.data.TotalWinLoss)) {
                            refreshWagerList();
                        } else {
                            $scope.totalCount = result.data.totalCount;
                            $scope.totalStake = result.data.totalStake;
                            $scope.totalWinLoss = result.data.totalReturnAmount;
                            result.data.wagers.forEach(function (item) { $scope.wagerList.push(item); });
                            $scope.$emit("statementDetailTotalInfo", { product: $scope.product, totalStake: $scope.totalStake, totalWinLoss: $scope.totalWinLoss });
                        }
                    } else {
                        $scope.wagerList = [];
                        $dialog.show(R.Text.Error, result.msg);
                    }
                });
            } else {
                $scope.wagerList = [];
                $reportService.getStatementDetails($scope.product, $scope.date, 1, 2000).success(function (result) {
                    if (result.isSuccess) {
                        $scope.wagerList = result.data.wagers;
                    } else {
                        $dialog.show(R.Text.Error, result.msg);
                    }
                });
            }
        }
    };

    function refreshWagerList() {
        $reportService.getStatementDetails($scope.selectedProduct, $scope.date, 1, pageSize * currentPage).success(function (result) {
            if (result.isSuccess) {
                $scope.totalCount = result.data.totalCount;
                $scope.totalStake = result.data.totalStake;
                $scope.totalWinLoss = result.data.totalReturnAmount;
                $scope.wagerList = result.data.wagers;
                $scope.$emit("statementDetailTotalInfo", { product: $scope.product, totalStake: $scope.totalStake, totalWinLoss: $scope.totalWinLoss });
            } else {
                $scope.wagerList = [];
                $dialog.show(R.Text.Error, result.msg);
            }
        });
    }

    $scope.back = function () {
        $window.history.back();
    }

    $scope.details = function (product, date, keyDate) {
        currentPage = 0;
        $scope.wagerList = [];
        $location.search({ "product": product, "date": $filter("dateFormatgmt8")(date) });
        if (keyDate) $rootScope.statementDate = $scope.counterName(keyDate);
    }

    $scope.selectedDate = 'today';
    $scope.dayRange = function (fromDays, toDays, tabName) {
        if (!fromDays) fromDays = 0;
        if (!toDays) toDays = 0;
        $scope.selectedDate = (!tabName) ? 'today' : tabName;
        $scope.dateFrom = dateFormatgmt8($util.addDays(new Date(), fromDays));
        $scope.dateTo = dateFormatgmt8($util.addDays(new Date(), toDays));
        $scope.search();
    }

    $scope.search = function () {
        var searchData = {
        };
        if ($scope.dateFrom) searchData.dateFrom = $scope.dateFrom;
        if ($scope.dateTo) searchData.dateTo = $scope.dateTo;
        $location.search(searchData);
    }

    $scope.showResult = function ($event, wager, isMobilePage) {
        var position = {
            X: isMobilePage ? 0 : $event.target.offsetLeft + $event.target.offsetParent.offsetLeft - 365,
            Y: $event.target.offsetTop + $event.target.offsetParent.offsetTop - 17
        };
        $scope.$broadcast("showResult", {
            product: $scope.product,
            wagerNo: wager.wagerNo,
            counterId: wager.bets[0].counterId,
            drawNo: wager.bets[0].drawNo,
            position: position
        });
    }

    $scope.counterName = function (key) {
        var str = key.split(' ')[1].replace(/[\(\)]/g, '') + " " + key.split(' ')[0];
        return str;
    }

    function initProductList() {
        $scope.productList = gv.productList;

        $scope.product = $location.search().product === "" ? gv.product : $location.search().product;
        if (!$scope.product)
            $scope.productName = $scope.product;
        for (var key in $scope.productList) {
            if ($scope.productList[key].value == $scope.product) {
                if ($scope.productName && $scope.productName != $scope.productList[key].name) {
                    $location.search("");
                }
                $scope.productName = $scope.productList[key].name;
                break;
            }
        }

        if ($scope.isLazyLoading) {
            $scope.selectedProduct = gv.product;
        } else {
            var product = $location.path().replace("/", "");
            for (var key in $scope.productList) {
                if ($scope.productList[key].value == product) {
                    $scope.selectedProduct = $scope.productList[key].value;
                    break;
                }
            }
            if (!$scope.selectedProduct) {
                $scope.selectedProduct = $scope.productList[0].value;
                $location.path($scope.selectedProduct, false);
            }
        }
    }

    function initDate() {
        $scope.dateFrom = $location.search().dateFrom;
        $scope.dateTo = $location.search().dateTo;
        $scope.date = $location.search().date;

        $scope.dateFrom = $scope.dateFrom ? $scope.dateFrom : dateFormatgmt8(new Date());
        $scope.dateTo = $scope.dateTo ? $scope.dateTo : dateFormatgmt8(new Date());
        $scope.date = $scope.date ? $scope.date : dateFormatgmt8(new Date());

        if ($scope.dateFrom > $scope.dateTo) {
            var tempDate = $scope.dateFrom;
            $scope.dateFrom = $scope.dateTo;
            $scope.dateTo = tempDate;
        }
        $scope.displayDateFrom = $scope.dateFrom;
        $scope.displayDateTo = $scope.dateTo;

        if ($scope.displayMode === "newMobile") {
            $scope.dateFrom = dateFormatgmt8($util.addDays(new Date(), 0));
            $scope.dateTo = dateFormatgmt8($util.addDays(new Date(), -30));
        }
    }

    function dateFormatgmt8(date) {
        return $filter("dateFormatgmt8")(date);
    }

    function countOwnProperties(obj) {
        var count = 0;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                count++;
            }
        }
        return count;
    }

    function countOwnSpecificProperties(obj, specificKey) {
        var count = 0;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key][specificKey])
                    count++;
            }
        }
        return count;
    }
}])
    .controller("statementDetailCtrl", ["$scope", "$counterService", "$dialog", "$filter", function ($scope, $counterService, $dialog, $filter) {
        $scope.close = function () {
            $scope.displayResult = false;
        }

        $scope.$on("showResult", function (event, args) {
            if ($scope.displayResult && args.wagerNo == $scope.wagerNo) {
                $scope.displayResult = false;
                return;
            }

            $counterService.getGameResults($scope.product, args.counterId, args.drawNo, $scope.date).success(function (result) {
                if (result.isSuccess) {
                    if (result.data.gameResults.length == 1) {
                        $scope.product = args.product;
                        $scope.wagerNo = args.wagerNo;
                        $scope.position = args.position;
                        $scope.result = result.data.gameResults[0];
                        if ($scope.product == "lotto") {
                            $scope.result.resultBalls.forEach(function (ball, index) {
                                if (ball >= 0) {
                                    $scope["ball_" + (index + 1)] = ball;
                                }
                                else $scope["ball_" + (index + 1)] = null;
                            });

                            var lotto123 = $scope.getLotto123($scope.result.resultBalls);
                            $scope.sum = lotto123.sum;
                            $scope.span = lotto123.span;
                        }
                        $scope.detail = $scope.getResultDetail($scope.result.resultBalls);
                        $scope.displayResult = true;
                    }
                } else {
                    $dialog.show(R.Text.Error, result.msg);
                }
            });
        });

        //mobile
        $scope.results = function (wager) {
            if (wager.resultBalls && wager.resultBalls.length > 0) {
                return;
            }

            var counter = wager.bets[0].counterId;
            var drawNo = wager.bets[0].drawNo;
            var drawDate = $filter("dateFormat")(wager.createTime);

            $counterService.getGameResults($scope.product, counter, drawNo, drawDate).success(function (result) {
                if (result.isSuccess) {
                    wager.resultBalls = ($scope.product == 'lotto') ? result.data.gameResults[0].resultBalls : result.data.gameResults[0].resultBalls;
                    if ($scope.product == 'lotto') {
                        wager.resultBalls = wager.resultBalls.filter(function (v) { return v >= 0; });

                        var lotto123 = $scope.getLotto123(wager.resultBalls);
                        wager.resultDetails = {
                        };
                        wager.resultDetails.wagerType = wager.bets[0].betType.split('|')[0];
                        wager.resultDetails.ball3to1 = {
                        };
                        wager.resultDetails.ball3to1.sum = lotto123.sum;
                        wager.resultDetails.ball3to1.span = lotto123.span;
                        wager.resultDetails.ball3to1.bs = (lotto123.sum >= 15) ? "b" : "s";
                        wager.resultDetails.ball3to1.oe = (lotto123.sum % 2 == 1) ? "o" : "e";
                    }

                    // keno
                    wager.resultType = $scope.getResultDetail(wager.resultBalls);
                } else {
                    $dialog.show(R.Text.Error, result.msg);
                }
            });
        }

        $scope.getResultDetail = function (resultBalls) {
            var detail = {
            };
            if (resultBalls.length == 0) {
                detail.total = "";
                detail.bs = "";
                detail.oe = "";
                detail.ud = "";
                detail.oses = "";
                detail.ele = "";
                return;
            }

            var total = 0, upCnt = 0, oddCnt = 0;
            for (var i = 0; i < resultBalls.length; i++) {
                var ball = resultBalls[i];
                total += ball;
                if (ball <= 40) upCnt++;
                if (ball % 2) oddCnt++;
            }
            detail.total = total;
            detail.bs = total == 810 ? "t" : (total > 810 ? "b" : "s");
            detail.oe = total % 2 ? "o" : "e";
            detail.ud = upCnt == 10 ? "t" : (upCnt > 10 ? "u" : "d");
            detail.oses = oddCnt == 10 ? "t" : (oddCnt > 10 ? "os" : "es");
            detail.ele = $scope.getElement(total);
            return detail;
        }

        $scope.getElement = function (total) {
            var ele = "";
            if (total <= 695) {
                ele = "g";
            } else if (total <= 763) {
                ele = "wo";
            } else if (total <= 855) {
                ele = "wa";
            } else if (total <= 923) {
                ele = "f";
            } else {
                ele = "ea";
            }
            return ele;
        }

        $scope.getLotto123 = function (balls) { //balls: 1~5
            var sum = 0, min = balls[0], max = balls[0], span = 0;
            balls.forEach(function (ball, index) {
                if (ball >= 0) {
                    if (index < 3) {
                        sum += ball;
                        min = min < ball ? min : ball;
                        max = max > ball ? max : ball;
                    }
                }
            });
            span = max - min;

            return {
                sum: sum,
                min: min,
                max: max,
                span: span
            };
        }

        $scope.getWagerStatus = function (wagerStateText) {
            var status;
            switch (wagerStateText) {
                case R.Text.Link_Win:
                    status = "w";
                    break;
                case R.Text.Link_Lose:
                    status = "l";
                    break;
                case R.Game.WagerStatus_Cancelled:
                    status = "c";
                    break;

                default:
                    status = "l";
            }

            return status;
        }
    }])
    .filter("countDic", function () {
        return function (dic, field) {
            var cnt = 0;
            if (dic)
                for (var key in dic) {
                    if (dic[key][field]) {
                        cnt++;
                    }
                }
            return cnt;
        }
    });;
