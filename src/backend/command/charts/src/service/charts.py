import functools
import uuid
from datetime import datetime

from database.sessions import db

collections = {
  'charts': db['charts'],
  'nodes': db['nodes'],
  'edges': db['edges']
}


def debug(func):
    @functools.wraps(func)
    def wrapper_debug(*args, **kwargs):
        try:
          func(*args, **kwargs)
          return 'done', 'close'
        except Exception as e:
          print(f'--- error { str(e) }', flush=True)
          return str(e), 'error'
    return wrapper_debug

#---
@debug
def insert_chart( data ):
  print(f'--- start insert { data }', flush=True)

  db_collection = db['charts']

  result = db_collection.insert_one( document=data )

  print(f'--- end insert', flush=True)

@debug
def remove_chart( data ):
  print(f'--- start remove { data }', flush=True)
  db_collection = db['charts']

  db_collection.delete_one( data )
  print(f'--- end remove', flush=True)

#---

@debug
def insert_nodes( data ):
  print(f'--- start insert { data }', flush=True)
  db_charts = db['charts']
  db_nodes = db['nodes']

  nodes = data['nodes']
  profileid = data['profileid']

  chartsid = db_charts.find_one( { 'profileid': profileid } )['_id']

  result = db_nodes.insert_many( [{ '_id':node.pop('id'), **node, 'boardsid':chartsid } for node in nodes] )

  print(f'--- end insert', flush=True)

@debug
def update_nodes( data ):
  print(f'--- start update { data }', flush=True)
  db_charts = db['charts']
  db_nodes = db['nodes']

  nodes = data['nodes']
  profileid = data['profileid']

  chartsid = db_charts.find_one( { 'profileid': profileid } )['_id']

  comands = [
    { 'filter':{ '_id':node.pop('id'), 'boardsid':chartsid }, 'update':{ '$set':{**node } } } for node in nodes
  ]

  for comand in comands:
    print(f'--- update_one comand: {comand}', flush=True)
    db_nodes.update_one(**comand)

  print(f'--- end update', flush=True)


@debug
def remove_nodes( data ):
  print(f'--- start remove { data }', flush=True)
  db_charts = db['charts']
  db_nodes = db['nodes']

  nodes = data['nodes']
  profileid = data['profileid']

  chartsid = db_charts.find_one( { 'profileid': profileid } )['_id']

  comands = [
    { 'filter':{ '_id':node.pop('id'), 'boardsid':chartsid } } for node in nodes
  ]

  for comand in comands:
    print(f'--- delete_one comand: {comand}', flush=True)
    db_nodes.delete_one(**comand)

  print(f'--- end remove', flush=True)

#---

@debug
def insert_edges( data ):
  print(f'--- start insert { data }', flush=True)
  db_charts = db['charts']
  db_edges = db['edges']

  edges = data['edges']
  profileid = data['profileid']

  chartsid = db_charts.find_one( { 'profileid': profileid } )['_id']

  result = db_edges.insert_many( [{ '_id':edge.pop('id'), **edge, 'boardsid':chartsid } for edge in edges] )

  print(f'--- end insert', flush=True)


@debug
def update_edges( data ):
  print(f'--- start update { data }', flush=True)
  db_charts = db['charts']
  db_edges = db['edges']

  edges = data['edges']
  profileid = data['profileid']

  chartsid = db_charts.find_one( { 'profileid': profileid } )['_id']

  comands = [
    { 'filter':{ '_id':edge.pop('id'), 'boardsid':chartsid }, 'update':{ '$set':{ **edge } } } for edge in edges
  ]

  for comand in comands:
    print(f'--- update_one comand: {comand}', flush=True)
    db_edges.update_one(**comand)

  print(f'--- end update', flush=True)


@debug
def remove_edges( data ):
  print(f'--- start remove { data }', flush=True)
  db_charts = db['charts']
  db_edges = db['edges']

  edges = data['edges']
  profileid = data['profileid']

  chartsid = db_charts.find_one( { 'profileid': profileid } )['_id']

  comands = [
    { 'filter':{ '_id':edge.pop('id'), 'boardsid':chartsid } } for edge in edges
  ]

  for comand in comands:
    print(f'--- delete_one comand: {comand}', flush=True)
    db_edges.delete_one(**comand)

  print(f'--- end remove', flush=True)

#---

commands = {
  'insert charts': insert_chart,
  'remove charts': remove_chart,

  'insert nodes': insert_nodes,
  'update nodes': update_nodes,
  'remove nodes': remove_nodes,

  'insert edges': insert_edges,
  'update edges': update_edges,
  'remove edges': remove_edges
}