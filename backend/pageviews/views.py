from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import PageView

@api_view(["GET"])
def get_page_views(request):
    try:
        count = PageView.get_count()
        return Response({"count": count}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST"])
def increment_page_views(request):
    try:
        count = PageView.increment_count()
        return Response({"count": count}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
