import base64
import datetime
import io

import pandas as pd
import numpy as np
from statistics import NormalDist

import json
import sys
import os

abspath = os.path.abspath(__file__)
dname = os.path.dirname(abspath)
os.chdir(dname)

# print('str(sys.argv[0]) is: ', str(sys.argv[1]))
# input = json.loads(str(sys.argv[1]))
filename = str(sys.argv[1])
fileContent = open(filename, 'r').read()

df_statistic = pd.read_csv('files/Genetic data.csv')

"""
phenotype,  rsid,   gene,   genotype,   effect, means,  sdev,   effect_error
BMI,    rs9939609,FTO/rs9939609,TT,        0,    25.3,  4.61,       0
BMI,    rs9939609,FTO/rs9939609,AT,     0.29,    25.8,  4.44,       0.04
"""

df_score = pd.read_csv('files/Polygenic Risk Scores Data.csv')
"""
phenotype,  score,  means,  sdev
BMI,        <3.5,   25.4,   3.1
BMI,        3.5-4.5,25.7,   3.4
"""

def search_bmi(df):
  """
  work for tommy23
  remove unwanted rsid
  """
  array = ['rs9939609', 'rs6548238','rs17782313','rs10938397','rs7498665', 
      'rs10838738','rs11084753','rs2815752']
  tmp = df['rsid'].isin(array)
  df = df.loc[df['rsid'].isin(array)]
  return df 

def search_diabetes(df):
  array = ['rs560887','rs10830963','rs14607517','rs2191349','rs780094','rs11708067',
      'rs7944584','rs10885122','rs174550','rs11605924','rs11920090','rs7034200',
      'rs340874','rs11071657']
  df = df.loc[df['rsid'].isin(array)]
  return df

def calculate_PGRS(df1,df2): #df1 refers to users data; df2 refers to dataset    
  """
  df_statistic = pd.read_csv('Genetic data.csv')
  phenotype,  rsid,   gene,   genotype,   effect, means,  sdev,   effect_error
  BMI,    rs9939609,FTO/rs9939609,TT,        0,    25.3,  4.61,       0
  BMI,    rs9939609,FTO/rs9939609,AT,      0.29,   25.8,  4.44,      0.04
  calculate_PGRS(df_bmi, df_statistic)
  """
  size = []
  val = df1['rsid'][0]
  a = (df2['rsid'] == df1['rsid'][0]) 
  b = (df2['genotype'] == df1['genotype'][0])

  row = df2[(df2['rsid'] == df1['rsid'][0]) 
      & (df2['genotype'] == df1['genotype'][0])]
  for i in range(len(df1)):
      row = df2[(df2['rsid'] == df1['rsid'][i]) 
          & (df2['genotype'] == df1['genotype'][i])]
      size.append(row['effect'].values)
  PGRS = 0
  for i in range(len(size)):
      PGRS += size[i][0]
  return PGRS

def PGRS_contribution(df1,df2):
  contribution = {}
  for i in range(len(df1)):
      row = df2[(df2['rsid'] == df1['rsid'][i]) 
        & (df2['genotype'] == df1['genotype'][i])]
      contribution[df1['rsid'][i]] = row['effect'].values[0]
  factor=1.0/sum(contribution.values())
  for k in contribution:
    contribution[k] = round(contribution[k]*factor,2)
  return contribution

def error_contribution(df1,df2):
  errors = {}
  for i in range(len(df1)):
    row = df2[(df2['rsid'] == df1['rsid'][i]) 
      & (df2['genotype'] == df1['genotype'][i])]
    if row['effect'].values[0] == 0:
      errors[df1['rsid'][i]] = 0
    else:
      errors[df1['rsid'][i]] = row['effect_error'].values[0]/row['effect'].values[0]
  return errors

def get_BMI_statistic(score):
  if score <=3.5:
    return df_score['means'][0], df_score['sdev'][0]
  elif 3.5<score<=4.5:
    return df_score['means'][1], df_score['sdev'][1]
  elif 4.5<score<=5.5:
    return df_score['means'][2], df_score['sdev'][2]
  elif 5.5<score<=6.5:
    return df_score['means'][3], df_score['sdev'][3]
  elif 6.5<score<=7.5:
    return df_score['means'][4], df_score['sdev'][4]
  elif 7.5<score<=8.5:
    return df_score['means'][5], df_score['sdev'][5]
  elif 8.5<score<=9.5:
    return df_score['means'][6], df_score['sdev'][6]
  elif 9.5<score<=10.5:
    return df_score['means'][7], df_score['sdev'][7]
  elif 10.5<score<=11.5:
    return df_score['means'][8], df_score['sdev'][8]
  elif 11.5<score<=12.5:
    return df_score['means'][9], df_score['sdev'][9]
  else:
    return df_score['means'][10], df_score['sdev'][10] 

def get_T2D_statistic(score):
  if score <=12.5:
    return df_score['means'][11], df_score['sdev'][11]
  elif 12.5<score<=13.5:
    return df_score['means'][12], df_score['sdev'][12]
  elif 13.5<score<=14.5:
    return df_score['means'][13], df_score['sdev'][13]
  elif 14.5<score<=15.5:
    return df_score['means'][14], df_score['sdev'][14]
  elif 15.5<score<=16.5:
    return df_score['means'][15], df_score['sdev'][15]
  elif 16.5<score<=17.5:
    return df_score['means'][16], df_score['sdev'][16]
  elif 17.5<score<=18.5:
    return df_score['means'][17], df_score['sdev'][17]
  elif 18.5<score<=19.5:
    return df_score['means'][18], df_score['sdev'][18]
  elif 19.5<score<=20.5:
    return df_score['means'][19], df_score['sdev'][19]
  elif 20.5<score<=21.5:
    return df_score['means'][20], df_score['sdev'][20]
  elif 21.5<score<=22.5:
    return df_score['means'][21], df_score['sdev'][21]
  else:
    return df_score['means'][22], df_score['sdev'][22]

def parse_contents(contents):
  # content_type, content_string = contents.split(',')
  # decoded = base64.b64decode(content_string)
  # Now we only accept txt files
  df = pd.read_csv(
    io.StringIO(contents), '\s+', skiprows=20,
    names=['rsid','chromosome','position','genotype'])
  # replace all '--' with 'NaN'
  df = df.replace('--', 'NaN')
  global df_user 
  df_user = df  
        








rsid_genotype = {}  ## Dictionary where keys are rsid and values are genotype
for i in range(df_statistic.shape[0]):
  if df_statistic.rsid[i] in rsid_genotype.keys():
    continue
  else:
    rsid_genotype[df_statistic.rsid[i]] = []        
    rsid_genotype[df_statistic.rsid[i]].append(df_statistic.gene[i])  





parse_contents(fileContent)      
df_bmi = search_bmi(df_user)   
df_bmi = df_bmi.reset_index(drop=True)  
df_diabetes = search_diabetes(df_user)
df_diabetes = df_diabetes.reset_index(drop=True)

PGRS_bmi = calculate_PGRS(df_bmi, df_statistic)
PGRS_bmi = round(PGRS_bmi/0.29*1.118056, 1)
contribution_bmi = PGRS_contribution(df_bmi, df_statistic) 
error_bmi = error_contribution(df_bmi, df_statistic) 

genotype_bmi = []      ##convert rsid to fully genotype name
for rsid in contribution_bmi.keys():
  genotype_bmi.append(rsid_genotype[rsid][0])

PGRS_diabetes = calculate_PGRS(df_diabetes, df_statistic)
PGRS_diabetes = round(PGRS_diabetes*1.2943, 1)  
contribution_diabetes = PGRS_contribution(df_diabetes, df_statistic)
error_diabetes = error_contribution(df_diabetes, df_statistic)

genotype_diabetes = []      ##convert rsid to fully genotype name
for rsid in contribution_diabetes.keys():
  genotype_diabetes.append(rsid_genotype[rsid][0])

user_BMI_mean, user_BMI_stdev = get_BMI_statistic(PGRS_bmi)
"""
df_score = pd.read_csv('Polygenic Risk Scores Data.csv')
phenotype,  score,  means,  sdev
BMI,        <3.5,   25.4,   3.1
BMI,        3.5-4.5,25.7,   3.4
"""
low_BMI_mean = df_score['means'][0]
low_BMI_stdev = df_score['sdev'][0]
BMI_overlap = NormalDist(low_BMI_mean, low_BMI_stdev).overlap(NormalDist(user_BMI_mean, user_BMI_stdev))
BMI_risk = round((1-BMI_overlap)*100, 2)

user_T2D_mean, user_T2D_stdev = get_T2D_statistic(PGRS_diabetes)
low_T2D_mean = df_score['means'][11]
low_T2D_stdev = df_score['sdev'][11]
T2D_overlap = NormalDist(low_T2D_mean, low_T2D_stdev).overlap(NormalDist(user_T2D_mean, user_T2D_stdev))
T2D_risk = round((1-T2D_overlap)*100, 2)

results = {
  "BMIPolygenicRiskScore": format(PGRS_bmi),
  "riskOfBMIIssue": format(BMI_risk),
  "typeIIDiabetesPolygenicRiskScore": format(PGRS_diabetes),
  "riskOfTypeIIDiabetesIssue": format(T2D_risk),
  "figure": [
    {
      'data':[
        {
        'x': list(genotype_bmi),
        'type': 'bar',
        'y': list(contribution_bmi.values()),
        'error_y':{
            'array':list(error_bmi.values()),
            'type':'percent'
          }
        } 
      ],
      'layout': {
        'title': 'Contributions of different SNPs to BMI Polygenic risk scores',
      'yaxis':{
        'title':'Contributions'
      },
      'xaxis':{
        'title':'Genotypes'
      }
      }
    },
    {
      'data':[
        {
        'x': list(genotype_diabetes),
        'type': 'bar',
        'y': list(contribution_diabetes.values()),
        'error_y':{
          'array':list(error_diabetes.values()),
          'type':'percent'
        }
        } 
      ],
      'layout': {
        'title': 'Contributions of different SNPs to type II diabetes Polygenic risk scores',
      'yaxis':{
        'title':'Contributions'
      },
      'xaxis':{
        'title':'Genotypes'
      }
      }
    }
  ]
}

# appDict = {
#   'name': 'messenger',
#   'playstore': True,
#   'company': 'Facebook',
#   'price': 100
# }
app_json = json.dumps(results)
print(app_json)