import sys
from .utils.bytesuri import BytesURI
from .geppetto_resource import GeppettoResource
from pyecore.resources import ResourceSet
from pyecore.resources.json import JsonOptions

GeppettoModelSerializer = GeppettoSerializer = sys.modules[__name__]


def serialize(geppetto_model):
    # we now create a resource to save the geppetto model and serialize it to a JSON string
    rset = ResourceSet()
    uri = BytesURI('geppetto_model.json')
    rset.resource_factory['*'] = lambda uri: GeppettoResource(uri, indent=2)
    resource = rset.create_resource(uri)
    resource.append(geppetto_model)

    # TODO: We need to apply a visitor and set all the serialised objects to synched
    resource.save(options={JsonOptions.SERIALIZE_DEFAULT_VALUES: True})
    return uri.getvalue()


def serialize_value(geppetto_value, path):
    rset = ResourceSet()
    uri = BytesURI(path)
    rset.resource_factory['*'] = lambda uri: GeppettoResource(uri, indent=2)
    resource = rset.create_resource(uri)
    resource.append(geppetto_value)

    # TODO: We need to apply a visitor and set all the serialised objects to synched
    resource.save(options={JsonOptions.SERIALIZE_DEFAULT_VALUES: True})
    return uri.getvalue()
