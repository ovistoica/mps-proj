from django.core.urlresolvers import reverse
from django_webtest import WebTest
from model_mommy import mommy
from .models import Vote


class VoteTest(WebTest):
    def test_factory_create(self):
        """
        Test that we can create an instance via our object factory.
        """
        instance = mommy.make(Vote)
        self.assertTrue(isinstance(instance, Vote))

    def test_list_view(self):
        """
        Test that the list view returns at least our factory created instance.
        """
        instance = mommy.make(Vote)
        response = self.app.get(reverse('server:list'))
        object_list = response.context['object_list']
        self.assertIn(instance, object_list)

    def test_create_view(self):
        """
        Test that we can create an instance via the create view.
        """
        response = self.app.get(reverse('server:create'))
        new_name = 'A freshly created thing'

        # check that we don't already have a model with this name
        self.assertFalse(Vote.objects.filter(name=new_name).exists())

        form = response.forms['vote_form']
        form['name'] = new_name
        form.submit().follow()

        instance = Vote.objects.get(name=new_name)
        self.assertEqual(instance.name, new_name)

    def test_detail_view(self):
        """
        Test that we can view an instance via the detail view.
        """
        instance = mommy.make(Vote)
        response = self.app.get(instance.get_absolute_url())
        self.assertEqual(response.context['object'], instance)

    def test_update_view(self):
        """
        Test that we can update an instance via the update view.
        """
        instance = mommy.make(Vote)
        response = self.app.get(reverse('server:update', kwargs={'pk': instance.pk, }))

        form = response.forms['vote_form']
        new_name = 'Some new thing'
        form['name'] = new_name
        form.submit().follow()

        instance = Vote.objects.get(pk=instance.pk)
        self.assertEqual(instance.name, new_name)

    def test_delete_view(self):
        """
        Test that we can delete an instance via the delete view.
        """
        instance = mommy.make(Vote)
        pk = instance.pk
        response = self.app.get(reverse('server:delete', kwargs={'pk': pk, }))
        response = response.form.submit().follow()
        self.assertFalse(Vote.objects.filter(pk=pk).exists())
