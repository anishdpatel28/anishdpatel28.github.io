from django.core.management.base import BaseCommand
from django.db import connections
from django.conf import settings

class Command(BaseCommand):
    help = 'Drop the test database if it exists (for CI/test automation)'

    def handle(self, *args, **options):
        test_db_name = 'test_' + settings.DATABASES['default']['NAME']
        with connections['default'].cursor() as cursor:
            cursor.execute("""
                SELECT pg_terminate_backend(pid)
                FROM pg_stat_activity
                WHERE datname = %s AND pid <> pg_backend_pid();
            """, [test_db_name])
            cursor.execute(f"DROP DATABASE IF EXISTS {test_db_name};")
        self.stdout.write(self.style.SUCCESS(f'Dropped test database {test_db_name} (if it existed)')) 