from __future__ import unicode_literals

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel


class HomePage(Page):
    body = RichTextField(blank=True)

    template = 'wagtail/pages/home_page.html'

    class Meta:
        verbose_name = "Home Page"
        verbose_name_plural = "Home Pages"

    content_panels = [
        FieldPanel('title', classname="full title"),
        FieldPanel('body',),
    ]

HomePage.promote_panels = Page.promote_panels
