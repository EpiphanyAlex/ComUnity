import urllib.request
url = 'https://discover.data.vic.gov.au/api/3/action/datastore_search?resource_id=4dd37664-05e9-4904-9d19-662d8b718189&limit=5&q=title:jones'  
fileobj = urllib.request.urlopen(url)
print(fileobj.read())