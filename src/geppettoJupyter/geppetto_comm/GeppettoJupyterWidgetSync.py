import ipywidgets as widgets
from traitlets import (Unicode, List, Float, Integer, Int)
from geppettoJupyter.geppetto_comm import GeppettoJupyterModelSync


class WidgetSync(widgets.Widget):
    name = Unicode('').tag(sync=True)
    widget_id = Integer(-1).tag(sync=True)
    data = List(Unicode).tag(sync=True)
    position_x = Int(-1).tag(sync=True)
    position_y = Int(-1).tag(sync=True)
    width = Int(-1).tag(sync=True)
    height = Int(-1).tag(sync=True)

    def __init__(self, **kwargs):
        super(WidgetSync, self).__init__(**kwargs)

    def add_data(self, item):
        self.data = [i for i in self.data] + [item]

    def register_to_event(self, events, callback):
        GeppettoJupyterModelSync.events_controller.register_to_event(
            events, callback)

    def shake(self):
        self.send({"command": "shake"})

class PlotWidgetSync(WidgetSync):
    _model_name = Unicode('PlotWidgetSync').tag(sync=True)
    _model_module = Unicode('geppettoJupyter').tag(sync=True)

    def __init__(self, **kwargs):
        super(PlotWidgetSync, self).__init__(**kwargs)

    def plot_data(self, plot_widget_data = None):
        if plot_widget_data is not None:
            self.data = plot_widget_data
        self.send({"command": "plot", "plot_mode": "plot_data"})

    def plot_XY_data(self, plot_widget_data = None):
        if plot_widget_data is not None:
            self.data = plot_widget_data
        self.send({"command": "plot", "plot_mode": "plot_XY_data"})


class PopupWidgetSync(WidgetSync):
    _model_name = Unicode('PopupWidgetSync').tag(sync=True)
    _model_module = Unicode('geppettoJupyter').tag(sync=True)

    def __init__(self, **kwargs):
        super(PopupWidgetSync, self).__init__(**kwargs)
