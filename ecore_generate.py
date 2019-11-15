"""
Generates a new model
"""

from pyecore.resources import ResourceSet
from pyecoregen.ecore import EcoreGenerator
import pyecore.type  # We register the XML types (generated by pyecoregen)

# We open the metamodel
rset = ResourceSet()
mm_root = rset.get_resource('pygeppetto/ecore/geppettoModel.ecore').contents[0]

# We generate the code using the EcoreGenerator
EcoreGenerator(auto_register_package=True).generate(mm_root, outfolder='new_mm')