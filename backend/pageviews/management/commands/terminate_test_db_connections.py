from django.core.management.base import BaseCommand
from django.db import connection

class Command(BaseCommand):
    help = 'Terminate all connections to the test database (useful for test DB teardown errors)'

    def handle(self, *args, **options):
        dbname = connection.settings_dict['NAME']
        with connection.cursor() as cursor:
            cursor.execute(f"""
                SELECT pg_terminate_backend(pid)
                FROM pg_stat_activity
                WHERE datname = %s AND pid <> pg_backend_pid();
            """, [dbname])
        self.stdout.write(self.style.SUCCESS(f'Terminated all connections to {dbname}')) 