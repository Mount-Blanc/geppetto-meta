/*******************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2011, 2013 OpenWorm.
 * http://openworm.org
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the MIT License
 * which accompanies this distribution, and is available at
 * http://opensource.org/licenses/MIT
 *
 * Contributors:
 *      OpenWorm - http://openworm.org/people.html
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 *******************************************************************************/
/**
 *
 * Events
 *
 * Different types of events that exist
 *
 * @enum
 */
define(function (require) {
    return function (GEPPETTO) {
        /**
         * @class GEPPETTO.Events
         */
        GEPPETTO.Events = {

            listening: false,

            listen: function () {
                GEPPETTO.on(this.Select, function () {
                    //notify widgets that selection has changed in scene
                    GEPPETTO.WidgetsListener.update(this.Select);

                    //trigger focus change event
                    GEPPETTO.trigger(this.Focus_changed);
                });
                GEPPETTO.on(this.Model_loaded, function () {
                    G.resetCamera();
                });
                GEPPETTO.on(this.Experiment_active, function () {
                    GEPPETTO.WidgetsListener.update(GEPPETTO.WidgetsListener.WIDGET_EVENT_TYPE.DELETE);
                });
                GEPPETTO.on(this.Experiment_loaded, function () {
                    if(GEPPETTO.UserController.isLoggedIn()){
                    	GEPPETTO.trigger(this.Hide_spinner);
                    }
                });
                GEPPETTO.on(this.Project_loaded, function () {
                    var projectID = window.Project.getId();
                	GEPPETTO.Main.startStatusWorker();
                });
                GEPPETTO.on(this.Experiment_over, function (e) {
                    var name = e.name;
                    var id = e.id;

                    //notify listeners experiment has finished playing
                    GEPPETTO.WidgetsListener.update(this.Experiment_over);

                    // check if we are in looping mode
                    if (GEPPETTO.getVARS().playLoop === true) {
                        Project.getActiveExperiment().play({step: 1});
                    }
                    else {
                        GEPPETTO.Console.log("Experiment " + name + " with " + id + " is over ");
                    }
                });
                GEPPETTO.on(this.Experiment_play, function (parameters) {
                    GEPPETTO.WidgetsListener.update(this.Experiment_play, parameters);
                });
                GEPPETTO.on(this.Experiment_update, function (parameters) {
                    if (parameters.playAll != null || parameters.step != undefined) {
                        //update scene brightness
                    	for (var key in GEPPETTO.G.listeners) {
                    		if(GEPPETTO.G.listeners[key]!=null || undefined){
                    			for (var i = 0; i < GEPPETTO.G.listeners[key].length; i++) {
                    				GEPPETTO.G.listeners[key][i](Instances.getInstance(key), parameters.step);
                    			}
                    		}
                    	}
                    }
                    //notify widgets a restart of data is needed
                    GEPPETTO.WidgetsListener.update(this.Experiment_update, parameters);
                });
                GEPPETTO.on(this.Experiment_stop, function (parameters) {
                    //notify widgets a restart of data is needed
                    GEPPETTO.WidgetsListener.update(GEPPETTO.WidgetsListener.WIDGET_EVENT_TYPE.RESET_DATA);
                });
            }
        };
    }
});
