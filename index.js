import SubBuilder from './SubBuilder.js'
import yaml from 'js-yaml'
import fs from 'fs'

const subBuilder = new SubBuilder()

// load yaml file
const yamlFile = yaml.load(fs.readFileSync('./playerConfig.yml', 'utf8'))

// build roster
subBuilder.buildRoster(yamlFile)
