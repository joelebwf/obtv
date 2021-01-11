# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#    http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import json
import unittest
from prep import generator

class TestViewer(unittest.TestCase):

    def test_entrypoints(self):
        data = generator.entrypoints()
        self.assertEqual(162, len(data))
        self.assertTrue("entrypoint" in data[0])
        self.assertTrue("type" in data[0])
        self.assertTrue("description" in data[0])

    def test_site_entrypoint_detail(self):
        data = generator.entrypoint_detail("Site")
        self.assertIsNotNone(data)

    def test_concepts(self):
        data = generator.concepts()
        self.assertEqual(3402, len(data))
        self.assertTrue("name" in data[0])
        self.assertTrue("taxonomy" in data[0])
        self.assertTrue("type" in data[0])
        self.assertTrue("period" in data[0])

    def test_types(self):
        data = generator.types()
        self.assertEqual(92, len(data))
        self.assertTrue("code" in data[0])
        self.assertTrue("type" in data[0])
        self.assertTrue("values" in data[0])
        self.assertTrue("definition" in data[0])

    def test_units(self):
        data = generator.units()
        self.assertEqual(296, len(data))
        self.assertTrue("id" in data[0])
        self.assertTrue("name" in data[0])
        self.assertTrue("symbol" in data[0])
        self.assertTrue("type" in data[0])
        self.assertTrue("standard" in data[0])
        self.assertTrue("definition" in data[0])

    def test_glossary(self):
        data = generator.glossary()
        self.assertEqual(308, len(data))
        self.assertTrue("type" in data[0])
        self.assertTrue("code" in data[0])
        self.assertTrue("definition" in data[0])