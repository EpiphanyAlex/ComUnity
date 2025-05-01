import sys
import os

# 保证当前目录在模块搜索路径中
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app

app = create_app()
